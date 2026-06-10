import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

//new three.js scene
const scene = new THREE.Scene()

// create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// keep the 3d object on a global variable
let object;

//orbitcontrols allow the camera to move around the scene with mouse interactions
let controls;

//set which object to render
let objToRender = 'diamond';

// load the 3d model using GLTFLoader
const loader = new GLTFLoader();

//load the file
loader.load(
    'models/' + objToRender + '/scene.gltf',
    function (gltf) {
        //if the file is loaded successfully, add it to the scene
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        // called while loading is progressing
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        // called if there is an error loading the file
        console.error('An error happened', error);
    }
);

// create a new WebGL renderer and set its size to the window's dimensions
const renderer = new THREE.WebGLRenderer({ alpha: true }); //alpha: true allows for transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// add the renderer's canvas element to the DOM
document.getElementById('container3D').appendChild(renderer.domElement);

camera.position.z = 3; // adjust camera position based on the object

// add lights

const topLight = new THREE.DirectionalLight(0xffffff, 100000); //color intensity
topLight.position.set(500, 500, 500); //position of the light
topLight.castShadow = true; //enable shadows
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 10000); //color intensity
scene.add(ambientLight);

// render scene

function animate() {
    requestAnimationFrame(animate); //call animate function on the next frame
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;
    object.rotation.z += 0.01; //rotate the object on the y-axis
    renderer.render(scene, camera); //render the scene from the perspective of the camera
}
// resize if someone resizes the window
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();