import { kaboom, easings, tween, tweentypes } from "../deps.js";

// initialize context
kaboom({
    width: 700,
    height: 400,
	background: [ 0, 0, 0 ],
	crisp: true,
	touchToMouse: true,
	canvas: document.querySelector("#kaboom")
});

load(new Promise((resolve, reject) => {
	loadFont("unscii", "fonts/unscii_8x8.png", 8, 8, {chars: " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"});
	// Music
	loadSound("tutorial", "sounds/Getting it Done.mp3"); //135
	loadSound("faith", "sounds/The Friendly Faith Plate.mp3"); //120
	loadSound("sonic", "sounds/SonicInMidSim.wav"); //139
	loadSound("green", "sounds/GreenHill.wav"); //139
	loadSound("gameover", "sounds/gameover.mp3");
	// 
	
	// Sounds
	loadSound("score", "sounds/score.mp3");
	loadSound("metro", "sounds/metro.wav");
	loadSound("explode", "sounds/explode.mp3");
	// 

	//Menus
	loadSprite("bgCake", "sprites/bgCake.png");
	loadSprite("jellybeanTitle", "sprites/jellybeanTitle.png");
	loadSprite("logo", "sprites/logo.png");
	loadSprite("jellybeanFail", "sprites/jellybeanFail.png");
	loadSprite("keyA", "sprites/keyA.png");
	loadSprite("keySpace", "sprites/keySpace.png");
	loadSprite("keyClick", "sprites/keyClick.png");
	// 
	
	// Main Game
	loadSprite("noteClick", "sprites/noteClick.png", {
	    sliceX: 4,
	    sliceY: 2,
	    anims: {
	        idle: {
	            from: 7,
	            to: 7,
							speed: 30
	        },
	        click: {
	            from: 0,
	            to: 7,
							speed: 60
	        }
	    },
	})
	// 
	
	// Character
	loadSound("hitsoundFaithPlate", "sounds/hitsoundFaithPlate.mp3");
	loadSound("hitsoundJellyBean", "sounds/hitsoundJellyBean.wav");
	loadSound("hitsoundCarterRedacted", "sounds/hitsoundJellyBean.wav");
	loadSound("hitsoundMarc", "sounds/hitsoundJellyBean.wav");
	loadSound("hitsoundRedVelvety", "sounds/hitsoundRedVelvety.wav");
	loadSound("hitsoundSonicAndTails", "sounds/hitsoundJellyBean.wav");
	loadSound("hitsoundMarkyMark", "sounds/burp.mp3");
	loadSprite("JellyBeanPre", "sprites/previews/JellyBeanPre.png");
	loadSprite("RedVelvetyPre", "sprites/previews/RedVelvetyPre.png");
	loadSprite("MarkyMarkPre", "sprites/previews/MarkyMarkPre.png");
	loadSprite("CarterRedactedPre", "sprites/previews/CarterRedactedPre.png");
	loadSprite("MarcPre", "sprites/previews/MarcPre.png");
	loadSprite("FaithPlatePre", "sprites/previews/FaithPlatePre.png");
	loadSprite("SonicAndTailsPre", "sprites/previews/SonicAndTailsPre.png");
	// 
	
	// Cake/tutorial
	loadSprite("tutorialBG0", "sprites/bgCake.png");
	loadSprite("tutorialFG0", "sprites/fgCake0.png");
	loadSprite("tutorialFG1", "sprites/fgCake1.png");
	loadSprite("Marctutorial", "sprites/marcCake.png", {
	    sliceX: 3,
	    sliceY: 3,
	    anims: {
	        idle: {
	            from: 0,
	            to: 3,
							speed: 20
	        },
	        talk: {
	            from: 4,
	            to: 5,
							speed: 20
	        },
	        miss: {
	            from: 6,
	            to: 8,
							speed: 10
	        },
	    },
	})
	loadSprite("CarterRedactedtutorial", "sprites/carterredactedCake.png", {
	    sliceX: 3,
	    sliceY: 3,
	    anims: {
	        idle: {
	            from: 0,
	            to: 3,
							speed: 20
	        },
	        talk: {
	            from: 4,
	            to: 5,
							speed: 20
	        },
	        miss: {
	            from: 6,
	            to: 8,
							speed: 10
	        },
	    },
	})
	loadSprite("MarkyMarktutorial", "sprites/markymarkCake.png", {
	    sliceX: 3,
	    sliceY: 4,
	    anims: {
	        idle: {
	            from: 0,
	            to: 3,
							speed: 20
	        },
	        talk: {
	            from: 4,
	            to: 7,
							speed: 40
	        },
	        miss: {
	            from: 8,
	            to: 10,
							speed: 10
	        },
	    },
	})
	loadSprite("RedVelvetytutorial", "sprites/redvelvetyCake.png", {
	    sliceX: 3,
	    sliceY: 4,
	    anims: {
	        idle: {
	            from: 0,
	            to: 3,
							speed: 20
	        },
	        talk: {
	            from: 4,
	            to: 5,
							speed: 20
	        },
	        dox: {
	            from: 6,
	            to: 7,
							speed: 20
	        },
	        miss: {
	            from: 8,
	            to: 10,
							speed: 10
	        },
	    },
	})
	loadSprite("JellyBeantutorial", "sprites/jellybeanCake.png", {
	    sliceX: 3,
	    sliceY: 4,
	    anims: {
	        idle: {
	            from: 0,
	            to: 3,
							speed: 20
	        },
	        talk: {
	            from: 4,
 		           to: 5,
							speed: 20
	        },
	        dox: {
            	from: 6,
          	  to: 7,
							speed: 20
      	  },
    	    miss: {
  	          from: 8,
	            to: 10,
							speed: 10
 	 	      },
	    },
	})
	// 

	// Faith/faith
	loadSprite("faithBG0", "sprites/bgFaith.png");
	loadSprite("faithFG0", "sprites/fgFaith.png");
	loadSprite("FaithPlatefaith", "sprites/faithplateFaith.png", {
	    sliceX: 3,
	    sliceY: 3,
	    anims: {
	        idle: {
	            from: 0,
	            to: 3,
							speed: 20
	        },
	        talk: {
	            from: 4,
	            to: 5,
							speed: 20
	        },
	        miss: {
	            from: 6,
	            to: 8,
							speed: 10
	        },
	    },
	})
	// 

	// Sonic In Mid Sim/sonic
	loadSprite("sonicBG0", "sprites/SonicBG.png", {
	    sliceX: 3,
	    sliceY: 3,
	    anims: {
	        idle: {
	            from: 0,
	            to: 6,
							speed: 10,
							loop: true
	        }
	    },
	});
	loadSprite("sonicFG0", "sprites/SonicFG.png", {
	    sliceX: 3,
	    sliceY: 3,
	    anims: {
	        idle: {
	            from: 0,
	            to: 0,
							speed: 20
	        }
	    },
	});
	loadSprite("SonicAndTailssonic0", "sprites/SonicMidSim.png", {
	    sliceX: 3,
	    sliceY: 4,
	    anims: {
	        idle: {
	            from: 0,
	            to: 6,
							speed: 20
	        },
	        talk: {
	            from: 7,
	            to: 8,
							speed: 20
	        },
	        miss: {
	            from: 9,
	            to: 11,
							speed: 10
	        },
	    },
	});
	loadSprite("SonicAndTailssonic1", "sprites/TailsMidSim.png", {
	    sliceX: 3,
	    sliceY: 9,
	    anims: {
	        idle: {
	            from: 0,
	            to: 15,
							speed: 20
	        },
	        talk: {
	            from: 16,
	            to: 23,
							speed: 20
	        },
	        miss: {
	            from: 24,
	            to: 26,
							speed: 10
	        },
	    },
	});
	loadSprite("greenBG0", "sprites/SonicBG.png", {
	    sliceX: 3,
	    sliceY: 3,
	    anims: {
	        idle: {
	            from: 0,
	            to: 6,
							speed: 10,
							loop: true
	        }
	    },
	});
	loadSprite("greenFG0", "sprites/SonicFG.png", {
	    sliceX: 3,
	    sliceY: 3,
	    anims: {
	        idle: {
	            from: 0,
	            to: 0,
							speed: 20
	        }
	    },
	});
	loadSprite("SonicAndTailsgreen0", "sprites/SonicMidSim.png", {
	    sliceX: 3,
	    sliceY: 4,
	    anims: {
	        idle: {
	            from: 0,
	            to: 6,
							speed: 20
	        },
	        talk: {
	            from: 7,
	            to: 8,
							speed: 20
	        },
	        miss: {
	            from: 9,
	            to: 11,
							speed: 10
	        },
	    },
	});
	loadSprite("SonicAndTailsgreen1", "sprites/TailsMidSim.png", {
	    sliceX: 3,
	    sliceY: 9,
	    anims: {
	        idle: {
	            from: 0,
	            to: 15,
							speed: 20
	        },
	        talk: {
	            from: 16,
	            to: 23,
							speed: 20
	        },
	        miss: {
	            from: 24,
	            to: 26,
							speed: 10
	        },
	    },
	});
	
	resolve("All assets loaded.");
}))

