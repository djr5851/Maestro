"use strict";
window.onload = (e) => {
	scaleToWindow(app.view, "black");
}
window.onresize = (e) => scaleToWindow(app.view, "black");
const app = new PIXI.Application(1280, 720);
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// pre-load the images
PIXI.loader.
add(["images/game.png", "images/WhiteNote.png", "images/BlackNote.png", "images/menuBG.jpg", "images/instructionsBG.jpg"]).
load(setup);

// aliases
let stage;


// game variables
let startScene;
let gameScene;
let gameOverScene;
let menuScene;
let recordScene;
let instructionsScene;
let songSelectionScene;
let time = 0;
let score = 0;
let currentSongIndex;
let startLabel1;
let scoreLabel;
let finalScoreLabel;
let backToMenuButton;
let gameButton;
let playbackButton;
let piano;
let menuBG;
let instructionsBG;
let a, s, d, f, g, h, j, k, l, semiColon, w, e, t, y, u, o, p;
let keyA, keyS, keyD, keyF, keyG, keyH, keyJ, keyK, keyL, keySemi, keyW, keyE, keyT, keyY, keyU, keyO, keyP;
let c1, db1, d1, eb1, e1, f1, gb1, g1, ab1, a1, bb1, b1, c2, db2, d2, eb2, e2;
let notes = [];
let recordedNotes = [];
let paused = true;
let recording = false;
let playbackMode;

// Set up all initial values and load assets
function setup() {
	stage = app.stage;

	instructionsBG = new PIXI.Sprite.fromImage('images/instructionsBG.jpg');
	instructionsBG.x = 0;
	instructionsBG.y = 0;
	instructionsBG.visible = false;
	app.stage.addChild(instructionsBG);

	menuBG = new PIXI.Sprite.fromImage('images/menuBG.jpg');
	menuBG.x = 0;
	menuBG.y = 0;
	app.stage.addChild(menuBG);


	// Start
	startScene = new PIXI.Container();
	stage.addChild(startScene);

	// Menu
	menuScene = new PIXI.Container();
	menuScene.visible = false;
	stage.addChild(menuScene);

	// Song Selection
	songSelectionScene = new PIXI.Container();
	songSelectionScene.visible = false;
	stage.addChild(songSelectionScene);

	// How to play
	instructionsScene = new PIXI.Container();
	instructionsScene.visible = false;
	stage.addChild(instructionsScene);

	// Record Mode
	recordScene = new PIXI.Container();
	recordScene.visible = false;
	stage.addChild(recordScene);

	// Game
	gameScene = new PIXI.Container();
	gameScene.visible = false;
	stage.addChild(gameScene);

	// Game Over
	gameOverScene = new PIXI.Container();
	gameOverScene.visible = false;
	stage.addChild(gameOverScene);

	createLabelAndButtons();

	// Sounds
	c1 = new Howl({
		src: ['sounds/C1.wav']
	});
	db1 = new Howl({
		src: ['sounds/Db1.wav']
	});
	d1 = new Howl({
		src: ['sounds/D1.wav']
	});
	eb1 = new Howl({
		src: ['sounds/Eb1.wav']
	});
	e1 = new Howl({
		src: ['sounds/E1.wav']
	});
	f1 = new Howl({
		src: ['sounds/F1.wav']
	});
	gb1 = new Howl({
		src: ['sounds/Gb1.wav']
	});
	g1 = new Howl({
		src: ['sounds/G1.wav']
	});
	ab1 = new Howl({
		src: ['sounds/Ab1.wav']
	});
	a1 = new Howl({
		src: ['sounds/A1.wav']
	});
	bb1 = new Howl({
		src: ['sounds/Bb1.wav']
	});
	b1 = new Howl({
		src: ['sounds/B1.wav']
	});
	c2 = new Howl({
		src: ['sounds/C2.wav']
	});
	db2 = new Howl({
		src: ['sounds/Db2.wav']
	});
	d2 = new Howl({
		src: ['sounds/D2.wav']
	});
	eb2 = new Howl({
		src: ['sounds/Eb2.wav']
	});
	e2 = new Howl({
		src: ['sounds/E2.wav']
	});

	keyA = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyA.x = 372;
	keyA.y = 547;
	keyA.visible = false;
	app.stage.addChild(keyA);

	keyS = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyS.x = 426;
	keyS.y = 547;
	keyS.visible = false;
	app.stage.addChild(keyS);

	keyD = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyD.x = 480;
	keyD.y = 547;
	keyD.visible = false;
	app.stage.addChild(keyD);

	keyF = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyF.x = 532;
	keyF.y = 547;
	keyF.visible = false;
	app.stage.addChild(keyF);

	keyG = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyG.x = 585;
	keyG.y = 547;
	keyG.visible = false;
	app.stage.addChild(keyG);

	keyH = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyH.x = 639;
	keyH.y = 547;
	keyH.visible = false;
	app.stage.addChild(keyH);

	keyJ = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyJ.x = 692;
	keyJ.y = 547;
	keyJ.visible = false;
	app.stage.addChild(keyJ);

	keyK = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyK.x = 746;
	keyK.y = 547;
	keyK.visible = false;
	app.stage.addChild(keyK);

	keyL = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyL.x = 798;
	keyL.y = 547;
	keyL.visible = false;
	app.stage.addChild(keyL);

	keySemi = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keySemi.x = 852;
	keySemi.y = 547;
	keySemi.visible = false;
	app.stage.addChild(keySemi);

	keyW = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyW.x = 408;
	keyW.y = 547;
	keyW.visible = false;
	app.stage.addChild(keyW);

	keyE = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyE.x = 461;
	keyE.y = 547;
	keyE.visible = false;
	app.stage.addChild(keyE);

	keyT = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyT.x = 560;
	keyT.y = 547;
	keyT.visible = false;
	app.stage.addChild(keyT);

	keyY = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyY.x = 621;
	keyY.y = 547;
	keyY.visible = false;
	app.stage.addChild(keyY);

	keyU = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyU.x = 683;
	keyU.y = 547;
	keyU.visible = false;
	app.stage.addChild(keyU);

	keyO = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyO.x = 781;
	keyO.y = 547;
	keyO.visible = false;
	app.stage.addChild(keyO);

	keyP = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyP.x = 835;
	keyP.y = 547;
	keyP.visible = false;
	app.stage.addChild(keyP);


	// Start update loop
	app.ticker.add(gameLoop);
}

