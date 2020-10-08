console.log("all is connected")


//###################################################
// 1st creating class for the individual squares on the grid
//

const eventListeners = {
	onePlayer: () => {					// will remove the second player div
		const $secondDiv = $('.player2Box')
		$secondDiv.remove()
	},
	twoPlayer: () => {

	},
	easy: () => {
		App.difficulty = 33;
	},
	hard: () => {
		App.difficulty = 66;
	},
	extreme: () => {
		App.difficulty = 132;
	},
	click: (tile) => {
		if (tile.hasClass('bomb')) {  // end game for player
			alert(`you hit a mine!`)
		}
	},
	start: () => {
		App.createNewGrid()
	},
	stop: () => {

	}
}

let grids1 = []
let grids2 = []
const App = {
	cols: 20,  // using cols and rows because i wanted to make it easy to edit but lets see how it plays out.
	rows: 20,
	difficulty: 33, // number of mines. want to implement this another way like percentage of the number of divs
	createNewGrid: (playBox, grid) => {
		const bombArray = Array(App.difficulty).fill('bomb')  //fill array with bombs
		const emptyArray = Array(App.cols*App.rows - App.difficulty).fill('clear')
		const gameArray = emptyArray.concat(bombArray)
		const shuffledArray = gameArray.sort(() => Math.random() - 0.5) // randomizes position of bombs in the shuffled array

		let j = 0
		let exy = 0
		for (let i = 0; i < App.cols*App.rows; i++) {

			//const $playOne = $('.player1Box')
  		//const $playTwo = $('.player2Box')	// EDIT
  		const tile = $('<div>').attr({			//sets up game for player one
  			x: exy,
				y: j,
  			class: shuffledArray[i]
  		}).appendTo(playBox)
  		grid.push(tile)
			j++
			if (j > 19) {
				j = 0
				exy++
			}

			tile.on("click", (it) => {
				eventListeners.click(tile)
			})
		}

		for (let i = 0; i < grid.length; i++) {

			const gridX = parseInt(grid[i].attr("x"))
			const gridY = parseInt(grid[i].attr("y"))
			const $topLeftEdge = $('div[y="0"][x="0"]')
			const $topRightEdge = $('div[y="19"][x="0"]')
			const $bottomLeftEdge = $('div[y="0"][x="19"]')
			const $topEdge = $(`div[y=${gridY}][x="0"]`)
			const $bottomEdge = $(`div[y=${gridY}][x="19"]`)
			const $rightEdge = $(`div[y="0"][x=${gridX}]`)
			const $leftEdge = $(`div[y="19"][x=${gridX}]`)

			const below = gridX + 1
			const above = gridX - 1
			const left = gridY - 1
			const right = gridY + 1
			let counter = 0

			if (grid[i].hasClass('clear')) {

				if(grid[i].is($topLeftEdge) && $('div[x="0"][y="1"]').hasClass("bomb")) {	 // top left edge work
					counter++
				}
				if(grid[i].is($topLeftEdge) && $('div[x="1"][y="1"]').hasClass("bomb")) {
					counter++
				}
				if(grid[i].is($topLeftEdge) && $('div[x="1"][y="0"]').hasClass("bomb")) {
					counter++
				}
				if (grid[i].is($topRightEdge) && $('div[x="0"][y="18"]').hasClass('bomb')) { // top right edge work
					counter++
				}
				if (grid[i].is($topRightEdge) && $('div[x="1"][y="18"]').hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topRightEdge) && $('div[x="0"][y="19"]').hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topEdge) && (!grid[i].is($topLeftEdge) || !grid[i].is($topRightEdge)) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {	//top edge work
					counter++
				}
				if (grid[i].is($topEdge) && (!grid[i].is($topLeftEdge) || !grid[i].is($topRightEdge)) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topEdge) && (!grid[i].is($topLeftEdge) || !grid[i].is($topRightEdge)) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topEdge) && (!grid[i].is($topLeftEdge) || !grid[i].is($topRightEdge)) && $(`div[x=${below}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topEdge) && (!grid[i].is($topLeftEdge) || !grid[i].is($topRightEdge)) && $(`div[x=${left}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if(grid[i].is($bottomEdge) && grid[i].is($leftEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass("bomb")) {  //bottom left edge work
					counter++
				}
				if(grid[i].is($bottomEdge) && grid[i].is($leftEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass("bomb")) {
					counter++
				}
				if(grid[i].is($bottomEdge) && grid[i].is($leftEdge) && $(`div[x=${above}][y=${right}]`).hasClass("bomb")) {
					counter++
				}
				if (grid[i].is($bottomEdge) && grid[i].is($rightEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {	// bottom right edge work
					counter++
				}
				if (grid[i].is($bottomEdge) && grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($bottomEdge) && grid[i].is($rightEdge) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($bottomEdge) && (!grid[i].is($leftEdge) || !grid[i].is($rightEdge)) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) { // bottom Edge work
					counter++
				}
				if (grid[i].is($bottomEdge) && (!grid[i].is($leftEdge) || !grid[i].is($rightEdge)) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($bottomEdge) && (!grid[i].is($leftEdge) || !grid[i].is($rightEdge)) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($bottomEdge) && (!grid[i].is($leftEdge) || !grid[i].is($rightEdge)) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($bottomEdge) && (!grid[i].is($leftEdge) || !grid[i].is($rightEdge)) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($rightEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) { // Right Edge work
					counter++
				}
				if (grid[i].is($rightEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($rightEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${below}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($rightEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($rightEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($leftEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) { // LEft Edge work
					counter++
				}
				if (grid[i].is($leftEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) { // square up one right one
					counter++
				}
				if (grid[i].is($leftEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${below}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($leftEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($leftEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) { // squares not on an edge -- Works perfect in first box but not second and other checkers are broken!?
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) { // square up one right one
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) {
					counter++
				}

				grid[i].attr('nearby', counter)

			}

		}

	},
}



$(() => {

	const $playOne = $('.player1Box')
	const $playTwo = $('.player2Box')
	App.createNewGrid($playOne, grids1)

	$("#1player").on('click', () => {
		eventListeners.onePlayer()
	})
	$("#2player").on('click', () => {
		App.createNewGrid($playTwo, grids2)
	})



})