var charts = {
	"tutorial": [
		5, // How much seconds it takes to get from Right Stage to the hitmarker
		135, // Song BPM
		"................................................................................................................................J...........J.J...........J.J.J.............J.J.................J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J.............J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J.............J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J...................................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.....J.............................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J...................................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.....J.J.....J.J.....J...........J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.................................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.....J.J.....J.J.....J.J.....J...................................................................................................................................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................................................................................................................................................................................................................................................",
		1 //Texture Scale (too lazy to upsize sprites sometimes)
	],
	"faith": [
		2, 
		120, 
		"................................................................................................................................J...J...J...JJJJJ...J...J...J...J.J.J.J.J.J.J.J.JJJJJJJJJ.J.J.JJJ.J.J.J.J.J.JJJJJ.JJJ.J.J.J.J.J.J.JJJ.JJJ.J.J.J.JJJJJJJJJJJJJJJJJ.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.JJJ.JJJ.JJJ.JJJ.JJJ.J.J.J.J.JJJ.J.JJJJJJJJJJJJJ.J.J.J.JJJJJ.J.J.J.J.J.J.J.JJJJJ.J.J.J.J.JJ.J..J.JJJ.JJJ.J.J.JJJ.JJJ.J.J.J.JJJJJ.J.J.JJJ.JJJJJJJJJJJJJJJJJ.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.JJJJJJJJJJJJJ.J.J.JJJ.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.J.J.J.J.JJJ.JJJJ.JJ.J.J.J.JJ..J...J.J.J.J.J.J.JJJJJJJJJJJJJ.J.J.J.J.J.J.J.J.J.JJJJJ.J.J.J.J.J.J.J.J...J...J.J.J.J.JJJJJJJJJ.J.J.J.J.J.J.JJJ.J.JJJJJJJJJJJJJJJ.J.J.JJJ.J.JJJ.JJJJJJJJJJJJJJJJJ.J.J.JJJ.J.JJJ.JJJJJJJJJJJJJJJJJ.J.J.JJJ.J.JJJ.JJJJJJJJJJJJJJJJJ.J.J.JJJJ.JJJJJJJJJJJJJJJ.JJJJJJJJJJJJJ..J.JJJ.JJJJJJJJJJ....J.J.JJJJJJJ.J.JJJ.JJJJJJJJJJJJJJJJJJJJJ.J.J.J.JJJ.JJJJJJJJJ....JJJJJJJJJ....JJJJJJJ.JJJJJJJ..JJJ..J.JJJJJJJJJJJJJJJ.JJJJJJJ..JJJ....JJJJJJJJJJJJJJJ.JJJJJJJ..JJJ....JJJJJJJJJJJJJJJ.JJJJJJJJ.JJJ..J.JJJJJJJ.J.JJJ.JJJJJJJJJJJJJ.JJJ.J...JJJ.J.JJJ.JJJJJJJJJJJJJ.JJJ.JJJ.JJJ.J.JJJJJJJJJJJJJJJJJJJJJ.JJJ.JJJ.J.JJJ.JJJJJJJJJJJJJJJJJ.JJJ.JJJ.J.JJJ.JJJJJJJJJJJJJJJ...JJJJ........J...JJJJ........J...JJJJ........J...JJJJ........J.J.JJJJ........JJJ.JJJ.JJJ.J.JJJ.J.JJJJ........JJJ.JJJ.JJJ.JJJJJ.J.JJJJ........JJJ.JJJ.JJJ.J.JJJ.J.JJJJ........JJJ.JJJ.JJJ.JJJJJ.J.JJJJJ.......JJJ.J.............",
		4
	],
	"sonic": [
		2, 
		139, 
		"..................................................J.J.J.J.J.JJ....J.J.J.J..J........JJJJ..J.JJ.J..................T.T.T.T.T.TT....T...T.T..T........TTT.T.T.TT.T..................J.J.J.J.J.J.J.J.J...J...........J.J.J.J.J.JJ..J.................T.T.T.T.T.T.T.T.T...T...........T.T.T.T.T.TT..T...............J.....J.....J.J.J.JJ....T.TT........J.J.J.J.J.J.J.J...J.........T.....T.....T.T.T.TT....J.JJ....DD.D.............................................................",
		1
	],
	"green": [
		2, 
		150, 
		"................J.....J.....J.....J.....J...J...J.....J.....J...................J.....J.....J...J.....J.....J...J.....J.................................T.T...T.T...T.T...T...........T.T.T...T.T...T.T...T.............T.T...T.T...T.T...T...........T.T.T...T.T...T.T...T.....T.......J.J...J.J...D.J.T.J.T...T.....J.J.J...J.J...D.J.T.J.T...T.......J.J...J.J...D.J.T.J.T...T.....J.J.J...J.J...D.J.T.J.D...D.....J.....J.....J.....J.T.D.T.J.....J.....J.....J.....J.T.D.T.J.....J.....J.....J.....J.T.D.T.J.T.T.T...T.T.T...T.T.T.T.T.T.T.........J.J...J.J...J.J...J...........J.J.J...J.J...J.J...J.............J.J...J.J...J.J...J...........J.J.J...J.J...J.J...J.....J.......T.T...T.T...D.T.J.T.J...J.....T.T.T...T.T...D.T.J.T.J...J.......T.T...T.T...D.T.J.T.J...J.....T.T.T...T.T...D.T.J.T.J.T.D.....T.....T.....T.....T.J.D.J.T.....T.....T.....T.....T.J.D.J.T.....T.....T.....T.....T.J.D.J.T.J.J.J...J.J.J...J.J.J.J.J.J.J................................................................................................................................................................",
		1
	]
};
var songIdx = 0;
var idx = 0;

