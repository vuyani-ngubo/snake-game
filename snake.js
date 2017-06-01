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

		this.history.push({ head: this.head, body: this.body });
		this.head = head;
		this.body = body;
	}

	grow() {
		const head = { ...this.head };
		const body = [...this.body];

		const history = this.history;
		const historyLength = history.length;
		const lastBody = history[historyLength - 1].body;
		const bodyLength = body.length;
		const pos = lastBody[bodyLength - 1];

		body.push(pos);

		this.history.push({ head: this.head, body: this.body });
		this.head = head;
		this.body = body;
	}

	shrink(index) {
		const head = { ...this.head };
		const body = this.body.filter((segment, i) => i < index);

		this.history.push({ head: this.head, body: this.body });
		this.head = head;
		this.body = body;
	}
}
