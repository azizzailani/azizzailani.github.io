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
