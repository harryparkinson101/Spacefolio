import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import * as kanit from './assets/fonts/kanit.json'
import DownloadIcon from '@mui/icons-material/Download';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import video1 from './assets/videos/video1.mp4';
import video2 from './assets/videos/video2.mp4';
import video3 from './assets/videos/video3.mp4';
import video4 from './assets/videos/video4.mp4';
import video5 from './assets/videos/video4.mp4';
import starsTexture from './assets/images/stars.jpg';
import sunTexture from './assets/images/sun.jpg';
import mercuryTexture from './assets/images/mercury.jpg';
import venusTexture from './assets/images/venus.jpg';
import earthTexture from './assets/images/earth.jpg';
import marsTexture from './assets/images/mars.jpg';
import jupiterTexture from './assets/images/jupiter.jpg';
import saturnTexture from './assets/images/saturn.jpg';
import saturnRingTexture from './assets/images/saturnRing.png';
//import uranusTexture from './assets/images/uranus.jpg';
//import uranusRingTexture from './assets/images/uranusRing.png';
//import neptuneTexture from './assets/images/neptune.jpg';
//import plutoTexture from './assets/images/pluto.jpg';
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

//const controls = new FirstPersonControls(camera, renderer.domElement);
//controls.movementSpeed = 4;
//controls.lookSpeed = 0.04;

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

// Text

let text = "Welcome to my Spacefolio" //String to render
let textMesh; // text object

const loader = new FontLoader();  // create Fontloader instance

loader.load('./assets/fonts/kanit.json', function(font) { //text geometry sting and property values
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 40,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 5,
    bevelSize: 2,
    bevelOffset: 2,
    bevelSegments: 15
  });

  textMesh = new THREE.Mesh(textGeometry, [
    new THREE.MeshPhongMaterial({ color: 0xffffff })
  ]);

  scene.add(textMesh);
  textMesh.position.set(0, 0, 0);
})


/* Planet sizes */
const earthSize = 32
const sunSize = 8 * 80
const mercurySize = earthSize * 0.38
const venusSize = earthSize * 0.95
const marsSize = earthSize * 0.53
const jupiterSize = earthSize * 11.20
const saturnSize = earthSize * 9.45
//const uranusSize = earthSize * 4.00
//const neptuneSize = earthSize * 3.88
//const plutoSize = earthSize * 0.095

/* Planet distance from sun in km */
const scale = 100000
const sunDistance = 0
const mercuryDistance = 88000000 / scale
const venusDistance = 108200000 / scale
const earthDistance = 149600000 / scale
const marsDistance = 227900000 / scale
const jupiterDistance = 778300000 / scale
const saturnDistance = 1427000000 / scale
//const uranusDistance = 2871000000 / scale
//const neptuneDistance = 4497100000 / scale
//const plutoDistance = 3674500000 / scale


const textureLoader = new THREE.TextureLoader();
/* Create Sun */
const sunGeo = new THREE.SphereGeometry(sunSize, 12, 12);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

/* Create Planets */

const createPlanet = (size, texture, position, ring) => {
  const geo = new THREE.SphereGeometry(size, 12, 12);
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
  return { mesh, obj }
};

// Mercury
const mercury = createPlanet(mercurySize, mercuryTexture, mercuryDistance);
//mercury.obj.rotateY(0.47);

// Venus
const venus = createPlanet(venusSize, venusTexture, venusDistance);
//venus.obj.rotateY(0.87);

// Earth
const earth = createPlanet(earthSize, earthTexture, earthDistance);
//earth.obj.rotateY(1.29);

// Mars
const mars = createPlanet(marsSize, marsTexture, marsDistance);
//mars.obj.rotateY(1.98);

// Jupiter
const jupiter = createPlanet(jupiterSize, jupiterTexture, jupiterDistance);
//jupiter.obj.rotateY(2.84);

// Saturn
const saturn = createPlanet(saturnSize, saturnTexture, saturnDistance, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
});
//saturn.obj.rotateY(1.84);

// Uranus 
/*
const uranus = createPlanet(uranusSize, uranusTexture, uranusDistance, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
});
//uranus.obj.rotateY(2.44);
*/

// Neptune
//const neptune = createPlanet(neptuneSize, neptuneTexture, neptuneDistance);
//neptune.obj.rotateY(0.77);

// Pluto
//const pluto = createPlanet(plutoSize, plutoTexture, plutoDistance);
//pluto.obj.rotateY(1.12);


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
/*
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
*/
// Editing orbit controls 

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
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
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

  //set a timer to call this function again after 5 seconds
  timeoutId = setTimeout(switchCameraPosition, 5000);
}

// start the first camera switch after 5 seconds
timeoutId = setTimeout(switchCameraPosition, 5000);

orbit.update();


const moveCamera = (x, y, z) => {
  gsap.to(camera.position, {
    x,
    y,
    z,
    duration: 5
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
  //controls.update(clock.getDelta());
  // Update the videos texture as a series of images
  video1Texture.needsUpdate = true;
  video2Texture.needsUpdate = true;
  video3Texture.needsUpdate = true;
  video4Texture.needsUpdate = true;
  video5Texture.needsUpdate = true;

  // Self rotation
  sun.rotateY(0.0005/4);
  mercury.mesh.rotateY(0.0005/4);
  venus.mesh.rotateY(0.00025/4);
  earth.mesh.rotateY(0.0025/4);
  mars.mesh.rotateY(0.00225/4);
  jupiter.mesh.rotateY(0.005/4);
  saturn.mesh.rotateY(0.00475/4);
  
  mercury.obj.rotateY(0.005/4);
  venus.obj.rotateY(0.001875/4);
  earth.obj.rotateY(0.00125/4);
  mars.obj.rotateY(0.001/4);
  jupiter.obj.rotateY(0.00025/4);
  saturn.obj.rotateY(0.0001125/4);

  sun.frustumCulled = true;
  mercury.mesh.frustumCulled = true;
  venus.mesh.frustumCulled = true;
  earth.mesh.frustumCulled = true;
  mars.mesh.frustumCulled = true;
  jupiter.mesh.frustumCulled = true;
  saturn.mesh.frustumCulled = true;

  mercury.obj.frustumCulled = true;
  venus.obj.frustumCulled = true;
  earth.obj.frustumCulled = true;
  mars.obj.frustumCulled = true;
  jupiter.obj.frustumCulled = true;
  saturn.obj.frustumCulled = true;
//orbit.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

/* Resize window */
window.addEventListener('resize', function () {
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
