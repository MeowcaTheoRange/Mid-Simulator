import { kaboom } from "../deps.js";

export var charts = [
	{
		id: "tutorial",
		name: "Tutorial",
		speed: 5, // How much seconds it takes to get from Right Stage to the hitmarker
		bpm: 135, // Song BPM
		events: {
			preload: function() {
				loadSound("hitsoundJellyBean", "sounds/hitsoundJellyBean.wav");
				loadSound("hitsoundCarterRedacted", "sounds/hitsoundJellyBean.wav");
				loadSound("hitsoundMarc", "sounds/hitsoundJellyBean.wav");
				loadSound("hitsoundRedVelvety", "sounds/hitsoundRedVelvety.wav");
				loadSound("hitsoundMarkyMark", "sounds/burp.mp3");
				loadSprite("JellyBeanPre", "sprites/previews/JellyBeanPre.png");
				loadSprite("RedVelvetyPre", "sprites/previews/RedVelvetyPre.png");
				loadSprite("MarkyMarkPre", "sprites/previews/MarkyMarkPre.png");
				loadSprite("CarterRedactedPre", "sprites/previews/CarterRedactedPre.png");
				loadSprite("MarcPre", "sprites/previews/MarcPre.png");
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
			}
		},
		characters: [
			["JellyBean", "JellyBean", 186, 0],
			["RedVelvety", "RedVelvety", 186, 0],
			["Marc", "Marc", 186, 0],
			["CarterRedacted", "CarterRedacted", 186, 0],
			["MarkyMark", "Mark", 186, 0]
		],
		noteTypes: {
			"J": noteDefault,
		},
		makeScript: {
			customChar: false,
			customBG: false,
			charPos: [],
			script: function() {
				add([
					sprite("tutorialFG1"),
					layer("fg"),
					scale(1)
				]);
				return {returnType: null};
			}
		},
		chart: "................................................................................................................................J...........J.J...........J.J.J.............J.J.................J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J.............J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J.............J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J...................................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.....J.............................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J...................................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.....J.J.....J.J.....J...........J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.................................J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.....J.J.....J.J.....J.J.....J...................................................................................................................................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................J...........J.J...........J.J.J.............J.J...J...J...J.J...J...........J.J...........J.J...J...............................................................................................................................................................................................................................................................",
		scale: 1 //Texture Scale (too lazy to upsize sprites sometimes)
	},
	{
		id: "faith",
		name: "Friendly Faith Plate",
		speed: 2, 
		bpm: 120, 
		events: {
			preload: function() {
				loadSound("faith", "sounds/The Friendly Faith Plate.mp3"); //120
				loadSound("hitsoundFaithPlate", "sounds/hitsoundFaithPlate.mp3");
				loadSprite("FaithPlatePre", "sprites/previews/FaithPlatePre.png");
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
			}
		},
		characters: [
			["FaithPlate", "Faith Plate", 0, 0]
		],
		noteTypes: {
			"J": noteDefault,
		},
		makeScript: {
			customChar: false,
			customBG: false,
			charPos: [],
			script: function() {
				return {returnType: null};
			}
		},
		chart: "................................................................................................................................J...J...J...JJJJJ...J...J...J...J.J.J.J.J.J.J.J.JJJJJJJJJ.J.J.JJJ.J.J.J.J.J.JJJJJ.JJJ.J.J.J.J.J.J.JJJ.JJJ.J.J.J.JJJJJJJJJJJJJJJJJ.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.J.JJJ.JJJ.JJJ.JJJ.JJJ.J.J.J.J.JJJ.J.JJJJJJJJJJJJJ.J.J.J.JJJJJ.J.J.J.J.J.J.J.JJJJJ.J.J.J.J.JJ.J..J.JJJ.JJJ.J.J.JJJ.JJJ.J.J.J.JJJJJ.J.J.JJJ.JJJJJJJJJJJJJJJJJ.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.JJJJJJJJJJJJJ.J.J.JJJ.J.JJJ.J.J.JJJ.J.J.JJJ.J.J.J.J.J.J.JJJ.JJJJ.JJ.J.J.J.JJ..J...J.J.J.J.J.J.JJJJJJJJJJJJJ.J.J.J.J.J.J.J.J.J.JJJJJ.J.J.J.J.J.J.J.J...J...J.J.J.J.JJJJJJJJJ.J.J.J.J.J.J.JJJ.J.JJJJJJJJJJJJJJJ.J.J.JJJ.J.JJJ.JJJJJJJJJJJJJJJJJ.J.J.JJJ.J.JJJ.JJJJJJJJJJJJJJJJJ.J.J.JJJ.J.JJJ.JJJJJJJJJJJJJJJJJ.J.J.JJJJ.JJJJJJJJJJJJJJJ.JJJJJJJJJJJJJ..J.JJJ.JJJJJJJJJJ....J.J.JJJJJJJ.J.JJJ.JJJJJJJJJJJJJJJJJJJJJ.J.J.J.JJJ.JJJJJJJJJ....JJJJJJJJJ....JJJJJJJ.JJJJJJJ..JJJ..J.JJJJJJJJJJJJJJJ.JJJJJJJ..JJJ....JJJJJJJJJJJJJJJ.JJJJJJJ..JJJ....JJJJJJJJJJJJJJJ.JJJJJJJJ.JJJ..J.JJJJJJJ.J.JJJ.JJJJJJJJJJJJJ.JJJ.J...JJJ.J.JJJ.JJJJJJJJJJJJJ.JJJ.JJJ.JJJ.J.JJJJJJJJJJJJJJJJJJJJJ.JJJ.JJJ.J.JJJ.JJJJJJJJJJJJJJJJJ.JJJ.JJJ.J.JJJ.JJJJJJJJJJJJJJJ...JJJJ........J...JJJJ........J...JJJJ........J...JJJJ........J.J.JJJJ........JJJ.JJJ.JJJ.J.JJJ.J.JJJJ........JJJ.JJJ.JJJ.JJJJJ.J.JJJJ........JJJ.JJJ.JJJ.J.JJJ.J.JJJJ........JJJ.JJJ.JJJ.JJJJJ.J.JJJJJ.......JJJ.J.............",
		scale: 4
	},
	{
		id: "green",
		name: "Green Hill Zone",
		speed: 2, 
		bpm: 150, 
		events: {
			preload: function() {
				loadSound("green", "sounds/GreenHill.wav"); //139
				loadSound("hitsoundSonicAndTails", "sounds/hitsoundJellyBean.wav");
				loadSound("hitsoundTails", "sounds/hitsoundJellyBean.wav");
				loadSprite("SonicAndTailsPre", "sprites/previews/SonicAndTailsPre.png");
				loadSprite("TailsPre", "sprites/previews/TailsPre.png");
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
			}
		},
		characters: [
			["SonicAndTails", "Sonic"],
			["Tails", "Tails"]
		],
		noteTypes: {
			"J": function(time, prevStep, char) {
				if (char == "Tails") {
					customNote(time, "J", prevStep, 0, [0, 0, 0], true);
				} else {
					noteDefault(time, prevStep)
				}
			},
			"T": function(time, prevStep, char) {
				if (char == "Tails") {
					noteDefault(time, prevStep)
				} else {
					customNote(time, "T", prevStep, 0, [0, 0, 0], true);
				}
			},
			"D": function(time, prevStep) {
				noteDefault(time, prevStep);
				customNote(time, "D", prevStep, 0, [0, 0, 0], true);
			}
		},
		makeScript: {
			customChar: true,
			customBG: false,
			charPos: [],
			script: function(players, char, bgEl) {
				var player, player2;
				bgEl.play("idle");
				if (char == "Tails") {
					player = add([
						sprite("SonicAnd" + char + "green" + "1"),
						layer("JELLYBEAN"),
						"dances",
						pos(224, 20),
						scale(1)
					])
					player2 = add([
						sprite("SonicAnd" + char + "green" + "0"),
						layer("JELLYBEAN"),
						"dances",
						pos(20, 108),
						scale(1)
					])
				} else {
					player = add([
						sprite(char + "green" + "0"),
						layer("JELLYBEAN"),
						"dances",
						pos(20, 108),
						scale(1)
					])
					player2 = add([
						sprite(char + "green" + "1"),
						layer("JELLYBEAN"),
						"dances",
						pos(224, 20),
						scale(1)
					])
				}
				return {returnType: "character", main: player, empty: player2};
			}
		},
		chart: "................J.....J.....J.....J.....J...J...J.....J.....J...................J.....J.....J...J.....J.....J...J.....J.................................T.T...T.T...T.T...T...........T.T.T...T.T...T.T...T.............T.T...T.T...T.T...T...........T.T.T...T.T...T.T...T.....T.......J.J...J.J...D.J.T.J.T...T.....J.J.J...J.J...D.J.T.J.T...T.......J.J...J.J...D.J.T.J.T...T.....J.J.J...J.J...D.J.T.J.D...D.....J.....J.....J.....J.T.D.T.J.....J.....J.....J.....J.T.D.T.J.....J.....J.....J.....J.T.D.T.J.T.T.T...T.T.T...T.T.T.T.T.T.T.........J.J...J.J...J.J...J...........J.J.J...J.J...J.J...J.............J.J...J.J...J.J...J...........J.J.J...J.J...J.J...J.....J.......T.T...T.T...D.T.J.T.J...J.....T.T.T...T.T...D.T.J.T.J...J.......T.T...T.T...D.T.J.T.J...J.....T.T.T...T.T...D.T.J.T.J.T.D.....T.....T.....T.....T.J.D.J.T.....T.....T.....T.....T.J.D.J.T.....T.....T.....T.....T.J.D.J.T.J.J.J...J.J.J...J.J.J.J.J.J.J................................................................................................................................................................",
		scale: 1
	},
	{
		id: "sonic",
		name: "Emerald Hill Zone",
		speed: 2, 
		bpm: 139, 
		events: {
			preload: function() {
				loadSound("tutorial", "sounds/Getting it Done.mp3"); //135
				loadSound("faith", "sounds/The Friendly Faith Plate.mp3"); //120
				loadSound("sonic", "sounds/SonicInMidSim.wav"); //139
				loadSound("green", "sounds/GreenHill.wav"); //139
			}
		},
		characters: [
			["SonicAndTails", "Sonic"],
			["Tails", "Tails"]
		],
		noteTypes: {
			"J": function(time, prevStep, char) {
				if (char == "Tails") {
					customNote(time, "J", prevStep, 0, [0, 0, 0], true);
				} else {
					noteDefault(time, prevStep)
				}
			},
			"T": function(time, prevStep, char) {
				if (char == "Tails") {
					noteDefault(time, prevStep)
				} else {
					customNote(time, "T", prevStep, 0, [0, 0, 0], true);
				}
			},
			"D": function(time, prevStep) {
				noteDefault(time, prevStep);
				customNote(time, "D", prevStep, 0, [0, 0, 0], true);
			}
		},
		makeScript: {
			customChar: true,
			customBG: false,
			charPos: [],
			script: function(players, char, bgEl) {
				var player, player2;
				bgEl.play("idle");
				if (char == "Tails") {
					player = add([
						sprite("SonicAnd" + char + "green" + "1"),
						layer("JELLYBEAN"),
						"dances",
						pos(224, 20),
						scale(1)
					])
					player2 = add([
						sprite("SonicAnd" + char + "green" + "0"),
						layer("JELLYBEAN"),
						"dances",
						pos(20, 108),
						scale(1)
					])
				} else {
					player = add([
						sprite(char + "green" + "0"),
						layer("JELLYBEAN"),
						"dances",
						pos(20, 108),
						scale(1)
					])
					player2 = add([
						sprite(char + "green" + "1"),
						layer("JELLYBEAN"),
						"dances",
						pos(224, 20),
						scale(1)
					])
				}
				return {returnType: "character", main: player, empty: player2};
			}
		},
		chart: "..................................................J.J.J.J.J.JJ....J.J.J.J..J.........JJJJ.J.JJ.J..................T.T.T.T.T.TT....T...T.T..T........TTT.T.T.TT.T..................J.J.J.J.J.J.J.J.J...J...........J.J.J.J.J.JJ..J.................T.T.T.T.T.T.T.T.T...T...........T.T.T.T.T.TT..T...............J.....J.....J.J.J.JJ....T.TT........J.J.J.J.J.J.J.J...J.........T.....T.....T.T.T.TT....J.JJ....DD.D.............................................................",
		scale: 1
	},
]

export function noteDefault(time, prevStep) {
	add([
			rect(10, 50),
			pos(width(), 20),
			color(232, 3, 252),
			("note" + prevStep),
			"note",
			{
				created: time,
				type: "J",
				empty: false,
				normal: true
			}
	]);
}

export function customNote(time, letter, prevStep, w, colorArray, empty, funclol) {
	add([
		rect(w, 50),
		pos(width(), 20),
		colorArray ? color(colorArray[0], colorArray[1], colorArray[2]) : color(0, 0, 0),
		("note" + prevStep),
		"note",
		{
			created: time,
			type: letter,
			function: funclol,
			empty: empty,
			normal: funclol != undefined ? false : true
		}
	]);
}
