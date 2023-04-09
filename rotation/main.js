import * as THREE from 'three';

var camera, scene, renderer;
var spheres
var mesh;

init();
animate();

function init() {

renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#canvas")});

camera = new THREE.PerspectiveCamera(70, 1, 1, 100);
camera.position.z = 25;

scene = new THREE.Scene();

var geometry = new THREE.SphereGeometry(10, 100, 100);
var material  = new THREE.MeshPhongMaterial();

const loader = new THREE.TextureLoader();
material.map    = loader.load('http://s3-us-west-2.amazonaws.com/s.cdpn.io/1206469/earthmap1k.jpg')

  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x += 0.5;

  // sattelite
 spheres=[];
  for(var i=0;i<3;i++){
    var satellite = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );  
    var satmat = new THREE.MeshNormalMaterial( {  flatShading: true } );
    //satellite = new THREE.SphereGeometry(1);
    //satmat = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: false } );
    var sphere = new THREE.Mesh( satellite , satmat );
    sphere.position.set(-20,-2+i*2,0);
    sphere.rotation.x=1;  
    scene.add(sphere);
    spheres.push(sphere);
}

  scene.add(mesh);

  var light1 = new THREE.AmbientLight( 0xffffff );
  light1.position.set(100, 50, 100);
  scene.add(light1);


}

function resize() {
  var width = renderer.domElement.clientWidth;
  var height = renderer.domElement.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix(); 
}

function animate() {
  resize();
  mesh.rotation.y += 0.005;
  for(var i=0;i<3;i++){
    spheres[i].position.x =  -20*Math.cos(mesh.rotation.y);
    spheres[i].position.z = 20*Math.sin(mesh.rotation.y);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}