// Create every label and button
function createLabelAndButtons() {
	let buttonStyle = new PIXI.TextStyle({
		align: "center",
		fill: 0x000000,
		fontSize: 48,
		fontFamily: "Georgia, serif",
		fontVariant: "small-caps"
	});
	let buttonStyleSmall = new PIXI.TextStyle({
		align: "center",
		fill: 0x000000,
		fontSize: 30,
		fontFamily: "Georgia, serif",
		fontVariant: "small-caps"
	});
	let headerStyle = new PIXI.TextStyle({
		align: "center",
		fill: 0x000000,
		fontSize: 96,
		fontFamily: 'Georgia, serif',
		fontVariant: "small-caps"
	});
	let textStyle = new PIXI.TextStyle({
	    align: "center",
		fill: 0xFFFFFF,
		fontSize: 18,
		fontFamily: 'Georgia, serif',
		fontVariant: "small-caps"
	});

	// Title
	startLabel1 = new PIXI.Text("Maestro");
	startLabel1.style = headerStyle;
	startLabel1.x = 445;
	startLabel1.y = 100;
	startScene.addChild(startLabel1);

	let startLabel2 = new PIXI.Text("Become a virtuoso in this\n thrilling test of musical ability");
	startLabel2.style = new PIXI.TextStyle({
		align: "center",
		fill: 0x000000,
		fontSize: 32,
		fontFamily: "Futura",
		fontStyle: "italic",
	});
	startLabel2.x = 440;
	startLabel2.y = 250;
	startScene.addChild(startLabel2);

	let menuButton = new PIXI.Text("Start");
	menuButton.style = buttonStyle;
	menuButton.x = 570;
	menuButton.y = 400;
	menuButton.interactive = true;
	menuButton.buttonMode = true;
	menuButton.on("pointerup", showMenu);
	menuButton.on('pointerover', e => e.target.alpha = 0.7);
	menuButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
	startScene.addChild(menuButton);

	// Main Menu
	gameButton = new PIXI.Text("Start Game");
	gameButton.style = buttonStyle;
	gameButton.x = 510;
	gameButton.y = 420;
	gameButton.interactive = false;
	gameButton.alpha = 0.5;
	gameButton.buttonMode = true;
	gameButton.on("pointerup", startGame);
	gameButton.on('pointerover', e => e.target.alpha = 0.7);
	gameButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
	menuScene.addChild(gameButton);

	playbackButton = new PIXI.Text("Playback");
	playbackButton.style = buttonStyle;
	playbackButton.x = 535;
	playbackButton.y = 350;
	playbackButton.interactive = false;
	playbackButton.alpha = 0.5;
	playbackButton.buttonMode = true;
	playbackButton.on("pointerup", startPlayback);
	playbackButton.on('pointerover', e => e.target.alpha = 0.7);
	playbackButton.on('pointerout', e => e.currentTarget.alpha = 1.0); 
	menuScene.addChild(playbackButton);

	let instructionsButton = new PIXI.Text("How to Play");
	instructionsButton.style = buttonStyle;
	instructionsButton.x = 495;
	instructionsButton.y = 490;
	instructionsButton.interactive = true;
	instructionsButton.buttonMode = true;
	instructionsButton.on("pointerup", showInstructions);
	instructionsButton.on('pointerover', e => e.target.alpha = 0.7);
	instructionsButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
	menuScene.addChild(instructionsButton);

	let recordButton = new PIXI.Text("Start Recording");
	recordButton.style = buttonStyle;
	recordButton.x = 455;
	recordButton.y = 280;
	recordButton.interactive = true;
	recordButton.buttonMode = true;
	recordButton.on("pointerup", startRecord);
	recordButton.on('pointerover', e => e.target.alpha = 0.7);
	recordButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
	menuScene.addChild(recordButton);

	// Instructions
	let instructions = new PIXI.Text("Get started by clicking Start Recording. From here, you can play \nthe virtual piano using your keyboard, and every note you play will be \nrecorded. When you're done, click stop recording which will bring you \nback to the main menu, where you can listen back to your recording or \ntest your skills in the game mode. In game mode, try to match your key \npresses to the notes that appear on screen.");
	instructions.style = new PIXI.TextStyle({
		align: "center",
		fill: 0xFFFFFF,
		fontSize: 34,
		fontFamily: "Futura",
		fontStyle: "italic",
	});
	instructions.x = 230;
	instructions.y = 220;
	instructionsScene.addChild(instructions);

	// Game
	scoreLabel = new PIXI.Text("");
	scoreLabel.style = textStyle;
	scoreLabel.x = 5;
	scoreLabel.y = 5;

	// Game Over
	finalScoreLabel = new PIXI.Text();
	finalScoreLabel.style = buttonStyle;
	finalScoreLabel.x = 515;
	finalScoreLabel.y = 150;
	gameOverScene.addChild(finalScoreLabel);

	backToMenuButton = new PIXI.Text("Click to stop recording");
	backToMenuButton.style = buttonStyle;
	backToMenuButton.x = 80;
	backToMenuButton.y = 55;
	backToMenuButton.interactive = true;
	backToMenuButton.buttonMode = true;
	backToMenuButton.on("pointerup", showMenu);
	backToMenuButton.on('pointerover', e => e.target.alpha = 0.7);
	backToMenuButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
}

