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
		if (App.gameOver) return
		if (tile.hasClass('checked') || tile.hasClass('flag')) return
		if (tile.hasClass('bomb')) {  // end game for player
			alert(`you hit a mine!`)
		} else {
			let total = tile.attr('nearby')
			if (total != 0) {
				tile.addClass('checked')
				tile.html(total)
				return
			}
			tile.addClass('checked')
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
	difficulty: 33,// number of mines. want to implement this another way like percentage of the number of divs
	gameOver: false,
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
			const gridXx = grid[i].attr("x")
			const gridYy = grid[i].attr("y")
			const $topLeftEdge = $('div[y="0"][x="0"]')
			const $topRightEdge = $('div[y="19"][x="0"]')
			const $bottomLeftEdge = $('div[y="0"][x="19"]')
			const $topEdge = $(`div[x="0"][y=${gridYy}]`)
			const $bottomEdge = $(`div[x="19"][y=${gridYy}]`)
			const $rightEdge = $(`div[x=${gridXx}][y="19"]`)
			const $leftEdge = $(`div[x=${gridXx}][y="0"]`)

			const below = gridX + 1
			const above = gridX - 1
			const left = gridY - 1
			const right = gridY + 1
			let counter = 0

			if (grid[i].hasClass('clear')) {

				if(grid[i].is($topEdge) && grid[i].is($leftEdge) && $(`div[x=${gridXx}][y=${right}]`).hasClass("bomb")) {	 // top left edge work
					counter++
				}
				if(grid[i].is($topEdge) && grid[i].is($leftEdge) && $(`div[x=${below}][y=${right}]`).hasClass("bomb")) {
					counter++
				}
				if(grid[i].is($topEdge) && grid[i].is($leftEdge) && $(`div[x=${below}][y=${gridYy}]`).hasClass("bomb")) {
					counter++
				}
				if (grid[i].is($topEdge) && grid[i].is($rightEdge) && $(`div[x=${gridXx}][y=${left}]`).hasClass('bomb')) { // top right edge work
					counter++
				}
				if (grid[i].is($topEdge) && grid[i].is($rightEdge) && $(`div[x=${below}][y=${gridYy}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topEdge) && grid[i].is($rightEdge) && $(`div[x=${below}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {	//top edge work
					counter++
				}
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${below}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${left}][y=${right}]`).hasClass('bomb')) {
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
				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) { // bottom Edge work
					counter++
				}
				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {
					counter++
				}


				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) { // Right Edge work
					counter++
				}
				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${below}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {
					counter++
				}


				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) { // LEft Edge work
					counter++
				}
				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) { // square up one right one
					counter++
				}
				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${right}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {
					counter++
				}
				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {
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
	$playTwo.remove()
	App.createNewGrid($playOne, grids1)

	$("#1player").on('click', () => {
		eventListeners.onePlayer()
	})
	$("#2player").on('click', () => {
		$('.game-box').append($playTwo)
		App.createNewGrid($playTwo, grids2)
	})



})
