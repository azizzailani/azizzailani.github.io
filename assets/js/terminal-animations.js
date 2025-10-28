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