// Change to the song selection scene
function showSongs() {
	songSelectionScene.addChild(startLabel1);
	songSelectionScene.addChild(backToMenuButton);
	backToMenuButton.x = 455;
	backToMenuButton.y = 500;
	paused = true;
	startScene.visible = false;
	gameOverScene.visible = false;
	gameScene.visible = false;
	menuScene.visible = false;
	instructionsScene.visible = false;
	recordScene.visible = false;
	songSelectionScene.visible = true;
}

// Change to the instructions scene
function showInstructions() {
	backToMenuButton.x = 80;
	backToMenuButton.y = 55;
	backToMenuButton.text = "Return to Menu"
	menuBG.visible = false;
	instructionsBG.visible = true;
	backToMenuButton.style.fill = "0xFFFFFF";
	paused = true;
	instructionsScene.addChild(backToMenuButton);
	startScene.visible = false;
	gameOverScene.visible = false;
	gameScene.visible = false;
	menuScene.visible = false;
	instructionsScene.visible = true;
	recordScene.visible = false;
	songSelectionScene.visible = false;
}

// Change to the game scene and start the game loop
function startGameLoop(playbackMode) {
	time = 0;
	paused = false;
	recording = false;
	startScene.visible = false;
	gameOverScene.visible = false;
	gameScene.visible = true;
	menuScene.visible = false;
	instructionsScene.visible = false;
	recordScene.visible = false;
	songSelectionScene.visible = false;
	piano = new Piano(0, 0);
	gameScene.addChild(piano);
	if (!playbackMode) gameScene.addChild(scoreLabel);
	a = keyboard("a"),
		s = keyboard("s"),
		d = keyboard("d"),
		f = keyboard("f"),
		g = keyboard("g"),
		h = keyboard("h"),
		j = keyboard("j"),
		k = keyboard("k"),
		l = keyboard("l"),
		semiColon = keyboard(";"),
		w = keyboard("w"),
		e = keyboard("e"),
		t = keyboard("t"),
		y = keyboard("y"),
		u = keyboard("u"),
		o = keyboard("o"),
		p = keyboard("p");	
	if (!playbackMode) playKeys();
}

