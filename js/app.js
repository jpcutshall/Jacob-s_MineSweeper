console.log("all is connected")

$(() => {
const eventListeners = {
	onePlayer: () => {
		App.createNewGrid($playOne, grids1, tile1)
	},

	twoPlayer: () => {    // TWO PLAYER DOES NOT WORK - NOT WRITTEN RIGHT FOR IT
		$('.game-box').append($playTwo)
		App.createNewGrid($playTwo, grids2, tile2)
	},

	//set game difficulty to easy-default
	easy: () => {
		App.difficulty = 40;
		const $settings = $("#settings")
		if ($settings.text().includes("-Hard Difficulty") || $settings.text().includes("-Extreme Difficulty")) {
			$settings.text('Settings:-Easy Difficulty')
		} else {
			$("#settings").append('-Easy Difficulty')
		}
	},

	//set game difficulty to HARD
	hard: () => {
		App.difficulty = 66;
		const $settings = $("#settings")
		if ($settings.text().includes("-Easy Difficulty") || $settings.text().includes("-Extreme Difficulty")) {
			$settings.text('Settings:-Hard Difficulty')
		} else {
			$("#settings").append('-Hard Difficulty')
		}
	},

	//set game difficulty to EXTREME
	extreme: () => {
		App.difficulty = 132;
		const $settings = $("#settings")
		if ($settings.text().includes("-Easy Difficulty") || $settings.text().includes("-Hard Difficulty")) {
			$settings.text('Settings:-Extreme Difficulty')
		} else {
			$("#settings").append('-Extreme Difficulty')
		}
	},

	addFlag: (tile, square) => {      // called when right clicked
		if (App.isGameOver) return
		if (!tile.hasClass('checked') && (App.flags <= App.difficulty)) {
			if (!tile.hasClass('flag')) {
				tile.addClass('flag').text('🚩')
				App.flags++
				App.gameWin(square)
			} else {
				tile.removeClass('flag').text('')
				App.flags--
			}
		}
	},

	click: (tile, grid) => {
		let x = tile.attr("x")
		let y = tile.attr("y")
		if (App.isGameOver) return
		if (tile.hasClass('checked') || tile.hasClass('flag')) return
		if (tile.hasClass('bomb')) {  // end game for player
			App.gameOver(tile, grid)
		} else {
			let total = tile.attr('nearby')
			if (total != 0) {
				tile.addClass('checked')
				tile.html(total)
				return
			}
			App.checkTile(tile, x, y)

		}
		tile.addClass('checked')
	},

	reset: () => {
		App.flags = 0
		App.isGameOver = false
		grids1 = []
		$playOne.empty()
	}
}


const App = {
	cols: 20,  // using cols and rows because i wanted to make it easy to edit but lets see how it plays out.
	rows: 20,
	difficulty: 40, // number of mines. want to implement this another way like percentage of the number of divs
	flags: 0,
	isGameWin: false,
	isGameOver: false,

	gameWin: (square) => {
		let matches = 0
		for (let i = 0; i < grids1.length; i++) {
		 if (grids1[i].hasClass('flag') && grids1[i].hasClass('bomb')) {
		 	matches++
		 }

		}
		if (matches === App.difficulty) {
		 if (App.difficulty === 40) {
			 alert("YOU BEAT MY GAME ON EASY! BUT CAN YOU HANDLE HARD?")
		 }
		 if (App.difficulty === 66) {
			 alert("IMPRESSIVE! YOU BEAT MY GAME ON HARD! BUT ARE YOU GOOD ENOUGH FOR EXTREME?")
		 }
		 if(App.difficulty === 132){
			 alert('GG YOU SUPERIOR')
		 }
		}
	},

	gameOver: (tile, square) => {
		console.log('Game is lost')
		App.isGameOver = true

		square.forEach( (tile) => {
			if (tile.hasClass('bomb')) {
				tile.text('📍').addClass('checked')
			}
		})

		alert("YOU HIT A MINE! ALL IS LOST!")

	},

	checkTile: (square, x, y) => { // checking tiles nearby after click
		const gridX = parseInt(square.attr("x"))
		const gridY = parseInt(square.attr("y"))
		const gridXx = square.attr("x")
		const gridYy = square.attr("y")
		const $topEdge = $(`div[x="0"][y=${gridYy}]`) // code breaks if i change to just gridY why is gridYy needed
		const $bottomEdge = $(`div[x="19"][y=${gridYy}]`)
		const $rightEdge = $(`div[x=${gridXx}][y="19"]`)
		const $leftEdge = $(`div[x=${gridXx}][y="0"]`)
		const below = gridX + 1
		const above = gridX - 1
		const left = gridY - 1
		const right = gridY + 1

		setTimeout(() => {
			if(gridX >= 0 && gridX <= 19 && gridY >= 0 && gridY <= 19){   // ANY SQUARE   -- THIS IS GOOD -- think i can implement this with the numbering of mines near the square
				const $newLeft = $(`div[x=${gridX}][y=${left}]`)
				const $newRight = $(`div[x=${gridX}][y=${right}]`)
				const $newUp = $(`div[x=${above}][y=${gridY}]`)
				const $newDown = $(`div[x=${below}][y=${gridY}]`)
				eventListeners.click($newLeft)
				eventListeners.click($newRight)
				eventListeners.click($newUp)
				eventListeners.click($newDown)

			}
		}, 50)

	},

	createNewGrid: (playBox, grid) => {
		const bombArray = Array(App.difficulty).fill('bomb')  //fill array with bombs
		const emptyArray = Array(App.cols*App.rows - App.difficulty).fill('clear')
		const gameArray = emptyArray.concat(bombArray)
		const shuffledArray = gameArray.sort(() => Math.random() - 0.5) // randomizes position of bombs in the shuffled array

		let j = 0
		let exy = 0
		for (let i = 0; i < App.cols*App.rows; i++) {

  		const tile = $('<div>').attr({			//sets up game grid
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

			tile.on("click", () => {
				eventListeners.click(tile, grid)
			})

			tile.on("contextmenu", () => {
				eventListeners.addFlag(tile, grid)
			})

		}

		for (let i = 0; i < grid.length; i++) {  // checks nearby boxes for mines and counts

			const gridX = parseInt(grid[i].attr("x"))
			const gridY = parseInt(grid[i].attr("y"))
			const gridXx = grid[i].attr("x")
			const gridYy = grid[i].attr("y")
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

				if (grid[i].is($topEdge) && grid[i].is($leftEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass("bomb")) {counter++} // top Left CheckING
				if (grid[i].is($topEdge) && grid[i].is($leftEdge) && $(`div[x=${below}][y=${right}]`).hasClass("bomb")) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($topEdge) && grid[i].is($leftEdge) && $(`div[x=${below}][y=${gridY}]`).hasClass("bomb")) {counter++}
				 // ^^^^^^^^^^^^^^^^
				if (grid[i].is($topEdge) && grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {counter++} // top right checking
				if (grid[i].is($topEdge) && grid[i].is($rightEdge) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($topEdge) && grid[i].is($rightEdge) && $(`div[x=${below}][y=${left}]`).hasClass('bomb')) {counter++}
				 // ^^^^^^^^^^^^^^^^
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {counter++} // top Edge checking
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${below}][y=${right}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($topEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${below}][y=${left}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^


				if (grid[i].is($bottomEdge) && grid[i].is($leftEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass("bomb")) {counter++} // bottom left checking
				if (grid[i].is($bottomEdge) && grid[i].is($leftEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass("bomb")) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($bottomEdge) && grid[i].is($leftEdge) && $(`div[x=${above}][y=${right}]`).hasClass("bomb")) {counter++} // ^^^^^^^^^^^^^^^^

				if (grid[i].is($bottomEdge) && grid[i].is($rightEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {counter++} // bottom right checking
				if (grid[i].is($bottomEdge) && grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($bottomEdge) && grid[i].is($rightEdge) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^

				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {counter++} // bottom row checking
				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {counter++}// ^^^^^^^^^^^^^^^^
				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($bottomEdge) && !grid[i].is($leftEdge) && !grid[i].is($rightEdge) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^


				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {counter++} // right edge checking
				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${below}][y=${left}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($rightEdge) && (!grid[i].is($bottomEdge) && !grid[i].is($topEdge)) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {counter++}


				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) {counter++} // left edge checking
				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${right}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^
				if (grid[i].is($leftEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {counter++} // ^^^^^^^^^^^^^^^^



				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${gridY}]`).hasClass('bomb')) {counter++}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${gridY}]`).hasClass('bomb')) {counter++}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${left}]`).hasClass('bomb')) {counter++}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${above}][y=${right}]`).hasClass('bomb')) {counter++}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${left}]`).hasClass('bomb')) {counter++}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${below}][y=${right}]`).hasClass('bomb')) {counter++}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${gridX}][y=${left}]`).hasClass('bomb')) {counter++}
				if (!grid[i].is($leftEdge) && !grid[i].is($rightEdge) && !grid[i].is($topEdge) && !grid[i].is($bottomEdge) && $(`div[x=${gridX}][y=${right}]`).hasClass('bomb')) {counter++}

				grid[i].attr('nearby', counter)

			}

		}

	},

}





	let grids1 = []
	let grids2 = []
	let tile1 = $
	let tile2 = $
	const $playOne = $('.player1Box')
	const $playTwo = $('.player2Box')
	$playTwo.remove()



 //######## BUTTONS ON PAGE ################
	$("#oneplayer").on('click', () => {
		eventListeners.onePlayer()
	})

	$("#twoplayer").on('click', () => {  //PLAYER 2 DOES NOT WORK
		//eventListeners.twoPlayer()
	})

	$("#easyGame").on('click', () => {
		eventListeners.easy()
		console.log(App.difficulty)
	})

	$("#hardGame").on('click', () => {
		eventListeners.hard()
		console.log(App.difficulty)
	})

	$("#extremeGame").on('click', () => {
		eventListeners.extreme()
		console.log(App.difficulty)
	})

	$("#reset").on('click', () => {
		eventListeners.reset()
	})
 ////######## BUTTONS ON PAGE ################





})
