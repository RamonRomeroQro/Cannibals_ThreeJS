

////////////////////////////////////////////////////////////

var camera, scene, renderer;
var cameraControls;
var barco;
var keyboard = new KeyboardState();
var clock = new THREE.Clock();
var arr = [];
var keyboard = new KeyboardState();
var no_element=0;


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
	
	for (var i=0; i< 10; i++){
		arr.push(new Robot(i*100, 0, i*100))

	}

	drawLandscape();
}



class Robot {
	constructor(x, y, z) {
		var root, robotChest, robotNeck, robotHead, robotHip, robotLeftHip, robotRightHip, robotRightKnee, robotLeftKnee, robotLeftAnkle, robotRightAnkle, robotRightShoulder, robotLeftShoulder, robotLeftElbow, robotRightElbow, robotLeftWritst, robotRightWrist;
		root = new THREE.Group();
		root.position.y = y - 75;
		root.position.x = x;
		root.position.z = z;
		scene.add(root);
		// MATERIALS
		let materialBlue = new THREE.MeshPhongMaterial({ color: 0x243ec6 });
		let materialGray = new THREE.MeshPhongMaterial({ color: 0x1a1d2b });
		let joint = new THREE.Mesh(new THREE.SphereBufferGeometry(15, 96, 96), materialGray);
		let bone = new THREE.Mesh(new THREE.CylinderBufferGeometry(12, 12, 60, 96), materialBlue);
		bone.position.y = -30;
		let piece = new THREE.Group();
		piece.add(joint);
		piece.add(bone);
		let hand = new THREE.Mesh(new THREE.BoxBufferGeometry(6, 24, 24), materialBlue);
		hand.position.y = -15;
		let wristPiece = new THREE.Group();
		wristPiece.add(joint.clone());
		wristPiece.add(hand);
		let feet = new THREE.Mesh(new THREE.BoxBufferGeometry(18, 12, 45), materialBlue);
		feet.position.y = -18;
		feet.position.z = 12;
		let feetPiece = new THREE.Group();
		feetPiece.add(joint.clone());
		feetPiece.add(feet);
		//body
		robotChest = new THREE.Group();
		root.add(robotChest);
		let chest = new THREE.Mesh(new THREE.BoxBufferGeometry(90, 120, 45), materialBlue);
		chest.position.x = 0;
		chest.position.y = 300;
		chest.position.z = 0;
		robotChest.add(chest);
		robotNeck = new THREE.Group();
		chest.add(robotNeck);
		let neckSphere = new THREE.Mesh(new THREE.SphereBufferGeometry(12, 96, 96), materialGray);
		robotNeck.add(neckSphere);
		robotNeck.position.y = 69;
		robotHead = new THREE.Group();
		let jointSphere = new THREE.Mesh(new THREE.SphereBufferGeometry(9, 96, 96), materialGray);
		let face = new THREE.Mesh(new THREE.BoxBufferGeometry(60, 45, 45), materialBlue);
		robotHead.add(face);
		let leftEye = jointSphere.clone();
		leftEye.position.x = 15;
		leftEye.position.y = 9;
		leftEye.position.z = 21;
		robotHead.add(leftEye);
		let rightEye = jointSphere.clone();
		rightEye.position.x = -15;
		rightEye.position.y = 9;
		rightEye.position.z = 21;
		robotHead.add(rightEye);
		let leftEar = jointSphere.clone();
		leftEar.position.x = 30;
		robotHead.add(leftEar);
		let rightEar = jointSphere.clone();
		rightEar.position.x = -30;
		robotHead.add(rightEar);
		let mouth = new THREE.Mesh(new THREE.BoxBufferGeometry(10, 2, 1), materialGray);
		mouth.position.y = -9;
		mouth.position.z = 24;
		robotHead.add(mouth);
		robotHead.position.y = 24;
		robotNeck.add(robotHead);
		robotRightShoulder = piece.clone();
		robotRightShoulder.position.x = -45;
		robotRightShoulder.position.y = 60;
		robotRightShoulder.position.z = 0;
		robotRightElbow = piece.clone();
		robotRightElbow.position.y = -54;
		robotRightShoulder.add(robotRightElbow);
		robotRightWrist = wristPiece.clone();
		robotRightWrist.position.y = -54;
		robotRightElbow.add(robotRightWrist);
		chest.add(robotRightShoulder);
		robotRightShoulder.rotateZ(-0.3);
		robotLeftShoulder = piece.clone();
		robotLeftElbow = piece.clone();
		robotLeftElbow.position.y = -54;
		robotLeftShoulder.add(robotLeftElbow);
		robotLeftWritst = wristPiece.clone();
		robotLeftWritst.position.y = -54;
		robotLeftElbow.add(robotLeftWritst);
		robotLeftShoulder.position.x = 45;
		robotLeftShoulder.position.y = 60;
		robotLeftShoulder.position.z = 0;
		chest.add(robotLeftShoulder);
		robotLeftShoulder.rotateZ(0.3);
		robotHip = new THREE.Group();
		let sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(21, 96, 96), materialGray);
		let box = new THREE.Mesh(new THREE.BoxBufferGeometry(90, 18, 45), materialBlue);
		box.position.y = -21;
		robotHip.add(sphere);
		robotHip.add(box);
		robotHip.position.y = 231;
		root.add(robotHip);
		robotRightHip = piece.clone();
		robotRightKnee = piece.clone();
		robotRightKnee.position.y = -54;
		robotRightHip.add(robotRightKnee);
		robotRightAnkle = feetPiece.clone();
		robotRightAnkle.position.y = -54;
		robotRightKnee.add(robotRightAnkle);
		robotRightHip.position.x = -33;
		robotRightHip.position.y = -24;
		robotHip.add(robotRightHip);
		robotLeftHip = piece.clone();
		robotLeftKnee = piece.clone();
		robotLeftKnee.position.y = -54;
		robotLeftHip.add(robotLeftKnee);
		robotLeftAnkle = feetPiece.clone();
		robotLeftAnkle.position.y = -54;
		robotLeftKnee.add(robotLeftAnkle);
		robotLeftHip.position.x = 33;
		robotLeftHip.position.y = -24;
		robotHip.add(robotLeftHip);
		this.root = root;
		this.robotChest = robotChest;
		this.robotNeck = robotNeck;
		this.robotHead = robotHead;
		this.robotHip = robotHip;
		this.robotLeftHip = robotLeftHip;
		this.robotRightHip = robotRightHip;
		this.robotRightKnee = robotRightKnee;
		this.robotLeftKnee = robotLeftKnee;
		this.robotLeftAnkle = robotLeftAnkle;
		this.robotRightAnkle = robotRightAnkle;
		this.robotRightShoulder = robotRightShoulder;
		this.robotLeftShoulder = robotLeftShoulder;
		this.robotLeftElbow = robotLeftElbow;
		this.robotRightElbow = robotRightElbow;
		this.robotLeftWritst = robotLeftWritst;
		this.robotRightWrist = robotRightWrist;
	}
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



