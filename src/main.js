import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import video1 from './assets/videos/video1.mp4';
import video2 from './assets/videos/video2.mp4';
import video3 from './assets/videos/video3.mp4';
import video4 from './assets/videos/video4.mp4';
import video5 from './assets/videos/video4.mp4';
import starsTexture from './assets/stars.jpg';
import sunTexture from './assets/sun.jpg';
import mercuryTexture from './assets/mercury.jpg';
import venusTexture from './assets/venus.jpg';
import earthTexture from './assets/earth.jpg';
import marsTexture from './assets/mars.jpg';
import jupiterTexture from './assets/jupiter.jpg';
import saturnTexture from './assets/saturn.jpg';
import saturnRingTexture from './assets/saturnRing.png';
import uranusTexture from './assets/uranus.jpg';
import uranusRingTexture from './assets/uranusRing.png';
import neptuneTexture from './assets/neptune.jpg';
import plutoTexture from './assets/pluto.jpg';
import gsap from 'gsap';


/* Create the scene and camera */
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);


const orbit = new OrbitControls(camera, renderer.domElement);



//  Sets the Background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);

// Sets the lighting

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 10000);
scene.add(pointLight);

/* Planet sizes */
const earthSize = 6
const sunSize = 8 * 80
const mercurySize = earthSize * 0.38
const venusSize = earthSize * 0.95
const marsSize = earthSize * 0.53
const jupiterSize = earthSize * 11.20
const saturnSize = earthSize * 9.45
const uranusSize = earthSize * 4.00
const neptuneSize = earthSize * 3.88
const plutoSize = earthSize * 0.095

/* Planet distance from sun in km */
const scale = 100000
const sunDistance = 0
const mercuryDistance = 88000000 / scale
const venusDistance = 108200000 / scale
const earthDistance = 149600000 / scale
const marsDistance = 227900000 / scale
const jupiterDistance = 778300000 / scale
const saturnDistance = 1427000000 / scale
const uranusDistance = 2871000000 / scale
const neptuneDistance = 4497100000 / scale
const plutoDistance = 3674500000 / scale


const textureLoader = new THREE.TextureLoader();
/* Create Sun */
const sunGeo = new THREE.SphereGeometry(sunSize, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

/* Create Planets */

const createPlanet = (size, texture, position, ring) => {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);

  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return {mesh, obj} 
};

// Mercury
const mercury = createPlanet(mercurySize, mercuryTexture, mercuryDistance);
mercury.obj.rotateY(0.47);

// Venus
const venus = createPlanet(venusSize, venusTexture, venusDistance);
venus.obj.rotateY(0.87);

// Earth
const earth = createPlanet(earthSize, earthTexture, earthDistance);
earth.obj.rotateY(1.29);

// Mars
const mars = createPlanet(marsSize, marsTexture, marsDistance);
mars.obj.rotateY(1.98);

// Jupiter
const jupiter = createPlanet(jupiterSize, jupiterTexture, jupiterDistance);
jupiter.obj.rotateY(2.84);

// Saturn
const saturn = createPlanet(saturnSize, saturnTexture, saturnDistance, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
});
saturn.obj.rotateY(1.84);

// Uranus 
const uranus = createPlanet(uranusSize, uranusTexture, uranusDistance, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
});
uranus.obj.rotateY(2.44);

// Neptune
const neptune = createPlanet(neptuneSize, neptuneTexture, neptuneDistance);
neptune.obj.rotateY(0.77);

// Pluto
const pluto = createPlanet(plutoSize, plutoTexture, plutoDistance);
pluto.obj.rotateY(1.12);


orbit.update();



// Project 1 Imagine-AI

const videoContent = document.getElementById("video"); //link video HTML to js

let video1Texture = new THREE.VideoTexture(videoContent); // Create Texture
// Post Process Texture
video1Texture.minFilter = THREE.LinearFilter;
video1Texture.magFilter = THREE.LinearFilter;


// Projec 2 StreamSpot

const video2Content = document.getElementById("video2"); //link video HTML to js

let video2Texture = new THREE.VideoTexture(video2Content); // Create Texture
// Post Process Texture
video2Texture.minFilter = THREE.LinearFilter;
video2Texture.magFilter = THREE.LinearFilter;

// Project 3 Datawave

const video3Content = document.getElementById("video3"); //link video HTML to js

let video3Texture = new THREE.VideoTexture(video3Content); // Create Texture
// Post Process Texture
video3Texture.minFilter = THREE.LinearFilter;
video3Texture.magFilter = THREE.LinearFilter;

// Project 4

const video4Content = document.getElementById("video4"); //link video HTML to js

let video4Texture = new THREE.VideoTexture(video4Content); // Create Texture
// Post Process Texture
video4Texture.minFilter = THREE.LinearFilter;
video4Texture.magFilter = THREE.LinearFilter;

// Project 5 Gericht

const video5Content = document.getElementById("video5"); //link video HTML to js

let video5Texture = new THREE.VideoTexture(video5Content); // Create Texture
// Post Process Texture
video5Texture.minFilter = THREE.LinearFilter;
video5Texture.magFilter = THREE.LinearFilter;

/* Creating the GrannyKnot  */

class GrannyKnot extends THREE.Object3D {
  constructor() {
    super();

    // Create the knot geometry
    const knotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16, 2, 3);

    // Create the knot material
    const knotMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    // Create the knot mesh
    this.mesh = new THREE.Mesh(knotGeometry, knotMaterial);
    this.mesh.scale.set(350, 450, 500); // Multiply the scale x,y,z