// Change to the Record mode
function startRecord() {
	recordedNotes = [];
	backToMenuButton.x = 80;
	backToMenuButton.y = 55;
	backToMenuButton.text = "Click to stop recording"
	backToMenuButton.style.fill = "0xFFFFFF";
	paused = false;
	recording = true;
	startScene.visible = false;
	gameOverScene.visible = false;
	gameScene.visible = false;
	menuScene.visible = false;
	instructionsScene.visible = false;
	recordScene.visible = true;
	songSelectionScene.visible = false;
	piano = new Piano(0, 0);
	recordScene.addChild(piano);
	recordScene.addChild(backToMenuButton);
	a = keyboard("a"),
		s = keyboard("s"),
		d = keyboard("d"),
		f = keyboard("f"),
		g = keyboard("g"),
		h = keyboard("h"),
		j = keyboard("j"),
		k = keyboard("k"),
		l = keyboard("l"),
		semiColon = keyboard(";"),
		w = keyboard("w"),
		e = keyboard("e"),
		t = keyboard("t"),
		y = keyboard("y"),
		u = keyboard("u"),
		o = keyboard("o"),
		p = keyboard("p");

	playKeys();
	keyA = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyA.x = 372;
	keyA.y = 547;
	keyA.visible = false;
	app.stage.addChild(keyA);

	keyS = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyS.x = 426;
	keyS.y = 547;
	keyS.visible = false;
	app.stage.addChild(keyS);

	keyD = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyD.x = 480;
	keyD.y = 547;
	keyD.visible = false;
	app.stage.addChild(keyD);

	keyF = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyF.x = 532;
	keyF.y = 547;
	keyF.visible = false;
	app.stage.addChild(keyF);

	keyG = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyG.x = 585;
	keyG.y = 547;
	keyG.visible = false;
	app.stage.addChild(keyG);

	keyH = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyH.x = 639;
	keyH.y = 547;
	keyH.visible = false;
	app.stage.addChild(keyH);

	keyJ = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyJ.x = 692;
	keyJ.y = 547;
	keyJ.visible = false;
	app.stage.addChild(keyJ);

	keyK = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyK.x = 746;
	keyK.y = 547;
	keyK.visible = false;
	app.stage.addChild(keyK);

	keyL = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keyL.x = 798;
	keyL.y = 547;
	keyL.visible = false;
	app.stage.addChild(keyL);

	keySemi = new PIXI.Sprite.fromImage('images/WhiteKeyPress.png');
	keySemi.x = 852;
	keySemi.y = 547;
	keySemi.visible = false;
	app.stage.addChild(keySemi);

	keyW = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyW.x = 408;
	keyW.y = 547;
	keyW.visible = false;
	app.stage.addChild(keyW);

	keyE = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyE.x = 461;
	keyE.y = 547;
	keyE.visible = false;
	app.stage.addChild(keyE);

	keyT = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyT.x = 560;
	keyT.y = 547;
	keyT.visible = false;
	app.stage.addChild(keyT);

	keyY = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyY.x = 621;
	keyY.y = 547;
	keyY.visible = false;
	app.stage.addChild(keyY);

	keyU = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyU.x = 683;
	keyU.y = 547;
	keyU.visible = false;
	app.stage.addChild(keyU);

	keyO = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyO.x = 781;
	keyO.y = 547;
	keyO.visible = false;
	app.stage.addChild(keyO);

	keyP = new PIXI.Sprite.fromImage('images/BlackKeyPress.png');
	keyP.x = 835;
	keyP.y = 547;
	keyP.visible = false;
	app.stage.addChild(keyP);
}