scene("Game", (arr) => {
	var song = arr[0]; //Also Chart access
	var char = arr[1];
	var hitsound = "hitsound" + arr[1];
	var chart = charts[song];
	var crochet = ((60 / chart[1]) * 1000);
	var board = width() - strumLine;
	var curBeat;
	var prevBeat;
	var prevStep;
	var curStep;
	var autoplay = false;
	var debugMode = false;
	var score = 0;
	var combo = 0;
	var health = 1;
	var font = "apl386o";
	if (char == "MarkyMark") {
		font = "unscii";
	}
	var strumLine = width() / 2;
	const music = play(song, {
	    volume: 1,
	    loop: false
	});
	const underlay = play("score", {
	    volume: 1,
	    loop: false
	});
	music.pause()
	wait(chart[0], () => {
		underlay.pause();
		music.play();
		underlay.play(music.time() + chart[0]);
	});
	layers([
    "bg",
		"JELLYBEAN",
    "SKELETONS",
		"fg",
    "ui0",
		"ui1"
	], "ui0");
	var player;
	var player2;
	if (song == "sonic" || song == "green") {
		player = add([
	    sprite(char + song + "0"),
			layer("JELLYBEAN"),
			"dances",
			pos(20, 108),
			scale(chart[3])
		])
		player2 = add([
	    sprite(char + song + "1"),
			layer("JELLYBEAN"),
			"dances",
			pos(224, 20),
			scale(chart[3])
		])
	} else {
		player = add([
	    sprite(char + song),
			layer("JELLYBEAN"),
			"dances",
			(song == "faith" ? pos(0, 0) : pos((width() / 2) - 162, height() - 400)),
			scale(chart[3])
		])
	}
	const bg = add([
		sprite(song + "BG0"),
		layer("bg"),
		scale(chart[3])
	])
	if(song == "sonic" || song == "green") bg.play("idle");
	const fg = add([
		sprite(song + "FG0"),
		(song == "faith" ? layer("bg") : layer("fg")),
		scale(chart[3])
	])
	if (song == "tutorial") {
	const fg = add([
		sprite(song + "FG1"),
		layer("fg"),
		scale(chart[3])
	]);
	}
	const noteClick = add([
		sprite("noteClick"),
		scale(0.25),
		pos(strumLine, 15)
	])
	onUpdate(() => {
		if (health > 1) health = 1;
		if (health < 0) {health = 0;go("Lose", score);music.stop();}
		if (music.time() > music.duration() && health >= 0) {go("Title");}
		strumLine = lerp(18, width() / 2, health);
		noteClick.pos.x = strumLine - 5;
		curBeat = Math.floor(((music.time() * 1000) / crochet) * 10) / 10;
		curStep = Math.floor((music.time() * 1000) / (crochet / 4));
		prevBeat = Math.floor(((underlay.time() * 1000) / crochet));
		prevStep = Math.floor((underlay.time()  * 1000) / (crochet / 4));
		if (!get("bar" + prevBeat).length) {
			var bar = add([
				prevBeat % 4 == 0 ? rect(3, 50) : rect(2, 50),
				pos(width(), 20),
				color(255, 255, 255),
				("bar" + prevBeat),
				{
					mainBar: prevBeat % 4 == 0,
					created: underlay.time()
				},
				"bar"
			]);
		}
		if (!get("note" + prevStep).length) {
			makeNote(chart[2][Math.floor(prevStep)]);
		}
		if (!underlay.isPaused()) {
			every("bar", (j) => {
				j.pos.x = lerp(width(), strumLine, (underlay.time() - j.created) / chart[0]);
				if(j.pos.x <= strumLine) {
					beatHit();
					if (debugMode) play("metro", {detune: j.mainBar ? 200 : 0});
					destroy(j);
				}
			});
			every("note", (j) => {
				j.pos.x = lerp(width(), strumLine, (underlay.time() - j.created) / chart[0]);
				if(autoplay) {
					if(j.pos.x <= strumLine && !j.empty) {
						play(hitsound);
					  player.play("talk");
						destroy(j);
					}
				} else {
					if(j.pos.x <= strumLine - 20 && !j.empty) {
						score -= 200;
						destroy(j);
						play("explode");
						player.play("miss");
						shake(5);
						combo = 0;
						health -= 0.1;
					}
				}
				if(j.pos.x >= strumLine - 20 && j.empty) {
					if(j.pos.x <= strumLine) {
						destroy(j); //Destroys note. No score.
						player2?.play("talk");
					}
				}
			});
		}
	})
	var mt;
	onKeyPress("enter", () => {
		if (!underlay.isPaused()) {
			underlay.pause();
			music.pause();
			mt = [underlay.time(), music.time()];
		} else {
			underlay.play(mt[0]);
			music.play(mt[1]);
		}
	});
	onKeyPress("space", () => {judgeHitsLol()});
	onKeyPress("a", () => {autoplay = !autoplay});
	onKeyPress("d", () => {debugMode = !debugMode});
	onClick(() => {judgeHitsLol()});
	onTouchStart(() => {judgeHitsLol()});
	onDraw(() => {
		drawLine({
    	p1: vec2(0, 20),
    	p2: vec2(width(), 20),
  	  width: 2,
	    color: rgb(255, 255, 255),
		})
		drawLine({
    	p1: vec2(0, 70),
    	p2: vec2(width(), 70),
  	  width: 2,
	    color: rgb(255, 255, 255),
		})
		drawLines({ // 80 * 240, 20 * 60
    	pts: [ vec2(strumLine, 18), vec2(strumLine + 10, 18), vec2(strumLine + 10, 72), vec2(strumLine, 72), vec2(strumLine, 18) ],
    	width: 2,
  	  pos: vec2(100, 200),
	    color: rgb(255, 255, 255),
		})
    drawText({
  	  text: "MID-SIMULATOR DEMO -- WORK IN PROGRESS!",
    	size: 20,
  	  pos: vec2(0, 0),
			font: font
		});
		if (debugMode) {
    drawText({
  	  text: underlay.time() * 1000,
    	size: 20,
  	  pos: vec2(0, 20),
			font: font
		});
    drawText({
  	  text: curBeat,
    	size: 20,
  	  pos: vec2(0, 40),
			font: font
		});
    drawText({
  	  text: prevStep + "/" + (chart[2].length - 1),
    	size: 20,
  	  pos: vec2(0, 60),
			font: font
		});
    drawText({
  	  text: (chart[2][Math.floor(prevStep)] ? chart[2][Math.floor(prevStep)] : "."),
    	size: 20,
  	  pos: vec2(0, 80),
			font: font
		});
    drawText({
  	  text: (chart[2][Math.floor(curStep)] ? chart[2][Math.floor(curStep)] : "."),
    	size: 20,
  	  pos: vec2(0, 100),
			font: font
		});
    drawText({
  	  text: "Health: " + health,
    	size: 20,
  	  pos: vec2(strumLine, 120),
			font: font
		});
		}
    drawText({
  	  text: "Score: " + score,
    	size: 20,
  	  pos: vec2(strumLine, 80),
			font: font
		});
    drawText({
  	  text: "Combo: " + combo,
    	size: 20,
  	  pos: vec2(strumLine, 100),
			font: font
		});
		if (autoplay) {
			drawText({
	  	  text: "AUTOPLAY",
	    	size: 20,
  		  pos: vec2(strumLine, 120),
				font: font
			});
		}
	})
	function makeNote(letter) {
		switch (letter) {
			case "J":
				add([
						rect(10, 50),
						pos(width(), 20),
						chart[2][Math.floor(prevStep)] == "F" ? color(168, 56, 50) : color(232, 3, 252),
						("note" + prevStep),
						"note",
						{
							created: underlay.time(),
							type: chart[2][Math.floor(prevStep)]
						}
				]);
				break;
			case "T":
				add([
						rect(0, 50),
						pos(width(), 20),
						("note" + prevStep),
						"note",
						"empty",
						{
							created: underlay.time(),
							empty: true,
							type: chart[2][Math.floor(prevStep)]
						}
				]);
				break;
			case "D":
				add([
						rect(10, 50),
						pos(width(), 20),
						chart[2][Math.floor(prevStep)] == "F" ? color(168, 56, 50) : color(232, 3, 252),
						("note" + prevStep),
						"note",
						{
							created: underlay.time(),
							type: chart[2][Math.floor(prevStep)]
						}
				]);
				add([
						rect(0, 50),
						pos(width(), 20),
						("note" + prevStep),
						"note",
						"empty",
						{
							created: underlay.time(),
							empty: true,
							type: chart[2][Math.floor(prevStep)]
						}
				]);
				break;
		}
	}
	function judgeHitsLol() {
		var iv = false;
		every("note", (j) => {
			if (!iv) {
				if (!j.empty) {
					var str = "No Rating";
					var theColor = WHITE;
					if(j.pos.x >= strumLine - 20) {
						if(j.pos.x <= strumLine + 22) {
							iv = true;
							destroy(j); //Destroys note. No score.
							noteClick.play("click");
							combo += 1;
							str = "MID";
							theColor = RED;
						}
						if(j.pos.x <= strumLine + 12) {
							play(hitsound); //Plays sound!
							player.play("talk");
							score += 20;
							health += 0.01;
							str = "Perfect!";
							theColor = MAGENTA;
						}
						if(j.pos.x <= strumLine) {
							score += 50;
							health += 0.02;
							str = "Marvelous!";
							theColor = YELLOW;
						}
						if(j.pos.x <= strumLine - 3) {
							score += 50;
							health -= 0.01;
							str = "Perfect!";
							theColor = MAGENTA;
						}
						if(j.pos.x <= strumLine - 8) {
							score -= 100;
							health -= 0.02;
							str = "Overshot";
							theColor = CYAN;
						}
					}
					if (str != "No Rating") {
						var origpos = strumLine - 16;
						var ratingtxt = add([
							text(str, {
        				size: 30, // 48 pixels tall
   						}),
							pos(origpos, 48),
							color(theColor),
							origin("right")
						]);
						tween(ratingtxt.pos, ["y"], 5, 48, 300, easings.easeOutSine, tweentypes.NORMAL);
						tween(ratingtxt, ["opacity"], 5, 1, 0, easings.easeOutSine, tweentypes.NORMAL, function() {
							destroy(ratingtxt);
						});
					}
				}
			}
		});
	}
	function beatHit() {
		every("dances", (obj) => {
			if (player.curAnim() != "talk" && player.curAnim() != "miss") {
				obj.play("idle");
			}	
		});
	}
});

