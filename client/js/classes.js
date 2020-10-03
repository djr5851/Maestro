class Piano extends PIXI.Sprite {
	constructor(x = 0, y = 0){
		super(PIXI.loader.resources["images/game.png"].texture);
		this.x = x;
		this.y = y;
	}
}

class Note extends PIXI.Sprite {
	constructor(noteName, startTime = 0, noteSound, playback){
		if (noteName == "Db1"){
			super(PIXI.loader.resources["images/BlackNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 367;
			this.y = -138;
		}
		else if (noteName == "Eb1"){
			super(PIXI.loader.resources["images/BlackNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 419;
			this.y = -138;
		}
		else if (noteName == "Gb1"){
			super(PIXI.loader.resources["images/BlackNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 518;
			this.y = -138;
		}
		else if (noteName == "Ab1"){
			super(PIXI.loader.resources["images/BlackNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 578;
			this.y = -138;
		}
		else if (noteName == "Bb1"){
			super(PIXI.loader.resources["images/BlackNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 641;
			this.y = -138;
		}
		else if (noteName == "Db2"){
			super(PIXI.loader.resources["images/BlackNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 739;
			this.y = -138;
		}
		else if (noteName == "Eb2"){
			super(PIXI.loader.resources["images/BlackNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 793;
			this.y = -138;
		}
		else if (noteName == "C1"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 334;
			this.y = -138;
		}
		else if (noteName == "D1"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 387;
			this.y = -138;
		}
		else if (noteName == "E1"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 441;
			this.y = -138;
		}
		else if (noteName == "F1"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 495;
			this.y = -138;
		}
		else if (noteName == "G1"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 548;
			this.y = -138;
		}
		else if (noteName == "A1"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 601;
			this.y = -138;
		}
		else if (noteName == "B1"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 655;
			this.y = -138;
		}
		else if (noteName == "C2"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 708;
			this.y = -138;
		}
		else if (noteName == "D2"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 761;
			this.y = -138;
		}
		else if (noteName == "E2"){
			super(PIXI.loader.resources["images/WhiteNote.png"].texture);
			this.noteName = noteName;
			this.startTime = startTime;
			this.noteSound = noteSound;
			this.playback = playback;
			this.x = 814;
			this.y = -138;
		}
		else{
			super();
		}
	}
	move(dt = 1 / 60) {
		if (time >= this.startTime){
			this.y += 500 * dt;
		}
		if (this.playback && this.y >= 480 && this.y <= 525) {
			this.noteSound.play();
			this.visible = false;
			this.playback = false;
		}
	}

}
