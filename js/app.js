console.log("all is connected")


//###################################################
// 1st creating class for the individual squares on the grid
//
// class GameBox {
// 	constructor () {
// 		this.mine = true;
// 		this.revealed = true;
// 		this.x = 0;
// 		this.y = 0;
//
// 	}
// }



const UI = {
	creat2ndDiv: () => {},
	gameResults: () => {},
}


$(() => {

	let squares = []

	const App = {
		gameOver: false,
		squares: [],
		bombAmount: 20,
		createNewGrid: (size) => {
			const bombArray = Array(App.bombAmount).fill('bomb')
			const emptyArray = Array(size - App.bombAmount).fill('clear')
			const gameArray = emptyArray.concat(bombArray)
			const shuffledArray = gameArray.sort(() => Math.random() -0.5)

			for (let i = 0; i < size; i++) {
				const tile = $('<div>').attr({
					id: i,
					class: shuffledArray[i]
				}).appendTo(".game-box")
				squares.push(tile)
			 //$('<div>').addClass("tile").appendTo(".game-box")
			}

		},

	}
App.createNewGrid(50)

})
