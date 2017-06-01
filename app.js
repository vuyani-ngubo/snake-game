import Game from "./modules/game.js";

document.addEventListener("keydown", ({ key }) => {
	if (key === "ArrowUp") game.addToQueue("up");
	else if (key === "ArrowDown") game.addToQueue("down");
	else if (key === "ArrowLeft") game.addToQueue("left");
	else if (key === "ArrowRight") game.addToQueue("right");
	else if (key === " ") {
		if (game.isPaused) game.play();
		else game.pause();
	}
});

const game = new Game();

game.start();
