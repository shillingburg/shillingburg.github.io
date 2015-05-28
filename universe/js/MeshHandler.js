var container;
var camera, scene, renderer;
var mouseX = 0,
  mouseY = 0;
var wiremat = new THREE.MeshBasicMaterial({
  color: 0xea3469,
  wireframe: true,
  blending: THREE.AdditiveBlending,
  wireframeLinewidth: 1.2,
  fog: false,
  overdraw: 0.3,
  opacity: 0.3,
  side: THREE.DoubleSide
});
var wireColor = 0xea3469;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var hue = 0;
var newColor;
var footbutt = document.getElementById('mc-embedded-subscribe');
var formtext = document.getElementById('mce-EMAIL');
var meshmesh;
var xValue = 0;
var yValue = 0;


function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 100;
  // scene
  scene = new THREE.Scene();
  // texture
  var manager = new THREE.LoadingManager();
  manager.onProgress = function(item, loaded, total) {
    console.log(item, loaded, total);
  };
  var texture = new THREE.Texture();
  var onProgress = function(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };
  var onError = function(xhr) {};
  var loader = new THREE.OBJLoader(manager);
  loader.load('/images/mesh.obj', function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = wiremat;
        child.rotation.x = -30;
        child.scale.x = 0.7;
        child.scale.y = 0.7;
        child.scale.z = 0.7;
        child.position.x = -25;
        child.position.y = -80;
      }
    });
    meshmesh = object;
    scene.add(meshmesh);
  }, onProgress, onError);
  renderer = new THREE.CanvasRenderer({
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mousedown', mousedown, false);
  document.addEventListener('mouseup', mouseup, false);
  document.addEventListener('touchstart', mousedown, false);
  document.addEventListener('touchend', mouseup, false);
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener("deviceorientation", function(event) {
    xValue = Math.round(event.gamma);
    yValue = Math.round(event.beta);
  }, true);
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 2;
  mouseY = (event.clientY - windowHalfY) / 2;
}
var mouse = false;
function mousedown() {
  mouse = true;
  callEvent();
}
function mouseup() {
  mouse = false;
}
function callEvent() {
  if (mouse) {
    meshmesh.scale.z += (0 - meshmesh.scale.z) * 0.05;
    meshmesh.scale.x += (1.5 - meshmesh.scale.x) * 0.05;
    meshmesh.scale.y += (1.5 - meshmesh.scale.y) * 0.05;
    meshmesh.position.z += (-100 - meshmesh.position.z) * 0.05;


    setTimeout("callEvent()", 1);
  } else
    return;
}
function animate() {
  requestAnimationFrame(animate);
  render();
}

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (h && s === undefined && v === undefined) {
    s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;
    case 1:
      r = q, g = v, b = p;
      break;
    case 2:
      r = p, g = v, b = t;
      break;
    case 3:
      r = p, g = q, b = v;
      break;
    case 4:
      r = t, g = p, b = v;
      break;
    case 5:
      r = v, g = p, b = q;
      break;
  }

  var retCol = 'rgb(' + Math.floor(r * 255) + ',' +
    Math.floor(g * 255) + ',' +
    Math.floor(b * 255) + ')';
  return retCol;
}


function render() {
  hue += 0.1;
  if (hue == 360) {
    hue = 0;
  }
  newColor = HSVtoRGB(hue / 360, 0.7, 1);
  wiremat.setValues({
    color: newColor
  });
  camera.position.x += ((0.01 * mouseX) - camera.position.x) * .01;
  camera.position.y += (-(mouseY * 0.01) - camera.position.y) * .05;
  var elements = document.getElementsByClassName('heading2');
  renderer.render(scene, camera);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.color = newColor;
  }
  footbutt.style.borderColor = newColor;
  formtext.style.color = newColor;
  if (!mouse && meshmesh) {
    meshmesh.scale.z += (1 - meshmesh.scale.z) * 0.05;
    meshmesh.scale.x += (0.8 - meshmesh.scale.x) * 0.05;
    meshmesh.scale.y += (0.8 - meshmesh.scale.y) * 0.05;
    meshmesh.position.z += (-20 - meshmesh.position.z) * 0.05;
    camera.position.x += ((xValue) - camera.position.x) * .01;
    camera.position.y += ((yValue) - camera.position.y) * .01;
  }
}
init();
animate();
