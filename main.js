import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// initiating scene
const scene = new THREE.Scene();

// initiating camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// initiating renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);
camera.position.setX(-0.1);
camera.position.setY(0.1);
camera.position.setZ(0.20);

renderer.render(scene, camera);

// initiating light
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initiating loaders

// GLTF
const loader = new GLTFLoader();

let objectRef;

loader.load(
	// resource URL
	'/resources/scene.gltf',
	// called when the resource is loaded
	(gltf) => {
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
		
		objectRef  = gltf.scene; // making gltf.scene accessible for animation
		objectRef.rotation.y += 45; // Rotating before animation

		scene.add(objectRef); // Adding to the scene

	},
	// called while loading is progressing
	(xhr) => {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	// called when loading has errors
	(error) => {
		console.log( 'An error happened:' + error);
	}
);

// bg
// const bg = new THREE.
// scene.background = bg;

// mouse controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// animate
function animate() {
	requestAnimationFrame(animate);

	objectRef.rotation.y += ( Math.PI / 180 ) * 0.05;

	renderer.render(scene, camera);
}

animate();
