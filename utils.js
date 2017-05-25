export function randomPos(xLimit, yLimit) {
	return {
		x: Math.floor(Math.random() * xLimit),
		y: Math.floor(Math.random() * yLimit),
	};
}

export const displacementDict = {
	up: { axis: "y", magnitude: -1 },
	down: { axis: "y", magnitude: 1 },
	right: { axis: "x", magnitude: 1 },
	left: { axis: "x", magnitude: -1 },
};
