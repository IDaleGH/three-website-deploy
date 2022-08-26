import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import * as THREE from "three";
import bg from "./images/bg.jpg";

console.log(THREE);

//CANVAS
const canvas = document.querySelector('#webgl');

//SCENE
const scene = new THREE.Scene();

//BACKGROUND TEXTURE
const textureLoader = new THREE.TextureLoader();
//const bgTexture = textureLoader.load("./images/bg.jpg");
const bgTexture = textureLoader.load(bg);
scene.background = bgTexture;

//SIZE
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

//CREATE OBJECTS
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.5, -15);
box.rotation.set(1, 1, 0);

const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0, 1, 10);

scene.add(box, torus);

//SENKEI HOKAN ANIMATION
function lerp(x, y, a){
  return (1 - a) * x + a * y;
}

function scalePercent(start, end){
  return (scrollPercent - start) / (end-start);
}

//SCROLL ANIMATION
const animationScripts = [];
//ANIMATION ONE
animationScripts.push({
  start: 0,
  end: 40,
  function(){
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    //box.position.z += 0.01;
    box.position.z = lerp(-15, 2,scalePercent(0, 40));
    torus.position.z = lerp(10, -20,scalePercent(0, 40));
  }
});
//ANIMATION TWO
animationScripts.push({
  start: 40,
  end: 60,
  function(){
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.rotation.z = lerp(1, Math.PI, scalePercent(40, 60));
  }
});
//ANIMATION THREE
animationScripts.push({
  start: 60,
  end: 80,
  function(){
    camera.lookAt(box.position);
    camera.position.x = lerp(0, -15, scalePercent(60, 80));
    camera.position.y = lerp(1, 15, scalePercent(60, 80));
    camera.position.z = lerp(10, 25, scalePercent(60, 80));

  }
});
//ANIMATION FOUR
animationScripts.push({
  start: 80,
  end: 100,
  function(){
    camera.lookAt(box.position);
    box.rotation.x += 0.02;
    box.rotation.y += 0.02;
  }
});

//START SCROLL ANIMATION
function playScrollAnimation(){
  animationScripts.forEach((animation) =>{
    if (scrollPercent >= animation.start && scrollPercent <= animation.end){
      animation.function();
    }
  });
};

//GET THE NUMBER OF BROWSER SCROLL
let scrollPercent = 0;

document.body.onscroll = () =>{
  scrollPercent = 
  (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
  //console.log('scroll: ' + scrollPercent);
};

//ANIMATION
const tick = ()=> {
  window.requestAnimationFrame(tick);
  playScrollAnimation();

  renderer.render(scene, camera);
};

tick();

//RESIZE BROWSER
window.addEventListener("resize", ()=> {
   sizes.width = window.innerWidth;
   sizes.height = window.innerHeight;

   camera.aspect = sizes.width / sizes.height;
   camera.updateProjectionMatrix();

   renderer.setSize(sizes.width, sizes.height);
   renderer.setPixelRatio(window.devicePixelRatio);
});