scene("Help", () => {
	var songs = [
		"tutorial",
		"faith",
		"green",
		"sonic"
	];
	var names = [
		"Tutorial",
		"Friendly Faith Plate",
		"Green Hill Zone",
		"Emerald Hill Zone"
	]
	var chars = {
		tutorial: [
			"JellyBean",
			"RedVelvety",
			"Marc",
			"CarterRedacted",
			"MarkyMark"
		],
		faith: [
			"FaithPlate"
		],
		green: [
			"SonicAndTails"
		],
		sonic: [
			"SonicAndTails"
		]
	}
	const bg = add([
    sprite("bgCake")
	]);
	onDraw(() => {
    drawText({
  	  text: "CONTROLS",
    	size: 30,
  	  pos: vec2(25, 25)
		});
    drawText({
  	  text: ": ENABLE AUTOPLAY - ENTER TO PAUSE",
    	size: 30,
  	  pos: vec2(60, 60)
		});
    drawText({
  	  text: "  /  : HIT NOTE",
    	size: 30,
  	  pos: vec2(55, 95)
		});
		drawSprite({
  	  sprite: "keyA",
			width: 60,
			height: 60,
  	  pos: vec2(5, 45)
		})
		drawSprite({
  	  sprite: "keySpace",
			width: 60,
			height: 60,
  	  pos: vec2(20, 80)
		})
		drawSprite({
  	  sprite: "keyClick",
			width: 60,
			height: 60,
  	  pos: vec2(95, 80)
		})
    drawText({
  	  text: "SOUND & SHAKING WARNINGS",
    	size: 30,
  	  pos: vec2(width() / 2 - 105, 25)
		});
    drawText({
  	  text: "CHARACTER ("+ (idx + 1) +"/"+ chars[songs[songIdx]].length +"): " + chars[songs[songIdx]][idx],
    	size: 30,
  	  pos: vec2(width() / 2, 200),
			origin: "top"
		});
    drawText({
  	  text: "SONG ("+ (songIdx + 1) +"/"+ songs.length +"): " + names[songIdx].toUpperCase(),
    	size: 30,
  	  pos: vec2(width() / 2, 160),
			origin: "top"
		});
		drawSprite({
  	  sprite: chars[songs[songIdx]][idx] + "Pre",
			width: 64,
			height: 64,
  	  pos: vec2((width() / 2) - 34, 248)
		});
	})
	add([
    pos(0, 140),
    rect(700, 200),
		color(0, 0, 0)
	])
	var lt = add([
    pos(10, 200),
    text("<", {
        size: 30
    }),
		area(),
		"LeftText"
	])
	var rt = add([
    pos(width() - 30, 200),
    text(">", {
        size: 30
    }),
		area(),
		"RightText"
	])
	var dt = add([
    pos(10, 160),
    text("v", {
        size: 30
    }),
		area(),
		"DownText"
	])
	var ut = add([
    pos(width() - 30, 160),
    text("^", {
        size: 30
    }),
		area(),
		"UpText"
	])
	var clickText = add([
    pos(25, height() - 60),
    text("Press Space or Click Here to start", {
        size: 30
    }),
		area(),
		"TEXT TEXT"
	])
	function changeIdx(amt) {
		idx += amt;
		if (idx < 0) {
			idx = chars[songs[songIdx]].length - 1;
		} else if (idx >= chars[songs[songIdx]].length) {
			idx = 0;
		}
	}
	function changeSongIdx(amt) {
		songIdx += amt;
		idx = 0;
		if (songIdx < 0) {
			songIdx = songs.length - 1;
		} else if (songIdx >= songs.length) {
			songIdx = 0;
		}
	}
	
	onKeyPress("left", () => {changeIdx(-1)});
	onKeyPress("right", () => {changeIdx(1)});
	onKeyPress("down", () => {changeSongIdx(1)});
	onKeyPress("up", () => {changeSongIdx(-1)});
	onKeyPress("`", () => {go("Chart", songs[songIdx])});
	onClick("LeftText", () => {changeIdx(-1)});
	onClick("RightText", () => {changeIdx(1)});
	onClick("DownText", () => {changeSongIdx(1)});
	onClick("UpText", () => {changeSongIdx(-1)});
	onKeyPress("space", () => {go("Game", [songs[songIdx], chars[songs[songIdx]][idx]]);/*losemus.stop();*/});
	onClick("TEXT TEXT", () => {go("Game", [songs[songIdx], chars[songs[songIdx]][idx]]);/*losemus.stop();*/});
});

