/**
 * Terminal System Configuration
 * Centralized configuration for the floating terminal system
 *
 * @class TerminalConfig
 * @version 1.0.0
 */
class TerminalConfig {
  static getDefaultConfig() {
    return {
      // Container selector
      container: ".floating-terminals",

      // 3D perspective settings
      perspective: 2000,
      perspectiveOrigin: "center center",

      // Random positioning
      maxOffset: 8,
      maxRotation: 5,

      // Animation settings
      animationDuration: 3000,
      animationDelay: 200,
      floatAmplitude: 5,

      // Performance settings
      enablePerformanceMonitoring: true,
      debug: false,

      // Terminal sizes
      sizes: {
        small: { width: 280, height: 200, padding: 20 },
        medium: { width: 400, height: 300, padding: 25 },
        large: { width: 500, height: 400, padding: 30 },
        wide: { width: 600, height: 250, padding: 25 },
      },

      // Colors
      colors: {
        background: "#0d1117",
        border: "#21262d",
        activeBorder: "#00ff41",
        hoverBorder: "#ff0080",
        text: "#c9d1d9",
        prompt: "#00ff41",
        path: "#8b949e",
      },

      // Dark mode colors
      darkModeColors: {
        background: "#0a0a0a",
        border: "#ffd700",
        activeBorder: "#ffd700",
        hoverBorder: "#ff6b6b",
        text: "#e6e6e6",
        prompt: "#ffd700",
        path: "#8b949e",
      },

      // Responsive breakpoints
      breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
      },

      // Keyboard shortcuts
      shortcuts: {
        maximize: ["m", "M"],
        close: ["w", "W"],
        minimize: ["n", "N"],
        reset: ["r", "R"],
      },

      // Event settings
      events: {
        enableDrag: true,
        enableResize: true,
        enableContextMenu: true,
        enableKeyboardShortcuts: true,
        enableDoubleClickMaximize: true,
      },
    };
  }

  /**
   * Get configuration for specific terminal type
   * @param {string} type - Terminal type (small, medium, large, wide)
   * @returns {Object} Terminal configuration
   */
  static getTerminalConfig(type) {
    const config = this.getDefaultConfig();
    const sizeConfig = config.sizes[type];

    if (!sizeConfig) {
      throw new Error(`Unknown terminal type: ${type}`);
    }

    return {
      ...sizeConfig,
      className: `terminal-${type}`,
      ...config,
    };
  }

  /**
   * Get responsive configuration
   * @param {number} width - Viewport width
   * @returns {Object} Responsive configuration
   */
  static getResponsiveConfig(width) {
    const config = this.getDefaultConfig();
    const breakpoints = config.breakpoints;

    if (width <= breakpoints.mobile) {
      return {
        ...config,
        sizes: {
          small: { width: 200, height: 150, padding: 12 },
          medium: { width: 250, height: 200, padding: 15 },
          large: { width: 280, height: 250, padding: 18 },
          wide: { width: 250, height: 180, padding: 15 },
        },
        maxOffset: 4,
        maxRotation: 2,
        floatAmplitude: 2,
      };
    } else if (width <= breakpoints.tablet) {
      return {
        ...config,
        sizes: {
          small: { width: 250, height: 180, padding: 15 },
          medium: { width: 300, height: 250, padding: 20 },
          large: { width: 350, height: 300, padding: 25 },
          wide: { width: 300, height: 200, padding: 20 },
        },
        maxOffset: 6,
        maxRotation: 3,
        floatAmplitude: 3,
      };
    }

    return config;
  }

  /**
   * Merge user configuration with default
   * @param {Object} userConfig - User configuration
   * @returns {Object} Merged configuration
   */
  static mergeConfig(userConfig = {}) {
    const defaultConfig = this.getDefaultConfig();

    return {
      ...defaultConfig,
      ...userConfig,
      sizes: {
        ...defaultConfig.sizes,
        ...userConfig.sizes,
      },
      colors: {
        ...defaultConfig.colors,
        ...userConfig.colors,
      },
      darkModeColors: {
        ...defaultConfig.darkModeColors,
        ...userConfig.darkModeColors,
      },
      breakpoints: {
        ...defaultConfig.breakpoints,
        ...userConfig.breakpoints,
      },
      shortcuts: {
        ...defaultConfig.shortcuts,
        ...userConfig.shortcuts,
      },
      events: {
        ...defaultConfig.events,
        ...userConfig.events,
      },
    };
  }
}