// Change to the main menu scene
function showMenu() {
	menuBG.visible = true;
	instructionsBG.visible = false;
	backToMenuButton.style.fill = "0x000000";
	if (recordedNotes.length >= 1) {
		playbackButton.interactive = true;
		playbackButton.alpha = 1.0;
		gameButton.interactive = true;
		gameButton.alpha = 1.0;
	}
	else {
		playbackButton.interactive = false;
		playbackButton.alpha = 0.5;
		gameButton.interactive = false;
		gameButton.alpha = 0.5;
	}
	reset();
	menuScene.addChild(startLabel1);
	paused = true;
	startScene.visible = false;
	gameOverScene.visible = false;
	gameScene.visible = false;
	menuScene.visible = true;
	instructionsScene.visible = false;
	recordScene.visible = false;
	songSelectionScene.visible = false;
}

// Reset all values and stop listening for keyboard input so that the game can be replayed
function reset(){
	if (a != undefined){
		a.unsubscribe();
		w.unsubscribe();
		s.unsubscribe();
		e.unsubscribe();
		d.unsubscribe();
		f.unsubscribe();
		t.unsubscribe();
		g.unsubscribe();
		y.unsubscribe();
		h.unsubscribe();
		u.unsubscribe();
		j.unsubscribe();
		k.unsubscribe();
		o.unsubscribe();
		l.unsubscribe();
		p.unsubscribe();
		semiColon.unsubscribe();
		}
	keyA.visible = false;
	keyW.visible = false;
	keyS.visible = false;
	keyE.visible = false;
	keyD.visible = false;
	keyF.visible = false;
	keyT.visible = false;
	keyG.visible = false;
	keyY.visible = false;
	keyH.visible = false;
	keyU.visible = false;
	keyJ.visible = false;
	keyK.visible = false;
	keyO.visible = false;
	keyL.visible = false;
	keyP.visible = false;
	keySemi.visible = false;
	piano = null;
	time = 0;
	score = 0;
	notes = [];
}

// Show the game over scene
function gameOver() {
	backToMenuButton.text = "Return to Menu";
	backToMenuButton.x = 460;
	backToMenuButton.y = 250;
	gameOverScene.addChild(backToMenuButton);
	if(playbackMode) finalScoreLabel.visible = false;
	else finalScoreLabel.visible = true;
	finalScoreLabel.text = "Score: " + Math.round(score/notes.length * 100) + "%";
	paused = true;
	reset();
	startScene.visible = false;
	gameOverScene.visible = true;
	gameScene.visible = false;
	menuScene.visible = false;
	instructionsScene.visible = false;
	recordScene.visible = false;
	songSelectionScene.visible = false;
}