scene("Title", () => {
	const bg = add([
    sprite("bgCake")
	]);
	const jb = add([
    sprite("jellybeanTitle"),
		pos(0, height() - 320)
	]);
	const logo = add([
    sprite("logo"),
		pos(0, 0),
		scale(0.5, 0.5)
	]);
	onDraw(() => {
    drawText({
  	  text: "SPACE/CLICK TO START",
    	size: 30,
  	  pos: vec2(width() / 2 - 90, height() - 60)
		});
	})
	onKeyPress("space", () => {go("Help", ["tutorial"]);/*losemus.stop();*/});
	onClick(() => {go("Help", ["tutorial"]);/*losemus.stop();*/});
	onTouchStart(() => {go("Help", ["tutorial"]);/*losemus.stop();*/});
});

scene("Lose", (score) => {
	const lost = add([
    sprite("jellybeanFail"),
		"dances",
		pos((width() / 2) - 162, height() / 2 - 162)
	])
	const losemus = play("gameover", {
	    volume: 1,
	    loop: true
	});
	onDraw(() => {
    drawText({
  	  text: "YOU LOST LOL WHOOPS",
    	size: 60,
  	  pos: vec2(0, height() - 120)
		});
    drawText({
  	  text: "SPACE/CLICK TO RESTART",
    	size: 30,
  	  pos: vec2(0, height() - 60)
		});
    drawText({
  	  text: "SCORE: " + score,
    	size: 30,
  	  pos: vec2(0, height() - 30)
		});
	})
	onKeyPress("space", () => {go("Title");losemus.stop();});
	onClick(() => {go("Title");losemus.stop();});
	onTouchStart(() => {go("Title");losemus.stop();});
});

