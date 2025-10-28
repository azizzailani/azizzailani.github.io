// 3D DevOps Portfolio Scene with High Contrast Colors
// Using Three.js for interactive 3D visualization

let scene, camera, renderer, controls;
let cloudObjects = [];
let particleSystem;
let isAnimating = true;

// High contrast color palette
const COLORS = {
  background: 0x0a0a0a, // Deep black
  primary: 0xff0080, // Neon magenta/pink
  secondary: 0x00ff41, // Neon green
  accent: 0x0066ff, // Electric blue
  accent2: 0xffff00, // Neon yellow
  white: 0xffffff,
  darkGray: 0x1a1a1a,
};

function init3DScene() {
  // Get container element
  const container = document.getElementById("portfolio-3d-container");
  if (!container) return;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.background);
  scene.fog = new THREE.Fog(COLORS.background, 10, 50);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(5, 5, 15);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Controls for interaction
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.minDistance = 5;
  controls.maxDistance = 25;
  controls.enableZoom = true;

  // Lighting
  const ambientLight = new THREE.AmbientLight(COLORS.white, 0.3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(COLORS.primary, 1);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const spotLight = new THREE.SpotLight(COLORS.secondary, 1);
  spotLight.position.set(-5, 10, -5);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.5;
  spotLight.castShadow = true;
  scene.add(spotLight);

  // Add lights from different angles
  const pointLight1 = new THREE.PointLight(COLORS.accent, 1, 100);
  pointLight1.position.set(10, 5, 10);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(COLORS.accent2, 1, 100);
  pointLight2.position.set(-10, 5, -10);
  scene.add(pointLight2);

  // Create 3D objects representing DevOps tools
  createDevOpsTools();

  // Create floating particles
  createParticleSystem();

  // Handle window resize
  window.addEventListener("resize", onWindowResize);

  // Start animation loop
  animate();
}

// Create 3D representations of DevOps tools
function createDevOpsTools() {
  const tools = [
    { name: "K8s", color: COLORS.primary, position: [-5, 0, -5] },
    { name: "Docker", color: COLORS.secondary, position: [5, 0, -5] },
    { name: "Jenkins", color: COLORS.accent, position: [-5, 0, 5] },
    { name: "Terraform", color: COLORS.accent2, position: [5, 0, 5] },
    { name: "AWS", color: COLORS.primary, position: [0, 4, 0] },
    { name: "Prometheus", color: COLORS.secondary, position: [0, -4, 0] },
  ];

  tools.forEach((tool) => {
    // Create a torus (doughnut) shape for interesting geometry
    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshStandardMaterial({
      color: tool.color,
      metalness: 0.7,
      roughness: 0.3,
      emissive: tool.color,
      emissiveIntensity: 0.2,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...tool.position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = tool.name;

    scene.add(mesh);
    cloudObjects.push(mesh);
  });

  // Add central cloud infrastructure representation
  createCloudInfrastructure();
}

// Create cloud infrastructure visualization
function createCloudInfrastructure() {
  // Central hub
  const hubGeometry = new THREE.BoxGeometry(2, 2, 2);
  const hubMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.white,
    metalness: 0.9,
    roughness: 0.1,
    emissive: COLORS.primary,
    emissiveIntensity: 0.3,
  });

  const hub = new THREE.Mesh(hubGeometry, hubMaterial);
  hub.position.set(0, 0, 0);
  hub.castShadow = true;
  scene.add(hub);
  cloudObjects.push(hub);

  // Add connecting lines between objects (network visualization)
  createNetworkLines();
}

// Create network lines connecting tools
function createNetworkLines() {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: COLORS.accent,
    opacity: 0.3,
    transparent: true,
  });

  for (let i = 0; i < cloudObjects.length; i++) {
    for (let j = i + 1; j < cloudObjects.length; j++) {
      const points = [cloudObjects[i].position, cloudObjects[j].position];

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }
  }
}

// Create floating particle system
function createParticleSystem() {
  const particleCount = 500;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50;
  }

  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: COLORS.secondary,
    size: 0.1,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (!isAnimating) return;

  // Rotate objects
  cloudObjects.forEach((object, index) => {
    object.rotation.x += 0.005 + index * 0.001;
    object.rotation.y += 0.01 - index * 0.001;

    // Floating animation
    object.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
  });

  // Animate particle system
  if (particleSystem) {
    particleSystem.rotation.y += 0.001;
    particleSystem.rotation.x -= 0.0005;
  }

  controls.update();
  renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
  const container = document.getElementById("portfolio-3d-container");
  if (!container || !camera || !renderer) return;

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Add section in index with 3D visualization
function toggle3DAnimation() {
  isAnimating = !isAnimating;
  const btn = document.getElementById("toggle-3d-btn");
  if (btn) {
    btn.textContent = isAnimating
      ? "Pause 3D Animation"
      : "Resume 3D Animation";
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(init3DScene, 500); // Delay for smooth loading
});

// Export for global access
window.toggle3DAnimation = toggle3DAnimation;
