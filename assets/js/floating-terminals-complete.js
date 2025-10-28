/**
 * Terminal Content Templates
 * Contains all terminal content generation methods
 *
 * @class TerminalContentTemplates
 * @version 1.0.0
 */
class TerminalContentTemplates {
  /**
   * Get About Me content
   * @returns {string} HTML content
   */
  static getAboutContent() {
    return `
      <h1>$ whoami</h1>
      <p><strong>Name:</strong> Abdul Aziz Zailani</p>
      <p><strong>Role:</strong> Senior DevOps Engineer & SRE</p>
      <p><strong>Focus:</strong> CI/CD, Cloud Infrastructure, Automation</p>
      <p><em>Transforming infrastructure chaos into orchestrated harmony</em></p>
      <h2>$ cat journey.txt</h2>
      <p>5+ years automating deployments and building reliable systems.</p>
    `;
  }

  /**
   * Get Experience content
   * @returns {string} HTML content
   */
  static getExperienceContent() {
    return `
      <h1>$ experience.log</h1>
      <h2>2022 - Present</h2>
      <p><strong>Senior DevOps Engineer</strong> @ PT. Komunitas Anak Bangsa</p>
      <ul>
        <li>CI/CD pipeline optimization</li>
        <li>Infrastructure as Code with Terraform</li>
        <li>Kubernetes orchestration</li>
      </ul>
      <h2>2019 - 2022</h2>
      <p><strong>DevOps Engineer</strong> @ Harmonix</p>
      <ul>
        <li>Docker containerization</li>
        <li>Monitoring setup with Prometheus</li>
        <li>Automation scripting</li>
      </ul>
    `;
  }

  /**
   * Get Skills content
   * @returns {string} HTML content
   */
  static getSkillsContent() {
    return `
      <h1>$ cat skills.txt</h1>
      <h2>CI/CD & Automation</h2>
      <p>Jenkins | GitLab CI | GitHub Actions | Ansible</p>
      <h2>Cloud & Infrastructure</h2>
      <p>AWS | Alibaba Cloud | Kubernetes | Docker</p>
      <h2>Monitoring & Observability</h2>
      <p>Prometheus | Grafana | ELK Stack | Loki</p>
      <h2>Programming</h2>
      <p>Python | Go | Bash | YAML</p>
    `;
  }

  /**
   * Get Contact content
   * @returns {string} HTML content
   */
  static getContactContent() {
    return `
      <h1>$ contact --available</h1>
      <p><strong>Email:</strong> aazizzailani.dev@gmail.com</p>
      <p><strong>GitHub:</strong> github.com/azizzailani</p>
      <p><strong>LinkedIn:</strong> linkedin.com/in/aazizzailani</p>
      <p><strong>Location:</strong> Indonesia (WIB)</p>
      <p><em>Open for remote opportunities</em></p>
    `;
  }

  /**
   * Get Projects content
   * @returns {string} HTML content
   */
  static getProjectsContent() {
    return `
      <h1>$ ls projects/</h1>
      <h2>Infrastructure Automation</h2>
      <p>Terraform modules for multi-cloud deployment</p>
      <h2>CI/CD Pipeline</h2>
      <p>GitLab CI optimization reducing build time by 40%</p>
      <h2>Monitoring Dashboard</h2>
      <p>Custom Grafana dashboards for system metrics</p>
    `;
  }

  /**
   * Get Stats content
   * @returns {string} HTML content
   */
  static getStatsContent() {
    return `
      <h1>$ cat stats.txt</h1>
      <h2>Performance Metrics</h2>
      <p><strong>Deployments:</strong> 40% faster</p>
      <p><strong>Uptime:</strong> 30% improvement</p>
      <p><strong>Debug Time:</strong> 50% reduction</p>
      <p><strong>Manual Tasks:</strong> 60% automation</p>
    `;
  }

  /**
   * Get demo terminal content
   * @param {string} id - Terminal ID
   * @param {string} size - Terminal size
   * @returns {string} HTML content
   */
  static getDemoContent(id, size) {
    return `
      <h1>$ demo --random</h1>
      <p><strong>ID:</strong> ${id}</p>
      <p><strong>Size:</strong> ${size}</p>
      <p><strong>Position:</strong> Random</p>
      <p><em>This is a demo terminal</em></p>
    `;
  }
}
/**
 * Terminal Event Handlers
 * Contains all event handling logic for floating terminals
 *
 * @class TerminalEventHandlers
 * @version 1.0.0
 */
class TerminalEventHandlers {
  constructor(terminalSystem) {
    this.system = terminalSystem;
    this.bindMethods();
  }

  /**
   * Bind methods to preserve context
   * @private
   */
  bindMethods() {
    this.handleDrag = this.handleDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.stopResize = this.stopResize.bind(this);
  }

