console.log("all is connected")


//###################################################
// 1st creating class for the individual squares on the grid
//



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
				if (grid[i].is($leftEdge) && (!grid[i].is($topEdge) || !grid[i].is($bottomEdge)) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) {
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
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) { // squares not on an edge
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {
					counter++
				}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) {
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
	// small: () => {
	// 	App.rows = 8;
	// 	App.cols = 8;
	// },
	// medium: () => {
	// 	App.rows = 12;
	// 	App.cols = 12;
	// },
	// large: () => {
	// 	App.rows = 16;
	// 	App.cols = 16;
	// },
	start: () => {
		App.createNewGrid()
	},
	stop: () => {

	}
}

$(() => {

	const $playOne = $('.player1Box')
	const $playTwo = $('.player2Box')
	App.createNewGrid($playOne, grids1)
	App.createNewGrid($playTwo, grids1)



})
// $(() => {
//
//
//
// 	const App = {
// 		gameOver: false,
// 		squares: [],
// 		bombAmount: 10,
// 		width: 10,
// 		flags: 0,
//
// 		createNewGrid: () => {
// 			const bombArray = Array(App.bombAmount).fill('bomb')  //fill array with bombs
// 			const emptyArray = Array(App.width*App.width - App.bombAmount).fill('clear')
// 			const gameArray = emptyArray.concat(bombArray)
// 			const shuffledArray = gameArray.sort(() => Math.random() -0.5) // randomizes position of bobms in the shuffles array
//
// 			for (let i = 0; i < App.width*App.width; i++) {			// creates individual tile divs and appends them to squares array
// 				const tile = $('<div>').attr({
// 					id: i,
// 					class: shuffledArray[i]
// 				}).appendTo(".game-box")
// 				App.squares.push(tile)
//
// 			}
//
//
// 			for (let i = 0; i < App.squares.length; i++) { // adding number values to squares
//       let total = 0
//       const isLeftEdge = (i % App.width === 0)
//       const isRightEdge = (i % App.width === App.width - 1)
//
//       if (App.squares[i].hasClass('clear')) {
//         if (i > 0 && !isLeftEdge && App.squares[i - 1].hasClass('bomb')) total ++
// 				if (i > App.width - 1 && !isRightEdge && App.squares[i +1 - App.width].hasClass('bomb')) total ++
//         if (i > App.width && App.squares[i - App.width].hasClass('bomb')) total ++
//         if (i > App.width + 1 && !isLeftEdge && App.squares[i -1 - App.width].hasClass('bomb')) total ++
//         if (i < App.width * App.width - 2 && !isRightEdge && App.squares[i +1].hasClass('bomb')) total ++
//         if (i < App.width * App.width - App.width && !isLeftEdge && App.squares[i -1 + App.width].hasClass('bomb')) total ++
//         if (i < App.width * App.width - App.width - 2 && !isRightEdge && App.squares[i +1 + App.width].hasClass('bomb')) total ++
//         if (i < App.width * App.width - App.width - 1 && App.squares[i + App.width].hasClass('bomb')) total ++
//         App.squares[i].attr('data', total)
//       }
//     }
//
// 		},
//
//
// 	}
// App.createNewGrid(198)
//
// })
