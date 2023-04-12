import * as THREE from 'three';

var camera, scene, renderer;
var spheres, lines;
var mesh;

init();
animate();

var spacing=0.2;
var initRot=1;
var radius=18;


function init() {

renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#canvas")});

camera = new THREE.PerspectiveCamera(70, 1, 1, 100);
camera.position.z = 25;

scene = new THREE.Scene();

var geometry = new THREE.SphereGeometry(10, 100, 100);
var material  = new THREE.MeshPhongMaterial();

const loader = new THREE.TextureLoader();
material.map    = loader.load('earthmap1k_jpl.jpg')

  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x +=0.5;
  mesh.rotation.y =0.1;
  //

  // sattelite
 spheres=[];
 lines=[];
  for(var i=0;i<9;i++){
    var satellite = new THREE.BoxGeometry( 0.8, 0.8, 0.8 );  
    var satmat = new THREE.MeshNormalMaterial( {  flatShading: true } );
    //satellite = new THREE.SphereGeometry(1);
    //satmat = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: false } );
    var sphere = new THREE.Mesh( satellite , satmat );
    var x=i % 3;
    var y=Math.floor(i/3);
    sphere.position.y=-2.5+y*2.5;
    sphere.position.x =  -radius*Math.cos(mesh.rotation.y+x*spacing+initRot);
    sphere.position.z = radius*Math.sin(mesh.rotation.y+x*spacing+initRot);
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

var alternate=1;
function animate() {
  resize();
  mesh.rotation.y += 0.001;
  for(var i in lines){
    lines[i].parent.remove(lines[i]);
  }
  lines=[];
  const linemat = new THREE.LineBasicMaterial( { color: 0xffffff } );
  for(var i=0;i<9;i++){
    var x=i % 3;
    var y=Math.floor(i/3);
    spheres[i].position.x =  -radius*Math.cos((mesh.rotation.y+x*spacing+initRot));
    spheres[i].position.z = radius*Math.sin((mesh.rotation.y+x*spacing+initRot));
 
    //create a blue LineBasicMaterial
    if ((alternate % 5) ==1){
      const points = [];
      var lx= -9*Math.cos((mesh.rotation.y+initRot+0.1))
      var lz = 9*Math.sin((mesh.rotation.y+initRot+0.1));
      points.push( new THREE.Vector3(lx,0.9, lz ) );
      points.push( new THREE.Vector3(spheres[i].position.x,spheres[i].position.y, spheres[i].position.z) );
      const lineGeo = new THREE.BufferGeometry().setFromPoints( points );
      const line = new THREE.Line( lineGeo, linemat );
      scene.add(line);
      lines.push(line);  
    }
  }
  alternate=alternate+1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}