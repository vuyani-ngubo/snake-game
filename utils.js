export function randomPos(xLimit, yLimit) {
	return {
		x: Math.floor(Math.random() * xLimit),
		y: Math.floor(Math.random() * yLimit),
	};
}
