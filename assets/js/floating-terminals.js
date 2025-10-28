/**
 * Floating Terminal System - Full Interactive 3D UI
 * Creates floating terminal windows with random positioning and 3D interactions
 *
 * @class FloatingTerminalSystem
 * @version 2.0.0
 * @author Abdul Aziz Zailani
 */
class FloatingTerminalSystem {
  constructor(options = {}) {
    // Configuration
    this.config = {
      container: ".floating-terminals",
      perspective: 2000,
      maxOffset: 8,
      animationDuration: 3000,
      ...options,
    };

    // State management
    this.state = {
      terminals: [],
      activeTerminal: null,
      isDragging: false,
      dragOffset: { x: 0, y: 0 },
      isInitialized: false,
    };

    // Performance tracking
    this.performance = {
      frameCount: 0,
      lastTime: performance.now(),
      fps: 0,
    };

    this.init();
  }

  /**
   * Initialize the floating terminal system
   * @private
   */
  init() {
    try {
      // Initialize subsystems
      this.eventHandlers = new TerminalEventHandlers(this);
      this.animationSystem = new TerminalAnimationSystem(this);

      this.createFloatingTerminals();
      this.eventHandlers.setupEventListeners(this.state.terminals);
      this.animationSystem.startFloatingAnimation();
      this.animationSystem.startPerformanceMonitoring();
      this.state.isInitialized = true;

      console.log("🚀 Floating Terminal System initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Floating Terminal System:", error);
    }
  }

  /**
   * Create floating terminals from configuration
   * @private
   */
  createFloatingTerminals() {
    const container = document.querySelector(this.config.container);
    if (!container) {
      throw new Error(`Container ${this.config.container} not found`);
    }

    const terminalConfigs = this.getTerminalConfigurations();

    terminalConfigs.forEach((config, index) => {
      const terminal = this.createTerminal(config, index);
      container.appendChild(terminal);
      this.state.terminals.push(terminal);
    });
  }

  /**
   * Get terminal configurations
   * @returns {Array} Array of terminal configuration objects
   * @private
   */
  getTerminalConfigurations() {
    return [
      {
        id: "about-terminal",
        title: "About Me",
        path: "~/about",
        size: "terminal-medium",
        content: TerminalContentTemplates.getAboutContent(),
        position: { x: 50, y: 100 },
      },
      {
        id: "experience-terminal",
        title: "Experience",
        path: "~/experience",
        size: "terminal-large",
        content: TerminalContentTemplates.getExperienceContent(),
        position: { x: 500, y: 150 },
      },
      {
        id: "skills-terminal",
        title: "Skills",
        path: "~/skills",
        size: "terminal-wide",
        content: TerminalContentTemplates.getSkillsContent(),
        position: { x: 200, y: 400 },
      },
      {
        id: "contact-terminal",
        title: "Contact",
        path: "~/contact",
        size: "terminal-small",
        content: TerminalContentTemplates.getContactContent(),
        position: { x: 600, y: 300 },
      },
      {
        id: "projects-terminal",
        title: "Projects",
        path: "~/projects",
        size: "terminal-medium",
        content: TerminalContentTemplates.getProjectsContent(),
        position: { x: 100, y: 500 },
      },
      {
        id: "stats-terminal",
        title: "Stats",
        path: "~/stats",
        size: "terminal-small",
        content: TerminalContentTemplates.getStatsContent(),
        position: { x: 700, y: 100 },
      },
    ];
  }

  /**
   * Create a single terminal element
   * @param {Object} config - Terminal configuration
   * @param {number} index - Terminal index for z-index
   * @returns {HTMLElement} Created terminal element
   * @private
   */
  createTerminal(config, index) {
    const terminal = document.createElement("div");
    terminal.className = `floating-terminal ${config.size}`;
    terminal.id = config.id;
    terminal.style.left = `${config.position.x}px`;
    terminal.style.top = `${config.position.y}px`;
    terminal.style.zIndex = index + 1;

    // Apply random positioning
    this.applyRandomPositioning(terminal);

    // Set terminal content
    terminal.innerHTML = this.generateTerminalHTML(config);

    return terminal;
  }

  /**
   * Apply random positioning to terminal
   * @param {HTMLElement} terminal - Terminal element
   * @private
   */
  applyRandomPositioning(terminal) {
    const randomRotation = (Math.random() - 0.5) * 10; // ±5 degrees
    const randomOffset = (Math.random() - 0.5) * this.config.maxOffset * 2; // ±maxOffset px
    terminal.style.transform = `rotate(${randomRotation}deg) translate(${randomOffset}px, ${randomOffset}px)`;
  }