    // Add the knot mesh to the GrannyKnot object
    this.add(this.mesh);
  }
}


const grannyKnot = new GrannyKnot();
scene.add(grannyKnot);


orbit.enabled = false; // disable the orbit controls by default
let timeoutId = null; // to keep track of the timeout id
// function to enable the orbit controls
function enableOrbitControls() {
  orbit.enabled = true;
  clearTimeout(timeoutId);
}

// add event listener to the button to enable orbit controls when clicked
const exploreButton = document.getElementById('exploreButton');
exploreButton.addEventListener('click', enableOrbitControls);
const textures = [video1Texture, video2Texture, video3Texture, video4Texture, video5Texture];

function createCube(scene, position, map) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ map: textures[currentTextureIndex] });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.copy(position);
  scene.add(cube);

  currentTextureIndex = (currentTextureIndex + 1) % textures.length; // Increment the index and wrap around when it reaches the end of the array
}


// Initialize the current texture index to 0
let currentTextureIndex = 0;


for (let i = 0; i < 5; i++) {
  createCube(scene, new THREE.Vector3(i * 2 - 4, 0, 0), textures[i]);
}

let position = 0;
function switchCameraPosition() {
  if (orbit.enabled) {
    return;
  }
  console.log(camera.position);
  switch (position) {
    case 0:
      moveCamera(0, 2, 10);
      rotateCamera(0, 0.1, 0);
      position = 1
      break;
    case 1:
      moveCamera(-4.031, -0.161, 1.891);
      rotateCamera(0, 0.1, 0);
      position = 2
      break;
    case 2:
      moveCamera(-1.63, -0.1485, 2.829);
      rotateCamera(0, 0.1, 0);
      position = 3;
      break; 
    case 3:
      moveCamera(0.04, -0.146, 1.948);
      rotateCamera(0, 0.1, 0);
      position = 4;
      break; 
    case 4:
      moveCamera(2.307, -0.245, 2.629);
      rotateCamera(0, 0.1, 0);
      position = 5;
      break;
    case 5:
      moveCamera(4.031, -0.161, 1.891);
      rotateCamera(0, 0.1, 0);
      position = 0;
      break; 
    default:
      position = 0;
      rotateCamera(0, 0, 0);
      break;
  }
  
  // set a timer to call this function again after 5 seconds
  timeoutId = setTimeout(switchCameraPosition, 5000);
}

// start the first camera switch after 5 seconds
timeoutId = setTimeout(switchCameraPosition, 5000);


const moveCamera = (x, y, z) => {
  gsap.to(camera.position, {
    x,
    y,
    z,
    duration: 3
  });
}

const rotateCamera = (x, y, z) => {
  gsap.to(camera.rotation, {
    x,
    y,
    z,
    duration: 3.2
  });
}

const clock = new THREE.Clock();

/* Animate the scene */
const animate = () => {
  requestAnimationFrame(animate);
  
  // Update the videos texture as a series of images
  video1Texture.needsUpdate = true;
  video2Texture.needsUpdate = true;
  video3Texture.needsUpdate = true;
  video4Texture.needsUpdate = true;
  video5Texture.needsUpdate = true;

  // Self rotation

  //sun.rotateY(0.004);
  //mercury.mesh.rotateY(0.004);
  //venus.mesh.rotateY(0.002);
  //earth.mesh.rotateY(0.02);
  //mars.mesh.rotateY(0.018);
  //jupiter.mesh.rotateY(0.04);
  //saturn.mesh.rotateY(0.038);
  //uranus.mesh.rotateY(0.03);
  //neptune.mesh.rotateY(0.032);
  //pluto.mesh.rotateY(0.008);
  //grannyKnot.mesh.rotateY(0.01);
  //grannyKnot.mesh.rotateX(0.01)
  // Around sun rotation

  //mercury.obj.rotateY(0.04);
  //venus.obj.rotateY(0.015);
  //earth.obj.rotateY(0.01);
  //mars.obj.rotateY(0.008);
  //jupiter.obj.rotateY(0.002);
  //saturn.obj.rotateY(0.0009);
  //uranus.obj.rotateY(0.0004);
  //neptune.obj.rotateY(0.0001);
  //pluto.obj.rotateY(0.00007);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

/* Resize window */
window.addEventListener('resize', function() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.onkeydown = function (e) {
  if (e.keyCode === 80) {
    // p key = play video
    videoContent.play();
    video2Content.play();
    video3Content.play();
    video4Content.play();
    video5Content.play();
    //...
  } else if (e.keyCode === 32) {
    // space-bar = pause video
    videoContent.pause();
    video2Content.pause();
    video3Content.pause();
    video4Content.pause();
    video5Content.pause();
  } else if (e.keyCode === 83) {
    // s key = stop video
    videoContent.pause();
    videoContent.currentTime = 0;
    video2Content.pause();
    video2Content.currentTime = 0;
    video3Content.pause();
    video3Content.currentTime = 0;
    video4Content.pause();
    video4Content.currentTime = 0;
    video5Content.pause();
    video5Content.currentTime = 0;

  } else if (e.keyCode === 82) {
    // r key = rewind video
    videoContent.currentTime = 0;
    video2Content.currentTime = 0;
    video3Content.currentTime = 0;
    video4Content.currentTime = 0;
    video5Content.currentTime = 0;
  }
};
