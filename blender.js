
////////////////////////////////////////////////////////////


var camera, camera2, scene, renderer;
var cameraControls, cameraControls2;
var barco;
var click = 0;
var keyboard = new KeyboardState();
var clock = new THREE.Clock();
var arr = [];
var keyboard = new KeyboardState();
var no_element=0;
var counter=0;

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

	for (var i=0; i< 6; i++){
		arr.push(new Robot((i*12)+70, 100, (i*3)+175, i))

	}

	drawLandscape();
}



class Robot {
	constructor(x, y, z, c) {
		var root, robotChest, robotNeck, robotHead, robotHip, robotLeftHip, robotRightHip, robotRightKnee, robotLeftKnee, robotLeftAnkle, robotRightAnkle, robotRightShoulder, robotLeftShoulder, robotLeftElbow, robotRightElbow, robotLeftWritst, robotRightWrist;
		root = new THREE.Group();
		root.position.y = y - 75;
		root.position.x = x;
		root.position.z = z;
		scene.add(root);
		// MATERIALS
		var materialBlue = new THREE.MeshPhongMaterial({ color: 0x243ec6 });
		if (c%2==0){
			materialBlue = new THREE.MeshPhongMaterial({ color: 0xFF0000 });

		}

		let materialGray = new THREE.MeshPhongMaterial({ color: 0x1a1d2b });
		let joint = new THREE.Mesh(new THREE.SphereBufferGeometry(1.5, 9.6, 9.6), materialGray);
		let bone = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.2, 1.2, 6.0, 9.6), materialBlue);
		bone.position.y = -3.0;
		let piece = new THREE.Group();
		piece.add(joint);
		piece.add(bone);
		let hand = new THREE.Mesh(new THREE.BoxBufferGeometry(0.6, 2.4, 2.4), materialBlue);
		hand.position.y = -1.5;
		let wristPiece = new THREE.Group();
		wristPiece.add(joint.clone());
		wristPiece.add(hand);
		let feet = new THREE.Mesh(new THREE.BoxBufferGeometry(1.8, 1.2, 4.5), materialBlue);
		feet.position.y = -1.8;
		feet.position.z = 1.2;
		let feetPiece = new THREE.Group();
		feetPiece.add(joint.clone());
		feetPiece.add(feet);
		//body
		robotChest = new THREE.Group();
		root.add(robotChest);
		let chest = new THREE.Mesh(new THREE.BoxBufferGeometry(9.0, 12.0, 4.5), materialBlue);
		chest.position.x = 0.0;
		chest.position.y = 30.0;
		chest.position.z = 0.0;
		robotChest.add(chest);
		robotNeck = new THREE.Group();
		chest.add(robotNeck);
		let neckSphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1.2, 9.6, 9.6), materialGray);
		robotNeck.add(neckSphere);
		robotNeck.position.y = 6.9;
		robotHead = new THREE.Group();
		let jointSphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.9, 9.6, 9.6), materialGray);
		let face = new THREE.Mesh(new THREE.BoxBufferGeometry(6.0, 4.5, 4.5), materialBlue);
		robotHead.add(face);
		let leftEye = jointSphere.clone();
		leftEye.position.x = 1.5;
		leftEye.position.y = 0.9;
		leftEye.position.z = 2.1;
		robotHead.add(leftEye);
		let rightEye = jointSphere.clone();
		rightEye.position.x = -1.5;
		rightEye.position.y = 0.9;
		rightEye.position.z = 2.1;
		robotHead.add(rightEye);
		let leftEar = jointSphere.clone();
		leftEar.position.x = 3.0;
		robotHead.add(leftEar);
		let rightEar = jointSphere.clone();
		rightEar.position.x = -3.0;
		robotHead.add(rightEar);
		let mouth = new THREE.Mesh(new THREE.BoxBufferGeometry(1.0, 0.2, 0.1), materialGray);
		mouth.position.y = -0.9;
		mouth.position.z = 2.4;
		robotHead.add(mouth);
		robotHead.position.y = 2.4;
		robotNeck.add(robotHead);
		robotRightShoulder = piece.clone();
		robotRightShoulder.position.x = -4.5;
		robotRightShoulder.position.y = 6.0;
		robotRightShoulder.position.z = 0.0;
		robotRightElbow = piece.clone();
		robotRightElbow.position.y = -5.4;
		robotRightShoulder.add(robotRightElbow);
		robotRightWrist = wristPiece.clone();
		robotRightWrist.position.y = -5.4;
		robotRightElbow.add(robotRightWrist);
		chest.add(robotRightShoulder);
		robotRightShoulder.rotateZ(-0.03);
		robotLeftShoulder = piece.clone();
		robotLeftElbow = piece.clone();
		robotLeftElbow.position.y = -5.4;
		robotLeftShoulder.add(robotLeftElbow);
		robotLeftWritst = wristPiece.clone();
		robotLeftWritst.position.y = -5.4;
		robotLeftElbow.add(robotLeftWritst);
		robotLeftShoulder.position.x = 4.5;
		robotLeftShoulder.position.y = 6.0;
		robotLeftShoulder.position.z = 0.0;
		chest.add(robotLeftShoulder);
		robotLeftShoulder.rotateZ(0.03);
		robotHip = new THREE.Group();
		let sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(2.1, 9.6, 9.6), materialGray);
		let box = new THREE.Mesh(new THREE.BoxBufferGeometry(9.0, 1.8, 4.5), materialBlue);
		box.position.y = -2.1;
		robotHip.add(sphere);
		robotHip.add(box);
		robotHip.position.y = 23.1;
		root.add(robotHip);
		robotRightHip = piece.clone();
		robotRightKnee = piece.clone();
		robotRightKnee.position.y = -5.4;
		robotRightHip.add(robotRightKnee);
		robotRightAnkle = feetPiece.clone();
		robotRightAnkle.position.y = -5.4;
		robotRightKnee.add(robotRightAnkle);
		robotRightHip.position.x = -3.3;
		robotRightHip.position.y = -2.4;
		robotHip.add(robotRightHip);
		robotLeftHip = piece.clone();
		robotLeftKnee = piece.clone();
		robotLeftKnee.position.y = -5.4;
		robotLeftHip.add(robotLeftKnee);
		robotLeftAnkle = feetPiece.clone();
		robotLeftAnkle.position.y = -5.4;
		robotLeftKnee.add(robotLeftAnkle);
		robotLeftHip.position.x = 3.3;
		robotLeftHip.position.y = -2.4;
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
					object.position.x = 170;
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


	camera = new THREE.PerspectiveCamera(2, canvasRatio, 4000, 50000);
  camera.position.set(15000, 4000, 00);

  cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set(700, 100, 100);

	camera2 = new THREE.PerspectiveCamera(2, canvasRatio, 4000, 50000);
  camera2.position.set(0, 3000, 11000);

  cameraControls2 = new THREE.OrbitControls(camera2, renderer.domElement);
	cameraControls2.target.set(250, 100, 100);

	camera3 = new THREE.PerspectiveCamera(2, canvasRatio, 4000, 50000);
  camera3.position.set(-15000, 4000, 0);

  cameraControls3 = new THREE.OrbitControls(camera3, renderer.domElement);
  cameraControls3.target.set(450, 100, 100);


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

	var moveSpeed = 1;