  /**
   * Generate terminal HTML content
   * @param {Object} config - Terminal configuration
   * @returns {string} HTML string
   * @private
   */
  generateTerminalHTML(config) {
    return `
      <div class="terminal-close-btn" onclick="terminalSystem.closeTerminal(this.parentElement)">×</div>
      <div class="terminal-resize-handle se"></div>
      <div class="terminal-resize-handle s"></div>
      <div class="terminal-resize-handle e"></div>
      <div class="floating-terminal-header">
        <span class="floating-terminal-prompt">devops@portfolio:${
          config.path
        }</span>
        <span class="floating-terminal-path">${config.title.toLowerCase()}.txt</span>
      </div>
      <div class="floating-terminal-content">
        ${config.content}
      </div>
    `;
  }

  /**
   * Activate a terminal
   * @param {HTMLElement} terminal - Terminal element
   */
  activateTerminal(terminal) {
    this.deactivateAllTerminals();
    this.animationSystem.animateActivation(terminal);
    this.state.activeTerminal = terminal;

    // Bring to front
    const maxZ = Math.max(
      ...this.state.terminals.map((t) => parseInt(t.style.zIndex) || 0)
    );
    terminal.style.zIndex = maxZ + 1;
  }

  /**
   * Deactivate all terminals
   */
  deactivateAllTerminals() {
    this.state.terminals.forEach((terminal) => {
      this.animationSystem.animateDeactivation(terminal);
    });
    this.state.activeTerminal = null;
  }

  /**
   * Maximize a terminal
   * @param {HTMLElement} terminal - Terminal element
   */
  maximizeTerminal(terminal) {
    const isMaximized = terminal.classList.contains("maximized");

    if (isMaximized) {
      terminal.classList.remove("maximized");
      terminal.style.width = "";
      terminal.style.height = "";
      terminal.style.left = "";
      terminal.style.top = "";
    } else {
      this.animationSystem.animateMaximization(terminal);
      terminal.style.width = "80vw";
      terminal.style.height = "80vh";
      terminal.style.left = "10vw";
      terminal.style.top = "10vh";
      terminal.style.transform = "rotate(0deg)";
    }
  }

  /**
   * Minimize a terminal
   * @param {HTMLElement} terminal - Terminal element
   */
  minimizeTerminal(terminal) {
    this.animationSystem.animateMinimization(terminal);
  }

  /**
   * Close a terminal
   * @param {HTMLElement} terminal - Terminal element
   */
  closeTerminal(terminal) {
    this.animationSystem.animateClosing(terminal);
  }

  /**
   * Add a new terminal dynamically
   * @param {Object} config - Terminal configuration
   * @returns {HTMLElement} Created terminal element
   */
  addTerminal(config) {
    const terminal = this.createTerminal(config, this.state.terminals.length);
    const container = document.querySelector(this.config.container);

    if (container) {
      container.appendChild(terminal);
      this.state.terminals.push(terminal);
      this.eventHandlers.setupEventListeners([terminal]);
      this.animationSystem.animateTerminal(
        terminal,
        this.config.animationDuration
      );
    }

    return terminal;
  }

  /**
   * Get system performance metrics
   * @returns {Object} Performance metrics
   */
  getPerformanceMetrics() {
    return {
      fps: this.animationSystem.getFPS(),
      terminalCount: this.state.terminals.length,
      activeTerminal: this.state.activeTerminal?.id || null,
      isDragging: this.state.isDragging,
    };
  }

  /**
   * Reset all terminal positions
   */
  resetPositions() {
    this.state.terminals.forEach((terminal, index) => {
      const randomRotation = (Math.random() - 0.5) * 10;
      const randomOffset = (Math.random() - 0.5) * this.config.maxOffset * 2;
      terminal.style.transform = `rotate(${randomRotation}deg) translate(${randomOffset}px, ${randomOffset}px)`;
      terminal.style.left = `${Math.random() * (window.innerWidth - 300)}px`;
      terminal.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
    });
  }

  /**
   * Destroy the terminal system
   */
  destroy() {
    this.animationSystem.stopAllAnimations();
    this.state.terminals.forEach((terminal) => {
      terminal.remove();
    });
    this.state.terminals = [];
    this.state.activeTerminal = null;
    this.state.isInitialized = false;
  }
}

// Initialize the floating terminal system
let terminalSystem;

document.addEventListener("DOMContentLoaded", function () {
  terminalSystem = new FloatingTerminalSystem();
});

// Export for global access
window.terminalSystem = terminalSystem;
