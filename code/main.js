"use strict";
import { kaboom, easings, tween, tweentypes } from "../deps.js";
import { charts } from "./charts.js";

// initialize context
kaboom({
    width: 700,
    height: 400,
	background: [ 0, 0, 0 ],
	crisp: true,
	touchToMouse: true,
	canvas: document.querySelector("#kaboom"),
	font: "MidSim",
	scale: 1,

});
var ismobile = isTouch();

load(new Promise((resolve, reject) => {
	loadFont("unscii", "sprites/unscii_8x8.png", 8, 8, {chars: " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"});
	loadFont("MidSim", "sprites/MidSimFont2.png", 10, 10, {chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:;><^%-.!?/()[]\"'|1234567890"});
	// Music
	loadSound("gameover", "sounds/gameover.mp3");
	// 
	
	// Sounds
	loadSound("nullHit", "sounds/nullHit.mp3");
	loadSound("score", "sounds/score.mp3");
	loadSound("metro", "sounds/metro.wav");
	loadSound("explode", "sounds/explode.mp3");
	// 

	//Menus
	loadSprite("bgCake", "sprites/bgCake.png");
	loadSprite("jellybeanTitle", "sprites/jellybeanTitle.png");
	loadSprite("logo", "sprites/logo.png");
	loadSprite("jellybeanFail", "sprites/jellybeanFail.png");
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

	for (let ided in charts) {
		console.log("Loading game assets...");
		charts[ided].events.preload();
		console.log("Assets of song " + charts[ided].name + " loaded.");
	}
	
	resolve("All assets loaded.");
}));

