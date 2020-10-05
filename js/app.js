console.log("all is connected")


const App = {
	gameOver: false,
	createNewGrid: (size) => {
		for (let i = 0; i < size; i++) {
		 for (let j = 0; j < size; j++) {
		  $('<div>').addClass("tile").appendTo(".game-box")
		 }
		}
	},

}

const UI = {
	creat2ndDiv: () => {},
	gameResults: () => {},
}


$(() => {
	App.createNewGrid(20)
})