function moveRobot(i) {
	counter += 0.15;
	let range = 0.15;

	arr[i].robotHead.rotateZ(Math.cos(counter) * range * 0.02);
	arr[i].robotHead.rotateZ(-Math.cos(counter) * range * 0.1);

	arr[i].robotChest.rotateZ(-Math.cos(counter) * range * 0.02);
	arr[i].robotChest.rotateZ(Math.cos(counter) * range * 0.01);

	arr[i].robotLeftShoulder.rotateX(-Math.cos(counter) * range);
	arr[i].robotLeftElbow.rotateX(-Math.sin(counter) * range * 0.5);

	arr[i].robotRightShoulder.rotateX(Math.cos(counter) * range);
	arr[i].robotRightElbow.rotateX(-Math.sin(counter) * range * 0.5);

	arr[i].robotHip.rotateY(-Math.cos(counter) * range * 0.2);

	arr[i].robotLeftHip.rotateX(-Math.cos(counter) * range);
	arr[i].robotLeftKnee.rotateX(Math.sin(counter) * range * 0.5);

	arr[i].robotRightHip.rotateX(Math.cos(counter) * range);
	arr[i].robotRightKnee.rotateX(Math.sin(counter) * range * 0.5);
}


function render() {
	// for (var i=0; i< arr.length; i++){
	keyboard.update();
	var delta = clock.getDelta();

	if (keyboard.pressed("W")) {
		moveRobot(no_element);
		arr[no_element].root.translateZ(7);
	}

	if (keyboard.pressed("A")) {
		arr[no_element].root.rotateY(0.1);
	}

	if (keyboard.pressed("D")) {
		arr[no_element].root.rotateY(-0.1);
	}

	if (keyboard.pressed("S")) {
		moveRobot();
		arr[no_element].root.translateZ(-7);
	}

	cameraControls.update(delta);
	renderer.render(scene, camera);
//}
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
