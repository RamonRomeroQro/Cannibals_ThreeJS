var camera, scene, renderer;
var cameraControls;
var keyboard = new KeyboardState();
var clock = new THREE.Clock();
var barco;
var boat;
var rotado = 0;

function fillScene() {
	scene = new THREE.Scene();
	scene.add( new THREE.AmbientLight( 0x222222 ) );

	var light = new THREE.DirectionalLight( 0xffffff, 0.7 );
	light.position.set( 200, 500, 500 );

	scene.add( light );

	light = new THREE.DirectionalLight( 0xffffff, 0.9 );
	light.position.set( -200, -100, -400 );

	scene.add( light );

	var gridXZ = new THREE.GridHelper(2000, 100, new THREE.Color(0xCCCCCC), new THREE.Color(0x888888));
	scene.add(gridXZ);

	var axes = new THREE.AxisHelper(150);
	axes.position.y = 1;
	scene.add(axes);

	drawLandscape();
}

function drawLandscape() {

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) {
	};

	var manager = new THREE.LoadingManager();

	var mtlLoader = new THREE.MTLLoader(manager);
		mtlLoader.setPath('assets/');
		 mtlLoader.load('islas.mtl', function(materials) {
		 materials.preload();
	var islas = new THREE.OBJLoader(manager);
	islas.setPath('assets/');
		islas.setMaterials(materials);
		islas.load( 'islas.obj', function ( object ) {
			object.scale.set(20,20,20);
			object.position.y = 0;
			scene.add( object );
		}, onProgress, onError); });

		var mtlL= new THREE.MTLLoader(manager);
		mtlL.setPath('assets/');
			 mtlL.load('barco.mtl', function(m) {
				 m.preload();
		 var barco = new THREE.OBJLoader(manager);
		 barco.setPath('assets/');
		  barco.setMaterials(m);
			barco.load( 'barco.obj', function ( object ) {
				object.scale.set(12,12,12);
					object.position.y = 27;
					object.position.x = 355;
					object.position.z = 175;
				 scene.add(object);
				 boat = object;
			}, onProgress, onError);});
}

function init() {
	var canvasWidth = 1900;
	var canvasHeight = 900;
	var canvasRatio = canvasWidth / canvasHeight;

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0xAAAAAA, 1.0 );

  camera = new THREE.PerspectiveCamera(2, canvasRatio, 4000, 12000);
  camera.position.set(0, 4000, 11000);

  cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
  cameraControls.target.set(250, 100, 100);
}

function addToDOM() {
    var canvas = document.getElementById('canvas');
    canvas.appendChild(renderer.domElement);
    console.log(canvas);
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();

	keyboard.update();
	var moveSpeed = 1;
	var forward = new THREE.Vector3(1, 0, 0);
	forward.applyQuaternion(boat.quaternion).normalize();

	if (keyboard.pressed("A")) {
		if(boat.position.x > 170){
			boat.translateOnAxis(forward, -moveSpeed);
		}
	}
	if (keyboard.pressed("D")) {
		if(boat.position.x < 360){
			boat.translateOnAxis(forward, moveSpeed);
		}
	}


	cameraControls.update(delta);
	renderer.render(scene, camera);
}

try {
  init();
  fillScene();
  addToDOM();
  animate();
} catch(error) {
    console.log("Error:");
    console.log(error);
}
