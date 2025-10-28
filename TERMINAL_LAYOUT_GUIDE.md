# Terminal Grid Layout System Guide

## Overview

Portofolio ini menggunakan **sistem layout terminal grid** dengan kotak-kotak terpisah untuk setiap section, memberikan tampilan yang compact, rapi, dan terstruktur seperti terminal interface.

## Fitur Utama

### 1. Grid Layout Compact

- **CSS Grid** dengan `repeat(auto-fit, minmax(300px, 1fr))`
- **Responsive**: Otomatis menyesuaikan jumlah kolom berdasarkan lebar layar
- **Gap**: 30px antar kotak untuk keterpisahan yang jelas

### 2. Kotak Terminal Terpisah

Setiap section dibungkus dalam `.terminal-box` atau `.terminal-box-large`:

**Kecil (Preview):**

```html
<div class="terminal-box">
  <div class="terminal-header-box">
    <span class="terminal-prompt">devops@portfolio</span>
    <span>~/section</span>
  </div>
  <div class="terminal-content">
    <!-- Content -->
  </div>
</div>
```

**Besar (Detailed):**

```html
<div class="terminal-box-large">
  <div class="terminal-header-box">
    <span class="terminal-prompt">devops@portfolio:~/section</span>
    <span>detailed.txt</span>
  </div>
  <div class="terminal-content-large">
    <!-- Detailed content -->
  </div>
</div>
```

### 3. Posisi Random yang Terkendali

- **JavaScript** menerapkan random transform ±8px
- Menciptakan kesan organik namun tetap tertata
- Tidak mengganggu keterbacaan

### 4. Terminal Styling

- **Background**: Dark (#0d1117)
- **Border**: Gray (#21262d) dengan top border neon green (#00ff41)
- **Font**: Monospace (JetBrains Mono, Courier New)
- **Glow Effect**: Hover animation dengan scanline

### 5. Abstract Arrows

- **SVG paths** menghubungkan kotak-kotak
- **Color-coded**: Hijau, pink, biru untuk visual roadmap
- **Animation**: Draw path dengan delay stagger

## Struktur Layout

```
┌─────────────────────────────────────────────┐
│  🚀 Portfolio Overview                       │
├──────────────┬──────────────┬──────────────┤
│ About        │ Experience   │ Skills       │
│ terminal-box │ terminal-box │ terminal-box│
├──────────────┴──────────────┴──────────────┤
│ Contact                                      │
│ terminal-box                                 │
└─────────────────────────────────────────────┘

<section-spacer> <!-- 60px gap --> </section-spacer>

┌─────────────────────────────────────────────┐
│ 📖 Detailed Information                       │
│                                               │
│ <div class="terminal-box-large">            │
│   About Section (Full Content)               │
│ </div>                                        │
│                                               │
│ <div class="terminal-box-large">            │
│   Experience Section                         │
│ </div>                                        │
│                                               │
│ <div class="terminal-box-large">            │
│   Skills Section                             │
│ </div>                                        │
│                                               │
│ <div class="terminal-box-large">            │
│   Contact Section                            │
│ </div>                                        │
└─────────────────────────────────────────────┘
```

## Spacing System

### Grid Gaps

- **Large screens**: 30px between terminal boxes
- **Medium screens**: 20px
- **Small screens**: 15px

### Section Spacers

- **Between major sections**: 60px
- **Terminal box padding**: 25px (small), 30px (large)
- **Margin**: 30-40px around grids

## Color Coding

### Text Colors

- **Headers** (#58a6ff): Blue - Section titles
- **Keywords** (#ff7878): Red - Important terms
- **Emphasis** (#7ee787): Green - Highlights
- **Regular** (#c9d1d9): Light gray - Body text
- **Muted** (#8b949e): Gray - Metadata

### Borders

- **Active**: #00ff41 (Neon green)
- **Default**: #21262d (Dark gray)
- **Dark mode active**: #ffd700 (Gold)

## Interaksi

### Hover Effects

- Border color shifts to neon
- Box shadow intensifies
- Subtle lift (translateY)
- Scanline animation

### Click Interaction

- Toggle `terminal-active` class
- Border changes to pink
- Glow effect intensifies
- Auto-deselect others

## JavaScript Features

### `terminal-grid.js`

#### Random Positioning

```javascript
terminalBoxes.forEach((box, index) => {
  const x = Math.random() * 16 - 8; // ±8px
  const y = Math.random() * 16 - 8;
  box.style.transform = `translate(${x}px, ${y}px)`;
  box.style.animationDelay = `${index * 0.1}s`;
});
```

#### Click Interaction

- Single click: Activate box (pink border)
- Other boxes auto-deactivate

#### Abstract Arrows

```javascript
const connections = [
  { from: "about", to: "experience", color: "#00ff41" },
  { from: "experience", to: "skills", color: "#ff0080" },
  { from: "skills", to: "contact", color: "#0066ff" },
];
```

## Responsive Breakpoints

### Desktop (> 1024px)

- Grid: 4 columns max
- Gap: 30px
- Padding: 25-30px

### Tablet (768px - 1024px)

- Grid: 2-3 columns
- Gap: 20px
- Padding: 20px

### Mobile (< 768px)

- Grid: 1 column
- Gap: 15px
- Padding: 15-20px
- Simplified animations

## Best Practices

### ✅ Do's

- Keep terminal boxes compact
- Use consistent padding
- Maintain monospace fonts
- Use color-coding for hierarchy
- Test hover interactions

### ❌ Don'ts

- Over-use random positioning
- Make boxes too large on mobile
- Forget dark mode variants
- Mix non-terminal styles inside boxes
- Use non-monospace fonts

## Customization

### Changing Grid Density

```css
.terminal-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Tighter */
  /* or */
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); /* Wider */
}
```

### Adjusting Randomness

```javascript
const maxOffset = 12; // Increase for more randomness (±12px)
```

### Changing Terminal Colors

```css
.terminal-box {
  border-top: 3px solid #YOUR_COLOR;
  /* Default: #00ff41 (green) */
}
```

## Performance

- **GPU Accelerated**: Transform animations
- **Efficient**: Single paint per hover
- **Lightweight**: Minimal JavaScript
- **Fast**: CSS-only styling with minimal recalculations

---

**Built with**: CSS Grid | Monospace Fonts | Neomorphism | Cyberpunk Aesthetic
**Purpose**: Compact, organized, visually striking portfolio layout
