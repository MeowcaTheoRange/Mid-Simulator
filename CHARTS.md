# Before You Start

You need:

- Some JS knowledge
- Some knowledge of the KaboomJS engine
- A static file server, for your images and music. That, or download the game locally and place the files into there.
- 2 700 x 400 (or similarly scaled) sprites for your background and foreground.
  - 1.333x: 525 x 300
  - 2x: 350 x 200
  - 4x: 175 x 100
  - 8x: 87 x 50
  - The names of the files:
    - Background: `"[Your Song ID]BG0"` (e.x. `"liveandlearnBG0"`)
    - Foreground: `"[Your Song ID]FG0"` (e.x. `"liveandlearnFG0"`)
- Spritesheets that are any size, for your character
  - Spritesheet animations:
    - `idle: At least 4 images for the animation that will be played every beat`
    - `talk: At least 1 image for the animation that will be played when a note is successfully hit`
    - `miss: At least 3 images for the animation that will be played when your player misses`
  - The names of the file:
    - Character file: `"[Your Character ID][Your Song ID]"` (e.x. `"Shadowliveandlearn"`)

# How To Make A Chart File

Add this code before the last **square end bracket (`]`)** near the end of your `charts.js` file.

```js
	{
		id: "", // REQUIRED! This ID will also be used to access your song name.
		name: "", // Required
		speed: 3, // Required
		bpm: 120, // Required
		events: {
			preload: function() { // Required, but you can simply just not modify it if your chart requires no extra assets.
			},
			onBeat: function(beat) { // Optional
			},
		},
		characters: [
			["id", "name"] // Required, other characters are optional
		],
		noteTypes: {
			"J": noteDefault, //  Required, other note types are optional
		},
		makeScript: {
			customChar: false,
			customBG: false,
			script: function() { // Required, but if customChar and customBG are false, this doesn't require modification
			}
		},
		chart: "...", // Required, duh
		scale: 1 // Required
	},
```

## File basics:

```js
	{
		id: "",
		name: "",
		speed: 3,
		bpm: 120,
		...
    
		...
		chart: "...",
		scale: 1
	},
```

The `id` field should contain the simple name of your song.

For example, a song name of `"Live And Learn"` can be `"liveandlearn"`, `"lal"`, or `"learn"`.

```js
id: "liveandlearn"
```

Next, the `name` field should be the main, detailed name of your song. This field is not case-sensitive, technically, as the font the text is displayed in uses ALL CAPS.
However, you should still be wary about your grammar.

For example, `name` can be `"Live And Learn"`. Please exclude the artist of the song in the title unless you *need* it for recognition or credit.

```js
name: "Live And Learn"
```

Now, let's move on to the `speed` field, which is basically the time that notes go from Right Stage to your hitmarker.

For example, `5` means it will take 5 seconds for notes to go from right to left. `1` means it will take 1 second for notes to go.

```js
speed: 5
```

Let's do this quickly, the `bpm` field will be the song tempo in beats per minute. 

For example, `172` is the BPM of `Live And Learn`.

```js
bpm: 172
```

The `chart` field is important, and this would be relatively easy to make in a normal text editor. Each individual character in this string is a step (1/4 of a beat).
However, it's better to use the built-in Chart Editor, which can be accessed by pressing `~` while the song you want to chart is selected in the song picker menu. 

After you do so, press the EXPORT button on the chart editor, and then go to your browser's inspector by pressing eiher `F12` or `CTRL-SHIFT-I`.

Copy the newly-created string into the `chart` field, and you're finished with that.

```js
chart: "..."
```

Alright, the `scale` field is just the scale of your sprites. If you have failed to properly re-scale your sprites (while also using the default settings for characters and backgrounds.), then you can change this field.

## Complicated stuff that requires code

```js
		events: {
			preload: function() {
			},
			onBeat: function(beat) {
			},
		},
		characters: [
			["id", "name"]
		],
		noteTypes: {
			"J": noteDefault,
		},
		makeScript: {
			customChar: false,
			customBG: false,
			script: function() {
			}
		},
```

`events.preload()` will be ran before the game starts. This function can be used to load all of your current chart's required assets.

`events.onBeat(beat)` will be ran every beat of your song. The provided variable `beat` will tell you the current beat of the song.

`characters` is a list of all of the playable characters your player will be able to use. Nore really coding-related, but you will need this if you want to give your player some character variety.

The array goes like this: `[ "ID Of Character", "Name Of Character" ]`
If you're not using custom character definitions (see below), you also have 2 more values to play with:
`[ "ID", "Name", X Pos, Y Pos ]`. These define the X and Y position the character will be placed at.

```js
	[ "sonic", "Sonic", 20, 108 ]
```

`noteTypes` is a list of strings that will define different letters of the chart as notes. 

  `noteTypes.[anonymous](time, letter, prevStep)` is a function that's good for defining custom notes.
	The default note is labelled as `noteDefault`, and can be used if you want a specific character to make a default note.
	Here's a good use, to define a note that will be empty and full, for making something of a duet:
  ```js
function(time, letter, prevStep) {
	noteDefault(time, letter, prevStep); //The aformentioned default note value, with all of the variables being passed into it.
	add([
		rect(0, 50), //	Some visibility comp is required in order for the detection system to work. If you want your note to be invisible, set no color and make your rect's width 0.
		pos(width(), 20), // Pos comp is required. Simply Kaboom rules.
		("note" + prevStep), // Required for all notes, uses variable prevStep.
		"note", // Required for all notes
		{
			created: time, // Required, uses variable time.
			empty: true, // Determines whether the note can be pressed by the player or not.
			normal: true, // If true, this note will not pass a function.
			function: undefined, // A function that will be ran when the note is hit, if the note is not normal.
			type: letter // Required, uses variable letter.
		}
	]);
}
  ```
  `time` will return the current time of the song in milliseconds.
	
  `letter` will return the letter that made this note.
	
  `prevStep` will return the step that this note was made on.
	
`makeScript.script(players, char, bgEl)` will be ran when your chart is loaded. It can be used to load a custom layout by setting `makeScript.customChar` and/or `makeScript.customBG` to true.
Here's a good use, to load a custom character layout:
```js
			script: function(players, char, bgEl) {
				var player, player2;
				player = add([
					sprite("shadow"),
					"dances", //required for all player characters
					pos(224, 108),
					scale(1) // if using a custom layout, use this instead of the chart's provided scale variable
				])
				player2 = add([
					sprite("sonic"),
					"dances",
					pos(20, 108),
					scale(1)
				])
				return {returnType: "character", main: player, empty: player2};
				/*
					You'll need to return your code after making some character changes, so make sure you use this.
					returnType only has the value "character", which allows the use of these two variables:
						- main, a variable for defining the character the player will use (GameObj)
						- empty, a variable for defining the character the empty note bot will use to display opposing animation (GameObj)
				*/
			}
```

The included variables can be used as such:

`players`: Will only really mean anything if `makeScript.customChar` is false. It is an object array of the player positions.
	e.x. `{ main: bean<GameObj>, empty: shadowthehedge<GameObj> }`
	
`char`: The ID of the currently selected character. Good for making differing stages for different characters.

`bgEl`: Will only really mean anything if `makeScript.customBG` is false. It is simply the current background GameObj.
