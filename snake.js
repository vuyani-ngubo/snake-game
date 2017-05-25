export default class Snake {
	constructor(xLimit, yLimit) {
		this.head = {
			x: xLimit / 2,
			y: yLimit / 2,
		};
		this.body = this.generateBody();
		this.history = [{ head: this.head, body: this.body }];
	}

	generateBody() {
		let { x, y } = { ...this.head };
		const body = [];
		for (let i = 0; i < 6; i++) {
			body.push({ x: x - (i + 1), y });
		}
		return body;
	}

	move({ x, y }) {
		let head = { ...this.head };
		let body = [...this.body];

		let prevSegment = { ...head };

		head = { x, y };
		body = body.map((segment) => {
			let temp = { ...prevSegment };
			prevSegment = segment;
			return temp;
		});

		this.head = head;
		this.body = body;
		this.history.push({ head, body });
	}

	grow() {
		const history = this.history;
		const historyLength = history.length;
		const body = history[historyLength - 1].body;
		const bodyLength = body.length;
		const pos = body[bodyLength - 1];

		this.body.push(pos);
	}

	shrink(pos) {}
}