// Play virtual piano using computer keyboard input
function playKeys() {
	a.press = () => {
		keyA.visible = true;
		checkNote("C1");
		c1.play();
		if (recording) recordedNotes.unshift({note: "C1", time: time, sound: c1});
	}
	a.release = () => {
		keyA.visible = false;
	}
	s.press = () => {
		keyS.visible = true;
		checkNote("D1");
		d1.play();
		if (recording) recordedNotes.unshift({note: "D1", time: time, sound: d1});
	}
	s.release = () => {
		keyS.visible = false;
	}
	d.press = () => {
		keyD.visible = true;
		checkNote("E1");
		e1.play();
		if (recording) recordedNotes.unshift({note: "E1", time: time, sound: e1});
	}
	d.release = () => {
		keyD.visible = false;
	}
	f.press = () => {
		keyF.visible = true;
		checkNote("F1");
		f1.play();
		if (recording) recordedNotes.unshift({note: "F1", time: time, sound: f1});
	}
	f.release = () => {
		keyF.visible = false;
	}
	g.press = () => {
		keyG.visible = true;
		checkNote("G1");
		g1.play();
		if (recording) recordedNotes.unshift({note: "G1", time: time, sound: g1});
	}
	g.release = () => {
		keyG.visible = false;
	}
	h.press = () => {
		keyH.visible = true;
		checkNote("A1");
		a1.play();
		if (recording) recordedNotes.unshift({note: "A1", time: time, sound: a1});
	}
	h.release = () => {
		keyH.visible = false;
	}
	j.press = () => {
		keyJ.visible = true;
		checkNote("B1");
		b1.play();
		if (recording) recordedNotes.unshift({note: "B1", time: time, sound: b1});
	}
	j.release = () => {
		keyJ.visible = false;
	}
	k.press = () => {
		keyK.visible = true;
		checkNote("C2");
		c2.play();
		if (recording) recordedNotes.unshift({note: "C2", time: time, sound: c2});
	}
	k.release = () => {
		keyK.visible = false;
	}
	l.press = () => {
		keyL.visible = true;
		checkNote("D2");
		d2.play();
		if (recording) recordedNotes.unshift({note: "D2", time: time, sound: d2});
	}
	l.release = () => {
		keyL.visible = false;
	}
	semiColon.press = () => {
		keySemi.visible = true;
		checkNote("E2");
		e2.play();
		if (recording) recordedNotes.unshift({note: "E2", time: time, sound: e2});
	}
	semiColon.release = () => {
		keySemi.visible = false;
	}
	w.press = () => {
		keyW.visible = true;
		checkNote("Db1");
		db1.play();
		if (recording) recordedNotes.unshift({note: "Db1", time: time, sound: db1});
	}
	w.release = () => {
		keyW.visible = false;
	}
	e.press = () => {
		keyE.visible = true;
		checkNote("Eb1");
		eb1.play();
		if (recording) recordedNotes.unshift({note: "Eb1", time: time, sound: eb1});
	}
	e.release = () => {
		keyE.visible = false;
	}
	t.press = () => {
		keyT.visible = true;
		checkNote("Gb1");
		gb1.play();
		if (recording) recordedNotes.unshift({note: "Gb1", time: time, sound: gb1});
	}
	t.release = () => {
		keyT.visible = false;
	}
	y.press = () => {
		keyY.visible = true;
		checkNote("Ab1");
		ab1.play();
		if (recording) recordedNotes.unshift({note: "Ab1", time: time, sound: ab1});
	}
	y.release = () => {
		keyY.visible = false;
	}
	u.press = () => {
		keyU.visible = true;
		checkNote("Bb1");
		bb1.play();
		if (recording) recordedNotes.unshift({note: "Bb1", time: time, sound: bb1});
	}
	u.release = () => {
		keyU.visible = false;
	}
	o.press = () => {
		keyO.visible = true;
		checkNote("Db1");
		db2.play();
		if (recording) recordedNotes.unshift({note: "Db1", time: time, sound: db1});
	}
	o.release = () => {
		keyO.visible = false;
	}
	p.press = () => {
		checkNote("Eb2");
		keyP.visible = true;
		eb2.play();
		if (recording) recordedNotes.unshift({note: "Eb2", time: time, sound: eb2});
	}
	p.release = () => {
		keyP.visible = false;
	}
}

// Update game at 60fps if not paused
function gameLoop() {
	if (paused) return;

	// #1 - Calculate "delta time"
	let dt = 1 / app.ticker.FPS;
	if (dt > 1 / 12) dt = 1 / 12;
	time++;
	for (let n of notes) {
		n.move(dt);
	}
	if (gameScene.visible == true) {
		scoreLabel.text = "Score: " + Math.round(score/notes.length * 100) + "%";
		if (time >= notes[notes.length - 1].startTime + 250) {
			gameOver();
		}
	}
}

// Add points if the player hits the right note at the right time
function checkNote(noteName) {
	if (gameScene.visible == false) return;
	let notesToCheck = notes.filter(n => n.noteName == noteName);
	for (let n of notesToCheck) {
		if (n.y >= 420 && n.y <= 525) {
			score++;
			n.visible = false;
		}
	}
}

