import * as THREE from 'three';


import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer;
      
      var clock;
      var sphere;
      var satellite;

init();
animate();

function init()
      {
          //clock
          clock = new THREE.Clock();
          
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.001 );

  renderer = new THREE.WebGLRenderer({antialias: true, canvas: document.querySelector("#canvas")});
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.set( 10, 5, 0 );

          // controls

          controls = new OrbitControls( camera, renderer.domElement );
          controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
          controls.dampingFactor = 0.05;

          controls.maxPolarAngle = Math.PI / 2;

  // sphere
          const geometry = new THREE.SphereGeometry( 1, 32, 32 );
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: false } );
          sphere = new THREE.Mesh( geometry, material );
          scene.add( sphere );
          
          //satelite
          const geometry_satelite = new THREE.BoxGeometry( 0.4, 0.4, 0.4 );
  const material_satelite = new THREE.MeshNormalMaterial( {  flatShading: true } );
          satellite = new THREE.Mesh( geometry_satelite, material_satelite );
          scene.add( satellite );
          
          //FLOOR
          const planeSize = 10;

          const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
          const planeMat = new THREE.MeshPhongMaterial({color : 0XEEEEEE ,side: THREE.DoubleSide});
          const mesh = new THREE.Mesh(planeGeo, planeMat);
          mesh.rotation.x = Math.PI/2;
          mesh.position.y = -1;
          scene.add(mesh);
  

  // lights

  const dirLight1 = new THREE.DirectionalLight( 0xffffff );
  dirLight1.position.set( 1, 1, 1 );
  scene.add( dirLight1 );

  const dirLight2 = new THREE.DirectionalLight( 0x002288 );
  dirLight2.position.set( - 1, - 1, - 1 );
  scene.add( dirLight2 );

  const ambientLight = new THREE.AmbientLight( 0x222222 );
  scene.add( ambientLight );

  //

  window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize()
      {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate()
      {
          //time tracking
          var delta = clock.getDelta();
    var elapsed = clock.elapsedTime;
          
          //sphere position
          sphere.position.x = Math.sin(elapsed/2) * 3;
          sphere.position.z = Math.cos(elapsed/2) * 3;
          
          //satellite
          satellite.position.x =  sphere.position.x + Math.sin(elapsed*2) * 2;
          satellite.position.z = sphere.position.z + Math.cos(elapsed*2) * 2;
          satellite.rotation.x += 0.4 * delta;
          satellite.rotation.y += 0.2 * delta;
          
  requestAnimationFrame( animate );
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  renderer.render( scene, camera );
}
