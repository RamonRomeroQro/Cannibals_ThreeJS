
var camera, camera2, scene, renderer;
var cameraControls, cameraControls2;
var barco;
var click = 0;
var keyboard = new KeyboardState();
var clock = new THREE.Clock();

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

	var islas = new THREE.OBJLoader( manager );
		islas.load( 'islas.obj', function ( object ) {
			object.scale.set(20,20,20);
			object.position.y = 0;
			scene.add( object );
		}, onProgress, onError );

		barco = new THREE.OBJLoader( manager );
			barco.load( 'barco.obj', function ( object ) {
				object.scale.set(7,7,7);
				object.position.y = 20;
				object.position.x = 360;
				object.position.z = 185;
				scene.add( object );
			}, onProgress, onError );

}

function init() {
	var canvasWidth = 1000;
	var canvasHeight = 900;
	var canvasRatio = canvasWidth / canvasHeight;

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0xAAAAAA, 1.0 );


	camera = new THREE.PerspectiveCamera(2, canvasRatio, 4000, 50000);
  camera.position.set(20000, 4000, 00);

  cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set(700, 100, 100);


	camera2 = new THREE.PerspectiveCamera(2, canvasRatio, 4000, 50000);
  camera2.position.set(0, 3000, 11000);

  cameraControls2 = new THREE.OrbitControls(camera2, renderer.domElement);
	cameraControls2.target.set(450, 100, 100);
	
	camera3 = new THREE.PerspectiveCamera(2, canvasRatio, 4000, 50000);
  camera3.position.set(-20000, 4000, 0);

  cameraControls3 = new THREE.OrbitControls(camera3, renderer.domElement);
  cameraControls3.target.set(450, 100, 170);

	
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

	var moveSpeed = 5;
	var forward = new THREE.Vector3(1, 0, 0);
	

	keyboard.update();
	var delta = clock.getDelta();

	if (keyboard.pressed("A")) {
		barco.rotation.x = 1
	}

	if (keyboard.pressed("D")) {
		barco.translateOnAxis(-forward, moveSpeed);
	}
	if (keyboard.pressed("C")){
		cameraControls.update(delta);
		renderer.render(scene, camera);
		click = 1;
	}

	if (keyboard.pressed("V")){
		cameraControls2.update(delta);
		renderer.render(scene, camera2);
		click = 2;
	}

	if (keyboard.pressed("B")){
		cameraControls3.update(delta);
		renderer.render(scene, camera3);
		click = 0;
	}

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
