let scene, camera, renderer, cube, pointLight, particles;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Load the existing texture
  const loader = new THREE.TextureLoader();
  loader.load("./black-back-ground.jpg", function (texture) {
    // Create a canvas and draw the existing texture onto it
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    context.drawImage(texture.image, 0, 0);

    // Draw the text onto the canvas
    context.fillStyle = "rgba(185, 185, 185, 1)";
    context.font = "8rem Arial";
    context.fillText("loadofpixels.com", 30, 528);

    // Create a new texture from the canvas
    const newTexture = new THREE.CanvasTexture(canvas);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      map: newTexture,
      transparent: true,
      opacity: 0.5, // Set your desired opacity here (0.0 to 1.0)
    });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  });

  pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Particle system
  const particleCount = 5000;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    color: "rgba(221, 221, 221, 0.7)",
    size: 0.1,
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate);

  if (cube) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  particles.rotation.y += 0.001;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);
init();
animate();