// Stores and retrieves the different songs
function startGame(songName) {
	playbackMode = false;
	startGameLoop(playbackMode);
	for (let n of recordedNotes) {
		notes.unshift(new Note(n.note, n.time, n.sound, false));
	}
	for (let n of notes) {
		gameScene.addChild(n);
	}
}

// Stores and retrieves the different songs
function startPlayback(songName) {
	playbackMode = true;
	startGameLoop(playbackMode);
	for (let n of recordedNotes) {
		notes.unshift(new Note(n.note, n.time, n.sound, true));
	}
	for (let n of notes) {
		gameScene.addChild(n);
	}
}

// Source: https://github.com/kittykatattack/learningPixi#keyboard
function keyboard(value) {
	let key = {};
	key.value = value;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	//The `downHandler`
	key.downHandler = event => {
		if (event.key === key.value) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
			event.preventDefault();
		}
	};

	//The `upHandler`
	key.upHandler = event => {
		if (event.key === key.value) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
			event.preventDefault();
		}
	};

	//Attach event listeners
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);

	window.addEventListener(
		"keydown", downListener, false
	);
	window.addEventListener(
		"keyup", upListener, false
	);

	// Detach event listeners
	key.unsubscribe = () => {
		window.removeEventListener("keydown", downListener);
		window.removeEventListener("keyup", upListener);
	};

	return key;
}

// Source: https://github.com/kittykatattack/scaleToWindow/blob/master/scaleToWindow.js
function scaleToWindow(canvas, backgroundColor) {
	let scaleX, scaleY, scale, center;
  
	//1. Scale the canvas to the correct size
	//Figure out the scale amount on each axis
	scaleX = window.innerWidth / canvas.offsetWidth;
	scaleY = window.innerHeight / canvas.offsetHeight;
  
	//Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
	scale = Math.min(scaleX, scaleY);
	canvas.style.transformOrigin = "0 0";
	canvas.style.transform = "scale(" + scale + ")";
  
	//2. Center the canvas.
	//Decide whether to center the canvas vertically or horizontally.
	//Wide canvases should be centered vertically, and 
	//square or tall canvases should be centered horizontally
	if (canvas.offsetWidth > canvas.offsetHeight) {
	  if (canvas.offsetWidth * scale < window.innerWidth) {
		center = "horizontally";
	  } else {
		center = "vertically";
	  }
	} else {
	  if (canvas.offsetHeight * scale < window.innerHeight) {
		center = "vertically";
	  } else {
		center = "horizontally";
	  }
	}
  
	//Center horizontally (for square or tall canvases)
	let margin;
	if (center === "horizontally") {
	  margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
	  canvas.style.marginTop = 0 + "px";
	  canvas.style.marginBottom = 0 + "px";
	  canvas.style.marginLeft = margin + "px";
	  canvas.style.marginRight = margin + "px";
	}
  
	//Center vertically (for wide canvases) 
	if (center === "vertically") {
	  margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
	  canvas.style.marginTop = margin + "px";
	  canvas.style.marginBottom = margin + "px";
	  canvas.style.marginLeft = 0 + "px";
	  canvas.style.marginRight = 0 + "px";
	}
  
	//3. Remove any padding from the canvas  and body and set the canvas
	//display style to "block"
	canvas.style.paddingLeft = 0 + "px";
	canvas.style.paddingRight = 0 + "px";
	canvas.style.paddingTop = 0 + "px";
	canvas.style.paddingBottom = 0 + "px";
	canvas.style.display = "block";
  
	//4. Set the color of the HTML body background
	document.body.style.backgroundColor = backgroundColor;
  
	//Fix some quirkiness in scaling for Safari
	let ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("safari") != -1) {
	  if (ua.indexOf("chrome") > -1) {
		// Chrome
	  } else {
		// Safari
		//canvas.style.maxHeight = "100%";
		//canvas.style.minHeight = "100%";
	  }
	}
  
	//5. Return the `scale` value. This is important, because you'll nee this value 
	//for correct hit testing between the pointer and sprites
	return scale;
  }