scene("Game", (idx, noTrans) => {
	var song = charts[idx.song].id; //Also Chart access
	var char = charts[idx.song].characters[idx.character][0];
	var hitsound = "hitsound" + charts[idx.song].characters[idx.character][0];
	var chart = charts[idx.song].chart;
	var crochet = ((60 / charts[idx.song].bpm) * 1000);
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
	var font = "MidSim";
	if (char == "MarkyMark") {
		font = "unscii";
	}

	// Music
	var strumLine = width() / 2;
	const music = play(charts[idx.song].id, {
	    volume: 1,
	    loop: false
	});
	const underlay = play("score", {
	    volume: 1,
	    loop: false
	});
	music.pause()
	wait(charts[idx.song].speed, () => {
		underlay.pause();
		music.play();
		underlay.play(music.time() + charts[idx.song].speed);
	});

	// Sprites
	layers([
    "bg",
		"JELLYBEAN",
    "SKELETONS",
		"fg",
    "ui0",
		"ui1"
	], "ui0");
	var players = {
		main: 0,
		empty: 0,
	};
	var bg;
	var tweenVals = {
		fade: 1,
		triggered: false
	}
	tween(tweenVals, ["fade"], 1, 1, 0, easings.easeOutCirc, tweentypes.NORMAL);
	if (!charts[idx.song].makeScript.customChar) {
		players.main = add([
	    sprite(char + song),
			layer("JELLYBEAN"),
			"dances",
			pos(charts[idx.song].characters[idx.character][2], charts[idx.song].characters[idx.character][3]),
			scale(charts[idx.song].scale)
		]);
	} 
	if (!charts[idx.song].makeScript.customBG) {
		bg = add([
			sprite(song + "BG0"),
			layer("bg"),
			scale(charts[idx.song].scale)
		]);
		const fg = add([
			sprite(song + "FG0"),
			(song == "faith" ? layer("bg") : layer("fg")),
			scale(charts[idx.song].scale)
		]);
	}
	var script = charts[idx.song].makeScript.script(players, char, bg);
	if (script.returnType != undefined && script.returnType == "character") {
		players.main = script.main;
		players.empty = script.empty;
	}
	const noteClick = add([
		sprite("noteClick"),
		scale(0.25),
		pos(strumLine, 15)
	])
	const bspButton = add([
    pos(0, 0),
		color(CYAN),
    text(ismobile ? "<" : "BACKSPACE TO EXIT", {
        size: ismobile? 32 : 20, // 48 pixels tall
    }),
		area({
			offset: ismobile ? vec2(canvas.offsetLeft, canvas.offsetTop) : vec2(0, 0),
		}),
		"back"
	])
	const entButton = add([
    pos(width(), 0),
		origin("topright"),
		color(YELLOW),
    text(ismobile ? "||" : "ENTER TO PAUSE", {
        size: ismobile? 32 : 20, // 48 pixels tall
    }),
		area({
			offset: ismobile ? vec2(canvas.offsetLeft, canvas.offsetTop) : vec2(0, 0),
		}),
		"ent"
	])
	// Gameplay
	onUpdate(() => {
		if (health > 1) health = 1;
		if (health < 0) {
			health = 0;
			if(!tweenVals.triggered) {
				tween(tweenVals, ["fade"], 1, 0, 1, easings.easeOutCirc, tweentypes.NORMAL, function () {
					underlay.stop();
					music.stop();
					go("Lose", score, idx);
				});
				underlay.pause();
				music.pause();
				tweenVals.triggered = true;
			}
		}
		if (music.time() > music.duration() && health >= 0) {
			if(!tweenVals.triggered) {
				tween(tweenVals, ["fade"], 1, 0, 1, easings.easeOutCirc, tweentypes.NORMAL, function () {
					go("Help");
				});
				tweenVals.triggered = true;
			}
		}
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
		if (get("note" + prevStep).length <= 0) {
			makeNote(charts[idx.song].chart[Math.floor(prevStep)]);
		}
		if (!underlay.isPaused()) {
			every("bar", (j) => {
				j.pos.x = lerp(width(), strumLine, (underlay.time() - j.created) / charts[idx.song].speed);
				if(j.pos.x <= strumLine) {
					beatHit();
					if (debugMode) play("metro", {detune: j.mainBar ? 200 : 0});
					destroy(j);
				}
				if (charts[idx.song].events.onBeat != undefined) {
					charts[idx.song].events.onBeat(curBeat);
				}
			});
			every("note", (j) => {
				j.pos.x = lerp(width(), strumLine, (underlay.time() - j.created) / charts[idx.song].speed);
				if(autoplay) {
					if(j.pos.x <= strumLine && !j.empty) {
						play(hitsound);
					  players.main.play("talk"); //Check this area later, you want to add in Note Modularity!
						destroy(j);
					}
				} else {
					if(j.pos.x <= strumLine - 20 && !j.empty) {
						score -= 200;
						destroy(j);
						play("explode");
						players.main.play("miss");
						shake(5);
						combo = 0;
						health -= 0.1;
					}
				}
				if(j.pos.x <= strumLine && j.empty) {
					if (!j.normal) {
						j.function(j.empty, curBeat, j.type);
					}
					destroy(j);
					players.empty?.play("talk");
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
	onKeyPress("backspace", () => {
		tween(tweenVals, ["fade"], 1, 0, 1, easings.easeOutCirc, tweentypes.NORMAL, function () {
				underlay.stop();
				music.stop();
				go("Help");
		});
		underlay.pause();
		music.pause();
	});
	onKeyPress("a", () => {autoplay = !autoplay});
	onKeyPress("d", () => {debugMode = !debugMode});
	onClick("back", () => {
		tween(tweenVals, ["fade"], 1, 0, 1, easings.easeOutCirc, tweentypes.NORMAL, function () {
				underlay.stop();
				music.stop();
				go("Help");
		});
		underlay.pause();
		music.pause();
	});
	onClick("ent", () => {
		if (!underlay.isPaused()) {
			underlay.pause();
			music.pause();
			mt = [underlay.time(), music.time()];
		} else {
			underlay.play(mt[0]);
			music.play(mt[1]);
		}
	});
	onClick(() => {judgeHitsLol()});
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
  	  text: "MID-SIMULATOR DEMO",
    	size: 20,
  	  pos: vec2(0, height() - 20),
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
  	  text: prevStep + "/" + (charts[idx.song].chart.length - 1),
    	size: 20,
  	  pos: vec2(0, 60),
			font: font
		});
    drawText({
  	  text: (charts[idx.song].chart[Math.floor(prevStep)] ? charts[idx.song].chart[Math.floor(prevStep)] : "."),
    	size: 20,
  	  pos: vec2(0, 80),
			font: font
		});
    drawText({
  	  text: (charts[idx.song].chart[Math.floor(curStep)] ? charts[idx.song].chart[Math.floor(curStep)] : "."),
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
  		  pos: vec2(strumLine, debugMode? 140: 120),
				font: font
			});
		}
		drawRect({
			width: 702,
			height: 402,
			pos: vec2(-1, -1),
			color: BLACK,
			opacity: tweenVals.fade
		})
	})

	//Functions
	
	function makeNote(letter) {
		if (charts[idx.song].noteTypes.hasOwnProperty(letter)) {
			charts[idx.song].noteTypes[letter](underlay.time(), prevStep, char);
		}
	}
	function judgeHitsLol() {
		var iv = false;
		var hits = 0;
		every("note", (j) => {
			if (!iv) {
				if (!j.empty) {
					var str = "No Rating";
					var theColor = WHITE;
					if(j.pos.x >= strumLine - 20) {
						if(j.pos.x <= strumLine + 22) {
							hits++;
							iv = true;
							if (!j.normal) {
								j.function(j.empty, curBeat, j.type);
							}
							destroy(j); //Destroys note. No score.
							noteClick.play("click");
							combo += 1;
							str = "MID";
							theColor = RED;
						}
						if(j.pos.x <= strumLine + 12) {
							play(hitsound); //Plays sound!
							players.main.play("talk");
							score += 20;
							health += 0.01;
							str = "Perfect!";
							theColor = MAGENTA;
						}
						if(j.pos.x <= strumLine + 5) {
							score += 50;
							health += 0.02;
							str = "Perfect!!";
						}
						if(j.pos.x <= strumLine - 3) {
							score += 50;
							health -= 0.01;
							str = "Perfect!";
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
		if (hits <= 0) {
			play("nullHit");
		}
	}
	function beatHit() {
		every("dances", (obj) => {
			if (obj.curAnim() != "talk" && obj.curAnim() != "miss") {
				obj.play("idle");
			}	
		});
	}
});

scene("Help", (noTrans) => {
	var index = {
		character: 0,
		song: 0
	}
	var tweenVals = {
		fade: 0
	}
	if (!noTrans) tween(tweenVals, ["fade"], 1, 1, 0, easings.easeOutCirc, tweentypes.NORMAL);
	const bg = add([
    sprite("bgCake")
	]);
	onDraw(() => {
		if (!ismobile) {
			drawText({
				text: "D: ENABLE DEBUG MODE",
				size: 30,
				pos: vec2(25, 25)
			});
  	  drawText({
  		  text: "A: ENABLE AUTOPLAY",
  	  	size: 30,
  		  pos: vec2(25, 60)
			});
		}
    drawText({
  	  text: ismobile ? "TAP TO HIT NOTES" : "SPACE/CLICK: HIT NOTE",
    	size: 30,
  	  pos: ismobile ? vec2(25, 60) : vec2(25, 95)
		});
    drawText({
  	  text: charts[index.song].characters[index.character][1] + " ("+ (index.character + 1) +"/"+ charts[index.song].characters.length +")",
    	size: 30,
  	  pos: vec2(width() / 2, 200),
			origin: "top"
		});
    drawText({
  	  text: charts[index.song].name,
    	size: 30,
  	  pos: vec2(width() / 2, 160),
			origin: "top"
		});
		drawSprite({
  	  sprite: charts[index.song].characters[index.character][0] + "Pre",
			width: 64,
			height: 64,
  	  pos: vec2((width() / 2) - 34, 248)
		});
		drawRect({
			width: 702,
			height: 402,
			pos: vec2(-1, -1),
			color: BLACK,
			opacity: tweenVals.fade
		})
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
		area({
			height: 30,
			offset: ismobile ? vec2(canvas.offsetLeft, canvas.offsetTop) : vec2(0, 0),
			width: 30,
			cursor: "pointer"
		}),
		"LeftText"
	])
	var rt = add([
    pos(width() - 10, 200),
		origin("topright"),
    text(">", {
        size: 30
    }),
		area({
			height: 30,
			offset: ismobile ? vec2(canvas.offsetLeft, canvas.offsetTop) : vec2(0, 0),
			width: 30,
			cursor: "pointer"
		}),
		"RightText"
	])
	var dt = add([
    pos(10, 160),
    text("%", {
        size: 30
    }),
		area({
			height: 30,
			offset: ismobile ? vec2(canvas.offsetLeft, canvas.offsetTop) : vec2(0, 0),
			width: 30,
			cursor: "pointer"
		}),
		"DownText"
	])
	var ut = add([
    pos(width() - 10, 160),
		origin("topright"),
    text("^", {
        size: 30
    }),
		area({
			height: 30,
			offset: ismobile ? vec2(canvas.offsetLeft, canvas.offsetTop) : vec2(0, 0),
			width: 30,
			cursor: "pointer"
		}),
		"UpText"
	])
	var clickText = add([
    pos(width() / 2, height() - 45),
    text(ismobile ? "TAP HERE TO START" : "SPACE TO START", {
        size: 30
    }),
		origin("top"),
		area({
			height: 30,
			offset: ismobile ? vec2(canvas.offsetLeft, canvas.offsetTop) : vec2(0, 0),
			width: 700,
			cursor: "pointer"
		}),
		"TEXT TEXT"
	])
	function changeIdx(amt) {
		index.character += amt;
		if (index.character < 0) {
			index.character = charts[index.song].characters.length - 1;
		} else if (index.character >= charts[index.song].characters.length) {
			index.character = 0;
		}
	}
	function changeSongIdx(amt) {
		index.song += amt;
		index.character = 0;
		if (index.song < 0) {
			index.song = charts.length - 1;
		} else if (index.song >= charts.length) {
			index.song = 0;
		}
	}
	
	onKeyPress("left", () => {changeIdx(-1)});
	onKeyPress("right", () => {changeIdx(1)});
	onKeyPress("down", () => {changeSongIdx(-1)});
	onKeyPress("up", () => {changeSongIdx(1)});
	onKeyPress("`", () => {go("Chart", index.song)});
	onKeyPress("D", () => {go("Chart", index.song)});
	onKeyPress("/", () => {go("Chart", index.song)});
	onKeyPress("7", () => {go("Chart", index.song)});
	lt.onClick(() => {changeIdx(-1)});
	rt.onClick(() => {changeIdx(1)});
	dt.onClick(() => {changeSongIdx(-1)});
	ut.onClick(() => {changeSongIdx(1)});
	onKeyPress("space", () => {
		tween(tweenVals, ["fade"], 1, 0, 1, easings.easeOutCirc, tweentypes.NORMAL, function () {
			go("Game", index);
		});
	});
	clickText.onClick(() => {go("Game", index);/*losemus.stop();*/});
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
  	  text: "SPACE TO START",
    	size: 30,
			origin: "top",
  	  pos: vec2(width() / 2, height() - 45)
		});
	})
	onKeyPress("space", () => {go("Help", true);/*losemus.stop();*/});
	onClick(() => {go("Help", true);/*losemus.stop();*/});
	onTouchStart(() => {go("Help", true);/*losemus.stop();*/});
});

scene("Lose", (score, song) => {
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
  	  text: "OUCHIE!",
    	size: 60,
  	  pos: vec2(0, height() - 120)
		});
    drawText({
  	  text: ismobile ? "TAP TO RESTART" : "SPACE TO RESTART",
    	size: 30,
  	  pos: vec2(0, height() - 60)
		});
    drawText({
  	  text: "SCORE: " + score,
    	size: 30,
  	  pos: vec2(0, height() - 30)
		});
	})
	onKeyPress("space", () => {go("Game", song);losemus.stop();});
	onClick(() => {go("Game", song);losemus.stop();});
});

scene("Chart", (idx) => {
	var chart = charts[idx].chart;
	var crochet = ((60 / charts[idx].bpm) * 1000);
	var curBeat;
	var curStep;
	var songTime = 0;
	var tool = "J";
	const music = play(charts[idx].id, {
	    volume: 1,
	    loop: false
	});
	music.pause();
	
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