scene("Chart", (song) => {
	var chart = charts[song];
	var crochet = ((60 / chart[1]) * 1000);
	var curBeat;
	var curStep;
	var songTime = 0;
	var tool = "J";
	const music = play(song, {
	    volume: 1,
	    loop: false
	});
	music.pause()
	
	var lastTargeted = 4;
	var tempChart = Array.from(Array(Math.floor((music.duration() * 1000) / (crochet / 4))), () => ".");
	// Incredibly redundant, sadly I don't care
	var coords = [
		width() * 0.1,
		width() * 0.2,
		width() * 0.3,
		width() * 0.4,
		width() * 0.5,
		width() * 0.6,
		width() * 0.7,
		width() * 0.8,
		width() * 0.9
	];
	var theEmpty = add([
    pos(width() * 0.2, height() * 0.8),
    rect(60, 60),
    text(".", {
        size: 48, // 48 pixels tall
				width: 60
    }),
    color(255, 255, 255),
    outline(4, WHITE),
		origin("center"),
    area(),
		"theEmpty"
	]);
	var theJ = add([
    pos(width() * 0.4, height() * 0.8),
    rect(60, 60),
    text("J", {
        size: 48, // 48 pixels tall
				width: 60
    }),
    color(255, 255, 255),
    outline(4, WHITE),
		origin("center"),
    area(),
		"theJ"
	]);
	var theP = add([
    pos(width() * 0.6, height() * 0.8),
    rect(60, 30),
    text("P", {
        size: 24, // 48 pixels tall
				width: 60
    }),
    color(255, 255, 255),
    outline(4, WHITE),
		origin("center"),
    area(),
		"theP"
	]);
	var theD = add([
    pos(width() * 0.6, height() * 0.8 + 30),
    rect(60, 30),
    text("D", {
        size: 24, // 48 pixels tall
				width: 60
    }),
    color(255, 255, 255),
    outline(4, WHITE),
		origin("center"),
    area(),
		"theD"
	]);
	var consoleButton = add([
    pos(width() * 0.8, height() * 0.8),
    rect(60, 60),
    text("EXPORT", {
        size: 30, // 48 pixels tall
    }),
    color(255, 255, 255),
    outline(4, WHITE),
		origin("center"),
    area(),
		"consoleButton"
	]);
	onClick("theEmpty", (o) => {tool = "."})
	onClick("theJ", (o) => {tool = "J"})
	onClick("theP", (o) => {tool = "P"})
	onClick("theD", (o) => {tool = "D"})
	onClick("consoleButton", (o) => {console.log(tempChart.join(""));})
	onUpdate(() => {
		curBeat = Math.floor(((music.time() * 1000) / crochet) * 10) / 10;
		curStep = Math.floor((music.time() * 1000) / (crochet / 4));
		if (mousePos().y >= height() * 0.4 && mousePos().y < (height() / 2) + 34) { // I shouldve used a Switch Case here :/
			if (mousePos().x < width() * 0.15) {
				// blk0
				lastTargeted = 0;
			} else if (mousePos().x < width() * 0.25) {
				// blk1
				lastTargeted = 1;
			} else if (mousePos().x < width() * 0.35) {
				// blk2
				lastTargeted = 2;
			} else if (mousePos().x < width() * 0.45) {
				// blk3
				lastTargeted = 3;
			} else if (mousePos().x < width() * 0.55) {
				// blk4
				lastTargeted = 4;
			} else if (mousePos().x < width() * 0.65) {
				// blk5
				lastTargeted = 5;
			} else if (mousePos().x < width() * 0.75) {
				// blk6
				lastTargeted = 6;
			} else if (mousePos().x < width() * 0.85) {
				// blk7
				lastTargeted = 7;
			} else if (mousePos().x < width()) {
				// blk8
				lastTargeted = 8;
			}
		}
	});
	onMouseDown(() => {
		if (mousePos().y >= height() * 0.4 && mousePos().y < (height() / 2) + 34) {
			tempChart[curStep + lastTargeted] = tool;
		}
	});
	onDraw(() => {
    drawText({
  	  text: songTime * 1000,
    	size: 20,
  	  pos: vec2(0, )
		});
    drawText({
  	  text: music.time() * 1000,
    	size: 20,
  	  pos: vec2(0, 20)
		});
    drawText({
  	  text: curBeat,
    	size: 20,
  	  pos: vec2(0, 40)
		});
    drawText({
  	  text: curStep + "/" + (tempChart.length - 1),
    	size: 20,
  	  pos: vec2(0, 60)
		});
    drawText({
  	  text: tool,
    	size: 50,
  	  pos: vec2(width() / 2, height() * 0.65),
			origin: "center"
		});
		drawLine({
  	  p1: vec2(coords[lastTargeted] - 30, (height() / 2) + 30),
  	  p2: vec2(coords[lastTargeted] + 30, (height() / 2) + 30),
  	  width: 4,
  	  color: rgb(255, 0, 0),
		})
		drawText({
    	text: tempChart[curStep] ? tempChart[curStep] : "",
  	  size: 30,
  	  pos: vec2(coords[0], height() / 2),
			color: curStep % 4 == 0 ? RED : MAGENTA,
			origin: "center"
		})
		drawText({
    	text: tempChart[curStep + 1] ? tempChart[curStep + 1] : "",
  	  size: 30,
  	  pos: vec2(coords[1], height() / 2),
			color: (curStep + 1) % 4 == 0 ? RED : WHITE,
			origin: "center"
		})
		drawText({
    	text: tempChart[curStep + 2] ? tempChart[curStep + 2] : "",
  	  size: 30,
  	  pos: vec2(coords[2], height() / 2),
			color: (curStep + 2) % 4 == 0 ? RED : WHITE,
			origin: "center"
		})
		drawText({
    	text: tempChart[curStep + 3] ? tempChart[curStep + 3] : "",
  	  size: 30,
  	  pos: vec2(coords[3], height() / 2),
			color: (curStep + 3) % 4 == 0 ? RED : WHITE,
			origin: "center"
		})
		drawText({
    	text: tempChart[curStep + 4] ? tempChart[curStep + 4] : "",
  	  size: 30,
  	  pos: vec2(coords[4], height() / 2),
			color: (curStep + 4) % 4 == 0 ? RED : WHITE,
			origin: "center"
		})
		drawText({
    	text: tempChart[curStep + 5] ? tempChart[curStep + 5] : "",
  	  size: 30,
  	  pos: vec2(coords[5], height() / 2),
			color: (curStep + 5) % 4 == 0 ? RED : WHITE,
			origin: "center"
		})
		drawText({
    	text: tempChart[curStep + 6] ? tempChart[curStep + 6] : "",
  	  size: 30,
  	  pos: vec2(coords[6], height() / 2),
			color: (curStep + 6) % 4 == 0 ? RED : WHITE,
			origin: "center"
		})
		drawText({
    	text: tempChart[curStep + 7] ? tempChart[curStep + 7] : "",
  	  size: 30,
  	  pos: vec2(coords[7], height() / 2),
			color: (curStep + 7) % 4 == 0 ? RED : WHITE,
			origin: "center"
		})
		drawText({
    	text: tempChart[curStep + 8] ? tempChart[curStep + 8] : "",
  	  size: 30,
  	  pos: vec2(coords[8], height() / 2),
			color: (curStep + 8) % 4 == 0 ? RED : WHITE,
			origin: "center"
		})
	});

	onKeyPress("left", () => {
		music.pause();
		songTime = songTime - ((crochet / 4) / 1000);
		try {
			music.play(songTime);
		} catch (err) {
			console.log(err);
			songTime = 0;
			music.play(0);
		}
		music.pause();
	});
	onKeyPress("right", () => {
		music.pause();
		songTime = songTime + ((crochet / 4) / 1000);
		try {
			music.play(songTime);
		} catch (err) {
			console.log(err);
			songTime = 0;
			music.play(0);
		}
		music.pause();
	});
	onKeyPress("space", () => {
		if (!music.isPaused()) {
			music.pause();
			songTime = music.time();
		} else {
			try {
				music.play(songTime);
			} catch (err) {
				console.log(err);
				songTime = 0;
				music.play(0);
			}
		}
	});
});

go("Title");