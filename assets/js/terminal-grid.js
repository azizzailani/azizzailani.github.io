// Terminal Grid Layout with Random Positioning
// Creates organized but slightly randomized grid for portfolio sections

document.addEventListener("DOMContentLoaded", function () {
  // Apply random positioning to terminal boxes
  const terminalBoxes = document.querySelectorAll(".terminal-box");

  terminalBoxes.forEach((box, index) => {
    // Random offset between -8px and 8px
    const maxOffset = 8;
    const x = Math.random() * maxOffset * 2 - maxOffset;
    const y = Math.random() * maxOffset * 2 - maxOffset;

    // Apply transform
    box.style.transform = `translate(${x}px, ${y}px)`;

    // Add stagger animation delay
    box.style.animationDelay = `${index * 0.1}s`;
  });

  // Add click interaction for terminal boxes
  terminalBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      this.classList.toggle("terminal-active");

      // Reset others
      terminalBoxes.forEach((other) => {
        if (other !== this) {
          other.classList.remove("terminal-active");
        }
      });
    });
  });
});

// Create abstract arrows for roadmap connections
function createRoadmapArrows() {
  const arrowsContainer = document.getElementById("roadmap-arrows");
  if (!arrowsContainer) return;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "roadmap-svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.pointerEvents = "none";
  svg.style.zIndex = "1";

  // Create connections between sections
  const connections = [
    { from: "about", to: "experience", color: "#00ff41", delay: 0 },
    { from: "experience", to: "skills", color: "#ff0080", delay: 200 },
    { from: "skills", to: "contact", color: "#0066ff", delay: 400 },
  ];

  connections.forEach((conn) => {
    const fromEl = document.getElementById(conn.from);
    const toEl = document.getElementById(conn.to);

    if (!fromEl || !toEl) return;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const x1 = fromRect.left + fromRect.width / 2;
    const y1 = fromRect.top + fromRect.height / 2;
    const x2 = toRect.left + toRect.width / 2;
    const y2 = toRect.top + toRect.height / 2;

    // Create curved path
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const curve = 30;

    const d = `M ${x1} ${y1} Q ${midX} ${
      y1 + curve
    } ${midX} ${midY} T ${x2} ${y2}`;

    path.setAttribute("d", d);
    path.setAttribute("stroke", conn.color);
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-dasharray", "5,5");
    path.setAttribute("opacity", "0.6");
    path.style.animation = `drawPath 2s ease-out ${conn.delay}ms forwards`;

    svg.appendChild(path);
  });

  arrowsContainer.appendChild(svg);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(createRoadmapArrows, 500);
});

// Recalculate arrows on window resize
window.addEventListener("resize", function () {
  const existingSvg = document.querySelector(".roadmap-svg");
  if (existingSvg) {
    existingSvg.remove();
  }
  setTimeout(createRoadmapArrows, 100);
});