  /**
   * Setup event listeners for all terminals
   * @param {Array} terminals - Array of terminal elements
   */
  setupEventListeners(terminals) {
    terminals.forEach((terminal) => {
      this.setupTerminalEvents(terminal);
    });

    this.setupGlobalEvents();
  }

  /**
   * Setup events for a single terminal
   * @param {HTMLElement} terminal - Terminal element
   * @private
   */
  setupTerminalEvents(terminal) {
    // Click to activate
    terminal.addEventListener("click", (e) => {
      e.stopPropagation();
      this.system.activateTerminal(terminal);
    });

    // Double click to maximize
    terminal.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      this.system.maximizeTerminal(terminal);
    });

    // Drag functionality
    terminal.addEventListener("mousedown", (e) => {
      this.startDrag(terminal, e);
    });

    // Right click for context menu
    terminal.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.showContextMenu(terminal, e);
    });

    // Setup resize handles
    this.setupResizeHandles(terminal);
  }

  /**
   * Setup global event listeners
   * @private
   */
  setupGlobalEvents() {
    // Global click to deactivate
    document.addEventListener("click", () => {
      this.system.deactivateAllTerminals();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      this.handleKeyboardShortcuts(e);
    });
  }

  /**
   * Start drag operation
   * @param {HTMLElement} terminal - Terminal element
   * @param {MouseEvent} e - Mouse event
   */
  startDrag(terminal, e) {
    this.system.state.isDragging = true;
    this.system.state.activeTerminal = terminal;

    const rect = terminal.getBoundingClientRect();
    this.system.state.dragOffset.x = e.clientX - rect.left;
    this.system.state.dragOffset.y = e.clientY - rect.top;

    terminal.style.cursor = "grabbing";

    document.addEventListener("mousemove", this.handleDrag);
    document.addEventListener("mouseup", this.stopDrag);
  }

  /**
   * Handle drag movement
   * @param {MouseEvent} e - Mouse event
   */
  handleDrag(e) {
    if (!this.system.state.isDragging || !this.system.state.activeTerminal)
      return;

    const x = e.clientX - this.system.state.dragOffset.x;
    const y = e.clientY - this.system.state.dragOffset.y;

    this.system.state.activeTerminal.style.left = `${Math.max(0, x)}px`;
    this.system.state.activeTerminal.style.top = `${Math.max(0, y)}px`;
    this.system.state.activeTerminal.style.transform = "rotate(0deg)";
  }

  /**
   * Stop drag operation
   */
  stopDrag() {
    this.system.state.isDragging = false;
    if (this.system.state.activeTerminal) {
      this.system.state.activeTerminal.style.cursor = "pointer";
    }

    document.removeEventListener("mousemove", this.handleDrag);
    document.removeEventListener("mouseup", this.stopDrag);
  }

  /**
   * Setup resize handles for terminal
   * @param {HTMLElement} terminal - Terminal element
   */
  setupResizeHandles(terminal) {
    const resizeHandle = terminal.querySelector(".terminal-resize-handle.se");
    if (!resizeHandle) return;

    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener("mousedown", (e) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(window.getComputedStyle(terminal).width);
      startHeight = parseInt(window.getComputedStyle(terminal).height);

      document.addEventListener("mousemove", this.handleResize);
      document.addEventListener("mouseup", this.stopResize);
      e.preventDefault();
    });

    this.handleResize = (e) => {
      if (!isResizing) return;

      const newWidth = startWidth + e.clientX - startX;
      const newHeight = startHeight + e.clientY - startY;

      terminal.style.width = `${Math.max(200, newWidth)}px`;
      terminal.style.height = `${Math.max(150, newHeight)}px`;
    };

    this.stopResize = () => {
      isResizing = false;
      document.removeEventListener("mousemove", this.handleResize);
      document.removeEventListener("mouseup", this.stopResize);
    };
  }

  /**
   * Show context menu
   * @param {HTMLElement} terminal - Terminal element
   * @param {MouseEvent} e - Mouse event
   */
  showContextMenu(terminal, e) {
    const menu = document.createElement("div");
    menu.className = "terminal-context-menu";
    menu.style.position = "absolute";
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    menu.style.background = "#0d1117";
    menu.style.border = "1px solid #21262d";
    menu.style.borderRadius = "4px";
    menu.style.padding = "8px";
    menu.style.zIndex = "1000";

    menu.innerHTML = `
      <div class="menu-item" onclick="terminalSystem.maximizeTerminal(this.parentElement.parentElement)">Maximize</div>
      <div class="menu-item" onclick="terminalSystem.minimizeTerminal(this.parentElement.parentElement)">Minimize</div>
      <div class="menu-item" onclick="terminalSystem.closeTerminal(this.parentElement.parentElement)">Close</div>
    `;

    document.body.appendChild(menu);

    // Remove menu on click outside
    setTimeout(() => {
      document.addEventListener(
        "click",
        () => {
          menu.remove();
        },
        { once: true }
      );
    }, 100);
  }

  /**
   * Handle keyboard shortcuts
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "m":
          e.preventDefault();
          if (this.system.state.activeTerminal) {
            this.system.maximizeTerminal(this.system.state.activeTerminal);
          }
          break;
        case "w":
          e.preventDefault();
          if (this.system.state.activeTerminal) {
            this.system.closeTerminal(this.system.state.activeTerminal);
          }
          break;
      }
    }
  }
}
/**
 * Terminal Animation System
 * Handles all animations and visual effects for floating terminals
 *
 * @class TerminalAnimationSystem
 * @version 1.0.0
 */
