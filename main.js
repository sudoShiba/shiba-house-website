/*
░░░░░░░▐█▀█▄░░░░░░░░░░▄█▀█▌
░░░░░░░█▐▓░█▄░░░░░░░▄█▀▄▓▐█
░░░░░░░█▐▓▓░████▄▄▄█▀▄▓▓▓▌█
░░░░░▄█▌▀▄▓▓▄▄▄▄▀▀▀▄▓▓▓▓▓▌█
░░░▄█▀▀▄▓█▓▓▓▓▓▓▓▓▓▓▓▓▀░▓▌█
░░█▀▄▓▓▓███▓▓▓███▓▓▓▄░░▄▓▐█▌
░█▌▓▓▓▀▀▓▓▓▓███▓▓▓▓▓▓▓▄▀▓▓▐█
▐█▐██▐░▄▓▓▓▓▓▀▄░▀▓▓▓▓▓▓▓▓▓▌█▌
█▌███▓▓▓▓▓▓▓▓▐░░▄▓▓███▓▓▓▄▀▐█
█▐█▓▀░░▀▓▓▓▓▓▓▓▓▓██████▓▓▓▓▐█▌
▓▄▌▀░▀░▐▀█▄▓▓██████████▓▓▓▌█ 
*/

import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// scene & camera
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0.5);
scene.add(camera);

const ambiLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambiLight);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// house
const loader = new GLTFLoader();
const houseGroup = new THREE.Group();
loader.load(
    // resource URL
    'resources/forest_house.glb',
    // called when the resource is loaded
    (gltf) => {
        houseGroup.add(gltf.scene);
        houseGroup.scale.set(5, 4, 5);
        houseGroup.rotation.y = Math.PI / 2;
        houseGroup.position.y -= 0.2;
        houseGroup.translateX(0.15);
        scene.add(houseGroup);
    },
    // called while loading is progressing
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    (error) => {
        console.log("An error happened" + error);
    }
);

// animation
const animate = () => {
    requestAnimationFrame(animate)
    houseGroup.rotation.y += 0.001;
    renderer.render(scene, camera);
};

// Start the animation loop
animate();


window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});