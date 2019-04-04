
var camera, scene, renderer;
var cameraControls;
var barco;
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
		islas.load( 'far.obj', function ( object ) {
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