class TerminalAnimationSystem {
  constructor(terminalSystem) {
    this.system = terminalSystem;
    this.animations = new Map();
    this.performance = {
      frameCount: 0,
      lastTime: performance.now(),
      fps: 0,
    };
  }

  /**
   * Start floating animation for all terminals
   */
  startFloatingAnimation() {
    this.system.state.terminals.forEach((terminal, index) => {
      const delay = index * 200;
      const duration =
        this.system.config.animationDuration + Math.random() * 2000;

      setTimeout(() => {
        this.animateTerminal(terminal, duration);
      }, delay);
    });
  }

  /**
   * Animate a single terminal with floating effect
   * @param {HTMLElement} terminal - Terminal element
   * @param {number} duration - Animation duration in ms
   */
  animateTerminal(terminal, duration) {
    const startTime = Date.now();
    const startTransform = terminal.style.transform;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;

      const floatY = Math.sin(progress * Math.PI * 2) * 5;
      const floatX = Math.cos(progress * Math.PI * 2) * 3;

      terminal.style.transform = `${startTransform} translate(${floatX}px, ${floatY}px)`;

      requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * Start performance monitoring
   */
  startPerformanceMonitoring() {
    const monitor = () => {
      this.performance.frameCount++;
      const currentTime = performance.now();

      if (currentTime - this.performance.lastTime >= 1000) {
        this.performance.fps = Math.round(
          (this.performance.frameCount * 1000) /
            (currentTime - this.performance.lastTime)
        );

        if (this.system.config.debug) {
          console.log(`FPS: ${this.performance.fps}`);
        }

        this.performance.frameCount = 0;
        this.performance.lastTime = currentTime;
      }

      requestAnimationFrame(monitor);
    };

    monitor();
  }

  /**
   * Animate terminal activation
   * @param {HTMLElement} terminal - Terminal element
   */
  animateActivation(terminal) {
    terminal.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    terminal.classList.add("active");

    setTimeout(() => {
      terminal.style.transition = "";
    }, 300);
  }

  /**
   * Animate terminal deactivation
   * @param {HTMLElement} terminal - Terminal element
   */
  animateDeactivation(terminal) {
    terminal.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    terminal.classList.remove("active");

    setTimeout(() => {
      terminal.style.transition = "";
    }, 300);
  }

  /**
   * Animate terminal maximization
   * @param {HTMLElement} terminal - Terminal element
   */
  animateMaximization(terminal) {
    terminal.style.transition =
      "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    terminal.classList.add("maximized");

    setTimeout(() => {
      terminal.style.transition = "";
    }, 400);
  }

  /**
   * Animate terminal minimization
   * @param {HTMLElement} terminal - Terminal element
   */
  animateMinimization(terminal) {
    terminal.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    terminal.classList.add("minimized");

    setTimeout(() => {
      terminal.style.transition = "";
    }, 300);
  }

  /**
   * Animate terminal closing
   * @param {HTMLElement} terminal - Terminal element
   */
  animateClosing(terminal) {
    terminal.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    terminal.style.transform = "scale(0) rotate(180deg)";
    terminal.style.opacity = "0";

    setTimeout(() => {
      terminal.style.display = "none";
    }, 300);
  }

  /**
   * Reset terminal animations
   * @param {HTMLElement} terminal - Terminal element
   */
  resetAnimations(terminal) {
    terminal.style.transition = "";
    terminal.style.transform = "";
    terminal.style.opacity = "";
    terminal.style.display = "";
    terminal.classList.remove("active", "maximized", "minimized");
  }

  /**
   * Get current FPS
   * @returns {number} Current FPS
   */
  getFPS() {
    return this.performance.fps;
  }

  /**
   * Stop all animations
   */
  stopAllAnimations() {
    this.system.state.terminals.forEach((terminal) => {
      this.resetAnimations(terminal);
    });
  }
}
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
