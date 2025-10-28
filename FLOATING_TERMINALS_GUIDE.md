# Floating Terminal System - Full UI Refactor

## Overview
Sistem UI baru yang mengubah seluruh portofolio menjadi **floating terminal windows** dengan efek 3D, posisi random, dan interaksi penuh seperti desktop environment.

## Fitur Utama

### 🎮 Interaksi Penuh
- **Click**: Aktifkan terminal (border pink, glow effect)
- **Double-click**: Maximize/minimize window
- **Drag**: Pindahkan terminal ke posisi baru
- **Right-click**: Context menu (maximize, minimize, close)
- **Keyboard shortcuts**: Ctrl+M (maximize), Ctrl+W (close)

### 🎯 3D Effects
- **Perspective**: 2000px untuk depth yang realistis
- **Hover**: Rotate Y(5deg) + X(-5deg) + scale(1.05)
- **Active**: Scale(1.1) + translateZ(30px)
- **Floating**: Subtle sine wave animation
- **Backdrop blur**: 10px untuk glassmorphism

### 🎲 Random Positioning
- **Initial position**: Setiap terminal di posisi berbeda
- **Random rotation**: ±5 derajat saat load
- **Random offset**: ±10px untuk natural look
- **Floating animation**: Continuous subtle movement

### 📱 Responsive Design
- **Desktop**: Full 3D effects
- **Tablet**: Reduced transforms
- **Mobile**: Simplified interactions

## Terminal Types

### 1. About Terminal (Medium)
- **Size**: 400x300px
- **Content**: Personal info, journey
- **Position**: Top-left area

### 2. Experience Terminal (Large)
- **Size**: 500x400px
- **Content**: Career timeline, achievements
- **Position**: Center-right

### 3. Skills Terminal (Wide)
- **Size**: 600x250px
- **Content**: Technology stack, expertise
- **Position**: Bottom-center

### 4. Contact Terminal (Small)
- **Size**: 280x200px
- **Content**: Contact information
- **Position**: Top-right

### 5. Projects Terminal (Medium)
- **Size**: 400x300px
- **Content**: Project showcases
- **Position**: Bottom-left

### 6. Stats Terminal (Small)
- **Size**: 280x200px
- **Content**: Performance metrics
- **Position**: Top-center

## CSS Classes

### Base Classes
```css
.floating-terminals     /* Container dengan perspective */
.floating-terminal      /* Base terminal window */
.floating-terminal-header /* Header dengan prompt */
.floating-terminal-content /* Content area */
```

### Size Classes
```css
.terminal-small    /* 280x200px */
.terminal-medium   /* 400x300px */
.terminal-large    /* 500x400px */
.terminal-wide     /* 600x250px */
```

### State Classes
```css
.floating-terminal:hover    /* 3D hover effect */
.floating-terminal.active   /* Active state (pink border) */
.floating-terminal.maximized /* Maximized state */
.floating-terminal.minimized /* Minimized state */
```

## JavaScript API

### FloatingTerminalSystem Class

#### Methods
```javascript
// Initialize system
new FloatingTerminalSystem()

// Terminal management
activateTerminal(terminal)
deactivateAllTerminals()
maximizeTerminal(terminal)
minimizeTerminal(terminal)
closeTerminal(terminal)

// Drag & drop
startDrag(terminal, event)
handleDrag(event)
stopDrag()

// Animation
startFloatingAnimation()
animateTerminal(terminal, duration)
```

#### Properties
```javascript
terminals[]           // Array of terminal elements
activeTerminal        // Currently active terminal
isDragging           // Drag state
dragOffset           // Drag offset coordinates
```

## Styling System

### Color Scheme
- **Background**: #0d1117 (GitHub dark)
- **Border**: #21262d (Dark gray)
- **Active border**: #00ff41 (Neon green)
- **Hover border**: #ff0080 (Neon pink)
- **Text**: #c9d1d9 (Light gray)

### Dark Mode
- **Background**: #0a0a0a (Darker)
- **Border**: #ffd700 (Gold)
- **Active border**: #ff6b6b (Coral)

### Animations
```css
@keyframes floatGlow {
  0%, 100% { /* Normal glow */ }
  50% { /* Intensified glow */ }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

## Performance Optimizations

### GPU Acceleration
- `transform-style: preserve-3d`
- `backdrop-filter: blur(10px)`
- `will-change: transform`

### Efficient Animations
- `requestAnimationFrame` untuk smooth animation
- CSS transforms instead of position changes
- Hardware acceleration enabled

### Memory Management
- Event listener cleanup
- Animation frame cancellation
- DOM element recycling

## Browser Support

### Full Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Partial Support
- IE 11 (fallback to 2D)
- Older mobile browsers

## Usage Examples

### Basic Setup
```html
<div class="floating-terminals">
  <!-- Terminals created by JavaScript -->
</div>
```

### Custom Terminal
```javascript
const customTerminal = {
  id: 'custom-terminal',
  title: 'Custom',
  path: '~/custom',
  size: 'terminal-medium',
  content: '<h1>Custom Content</h1>',
  position: { x: 300, y: 200 }
};
```

### Event Handling
```javascript
// Listen for terminal activation
document.addEventListener('terminal-activated', (e) => {
  console.log('Terminal activated:', e.detail.terminal);
});

// Listen for terminal drag
document.addEventListener('terminal-dragged', (e) => {
  console.log('Terminal moved to:', e.detail.position);
});
```

## Customization

### Changing Terminal Positions
```javascript
// Modify terminalConfigs array in floating-terminals.js
const terminalConfigs = [
  {
    id: 'about-terminal',
    position: { x: 100, y: 50 }, // Custom position
    // ... other config
  }
];
```

### Adding New Terminal Types
```css
.terminal-custom {
  width: 350px;
  height: 280px;
  padding: 25px;
}
```

### Modifying 3D Effects
```css
.floating-terminal:hover {
  transform: translateZ(30px) rotateY(10deg) rotateX(-10deg) scale(1.1);
  /* More dramatic 3D effect */
}
```

## Troubleshooting

### Common Issues

1. **Terminals not appearing**
   - Check JavaScript console for errors
   - Ensure CSS files are loaded
   - Verify DOM structure

2. **Drag not working**
   - Check event listener setup
   - Verify mouse event handling
   - Test on different browsers

3. **Performance issues**
   - Reduce number of terminals
   - Simplify animations
   - Check GPU acceleration

### Debug Mode
```javascript
// Enable debug logging
window.terminalSystem.debug = true;
```

## Future Enhancements

### Planned Features
- **Terminal resizing**: Drag corners to resize
- **Terminal snapping**: Snap to grid or edges
- **Multiple workspaces**: Tab-based organization
- **Terminal themes**: Different color schemes
- **Plugin system**: Custom terminal types

### Advanced Interactions
- **Multi-select**: Select multiple terminals
- **Grouping**: Group related terminals
- **Minimap**: Overview of all terminals
- **Search**: Find terminals by content

---

**Built with**: CSS 3D Transforms | JavaScript ES6+ | Hardware Acceleration
**Purpose**: Immersive, interactive portfolio experience

**Result**: Portofolio yang terlihat seperti desktop environment dengan terminal windows yang bisa diinteraksi, dipindah, dan dimanipulasi seperti aplikasi desktop modern.
