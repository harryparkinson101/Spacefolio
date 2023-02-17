class GrannyKnot extends THREE.Object3D {
  constructor() {
    super();

    // Create the knot geometry
    const knotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16, 2, 3);

    // Create the knot material
    const knotMaterial = new THREE.MeshPhongMaterial({
      map: sunTexture,
      wireframe: true
    });

    // Create the knot mesh
    this.mesh = new THREE.Mesh(knotGeometry, knotMaterial);
    this.mesh.scale.set(350, 450, 500); // Multiply the scale x,y,z

    // Add the knot mesh to the GrannyKnot object
    this.add(this.mesh);
  }
}


/* Animate camera to move from cube 1 to cube 2 over 5 seconds */
const tweenTime = 20000; // in milliseconds
const cameraTarget = new THREE.Vector3();
const cameraStartPosition = camera.position.clone();
const cameraStartTarget = cameraTarget.copy(video1Screen.position);
const cameraEndTarget = cameraTarget.copy(video2Screen.position);

const tweenCameraPosition = new TWEEN.Tween(cameraStartPosition)
  .to(cameraEndTarget, tweenTime)
  .onUpdate(() => {
    camera.position.copy(cameraStartPosition);
  });

const tweenCameraTarget = new TWEEN.Tween(cameraStartTarget)
  .to(cameraEndTarget, tweenTime)
  .onUpdate(() => {
    camera.lookAt(cameraStartTarget);
  });

tweenCameraPosition.chain(tweenCameraTarget);
tweenCameraPosition.start();

/* Animate camera to move from cube 1 to cube 2 over 5 seconds */
const tweenTime = 20000; // in milliseconds
const cameraTarget = new THREE.Vector3();
const cameraStartPosition = camera.position.clone();
const cameraStartTarget = cameraTarget.copy(video1Screen.position);
const cameraEndTarget = cameraTarget.copy(video2Screen.position);

const tweenCameraPosition = new TWEEN.Tween(cameraStartPosition)
  .to(cameraEndTarget, tweenTime)
  .onUpdate(() => {
    camera.position.copy(cameraStartPosition);
  });

const tweenCameraTarget = new TWEEN.Tween(cameraStartTarget)
  .to(cameraEndTarget, tweenTime)
  .onUpdate(() => {
    camera.lookAt(cameraStartTarget);
  });

tweenCameraPosition.chain(tweenCameraTarget);
tweenCameraPosition.start();