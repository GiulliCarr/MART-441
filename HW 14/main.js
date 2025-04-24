// Scene, camera, renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cube
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -2;
scene.add(cube);

// polygon
const tetraGeometry = new THREE.TetrahedronGeometry();
const tetraMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const tetra = new THREE.Mesh(tetraGeometry, tetraMaterial);
tetra.position.x = 2;
scene.add(tetra);

// Circle in background with dashed lines
const targetGroup = new THREE.Group();
const segments = 64;
const rings = 3;
const arcStep = Math.PI * 2 / segments;

for (let j = 1; j <= rings; j++) {
  const points = [];

  for (let i = 0; i < segments; i++) {
    
    if (i % 2 === 0) {
      const angle1 = i * arcStep;
      const angle2 = (i + 1) * arcStep;

      const p1 = new THREE.Vector3(Math.cos(angle1) * j, Math.sin(angle1) * j, 0);
      const p2 = new THREE.Vector3(Math.cos(angle2) * j, Math.sin(angle2) * j, 0);

      points.push(p1, p2);
    }
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const lineSegments = new THREE.LineSegments(geometry, material);
  targetGroup.add(lineSegments);
}

scene.add(targetGroup);


camera.position.z = 5;


function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  tetra.rotation.x += 0.01;
  tetra.rotation.z += 0.01;

  targetGroup.rotation.z += 0.005;

  renderer.render(scene, camera);
}
animate();