function render() {
	// for (var i=0; i< arr.length; i++){
	var forward = new THREE.Vector3(1, 0, 0);
	forward.applyQuaternion(boat.quaternion).normalize();

		if (boat.position.x == 170 ){
			console.log("port 1 Hello! I am an alert box!!");
			var count1=0;
			for(var i = 0; i < 6; i++){

				console.log("robot "+ i + " " +arr[i].root.position.x);
				if (arr[i].root.position.x>175){
					count1=count1+1;
				}
			}

			if (count1==2){
				if(boat.position.x < 360){
					boat.translateOnAxis(forward, moveSpeed);
					moveSpeed = 1;
				}


			}


		}
		if (boat.position.x==360){
			moveSpeed = -1;
			console.log("port 2 Hello! I am an alert box!!");

		}

		if(boat.position.x > 170 && boat.position.x < 360){
			boat.translateOnAxis(forward, moveSpeed);

		}

  var delta = clock.getDelta();

	keyboard.update();

	if (keyboard.pressed("W")) {
		moveRobot(no_element);
		arr[no_element].root.translateZ(0.7);
	}

	if (keyboard.pressed("A")) {
		arr[no_element].root.rotateY(0.1);
	}



  if (keyboard.pressed("J")) {
		if(boat.position.x > 170){
			boat.translateOnAxis(forward, -moveSpeed);
		}
	}

  if (keyboard.pressed("L")) {
		if(boat.position.x < 360){
			boat.translateOnAxis(forward, moveSpeed);
		}
	}

	if (keyboard.pressed("D")) {
		arr[no_element].root.rotateY(-.1);
	}

	if (keyboard.pressed("S")) {
		moveRobot();
		arr[no_element].root.translateZ(-.7);
	}

	cameraControls.update(delta);
	renderer.render(scene, camera);


	if (keyboard.pressed("C")){
		click = 1;
	}

	if (keyboard.pressed("V")){
		click = 2;
	}

	if (keyboard.pressed("B")){
		click = 0;
	}

	if(click == 0){
		cameraControls3.update(delta);
		renderer.render(scene, camera3);
	}else if(click == 1){
		cameraControls.update(delta);
		renderer.render(scene, camera);
	}else if(click == 2){
		cameraControls2.update(delta);
		renderer.render(scene, camera2);
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
