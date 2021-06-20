const COLORS = [`red`, `green`, `purple`, `blue`, `yellow`, `magenta`, `orange`];
let bottomTime = 0;

document.addEventListener("DOMContentLoaded", () => {
	const NEXTBOX = Array.from(document.querySelectorAll(`.placeholder div`));
	const boxes = Array.from(document.querySelectorAll(`main div`));
	const block = {
		col: COLORS[randNum(COLORS)],
		shapeId: randNum(SHAPETYPE),
		pos: 4,
		rot: 0,
		get shape() {
			return SHAPETYPE[this.shapeId][this.rot];
		},
	};
	const futureBlock = {
		shapeId: randNum(NEXTSHAPES),
		col: COLORS[randNum(COLORS)],
		get shape() {
			return NEXTSHAPES[this.shapeId];
		},
	};
	const scoreSystem = {
		score: 0,
		clearedLines: 0,
		lineScore: 10,
		end: true,
	};
	const interval = {
		time: 750,
		timerID: 0,
		stopper() {
			clearInterval(this.timerID);
		},
		timer() {
			this.stopper();
			this.timerID = setInterval(() => {
				main(block, boxes, futureBlock, NEXTBOX, interval, scoreSystem);
			}, this.time);
		},
	};
	document.querySelector(`audio`).volume = 0.1;

	document.addEventListener("keydown", (k) => {
		if (!scoreSystem.end) {
			if (k.key == "w" || k.key == "ArrowUp") rot(block, boxes);
			else if (k.key == "s" || k.key == "ArrowDown")
				main(block, boxes, futureBlock, NEXTBOX, interval, scoreSystem);
			else if (k.key == "a" || k.key == "ArrowLeft") left(block, boxes);
			else if (k.key == "d" || k.key == "ArrowRight") right(block, boxes);
		}
	});
	document.addEventListener("swiped-left", function (e) {
		/*console.log(e.target); // element that was swiped
		console.log(e.detail); // event data { dir: 'left', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }*/
		left(block, boxes);
	});
	document.addEventListener("swiped-right", function (e) {
		/*	console.log(e.target); // element that was swiped
		console.log(e.detail); // event data { dir: 'right', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }*/
		right(block, boxes);
	});
	document.addEventListener("swiped-up", function (e) {
		/*	console.log(e.target); // element that was swiped
		console.log(e.detail); // event data { dir: 'up', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }*/
		rot(block, boxes);
	});
	document.addEventListener("swiped-down", function (e) {
		/*console.log(e.target); // element that was swiped
		console.log(e.detail); // event data { dir: 'down', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }
		*/
		main(block, boxes, futureBlock, NEXTBOX, interval, scoreSystem);
	});
	document.querySelector(`#strt`).addEventListener("click", () => {
		document.querySelectorAll(`.pop-up`)[0].style.display = "none";
		scoreSystem.end = false;
		add(block, boxes);
		add(futureBlock, NEXTBOX);
		interval.timer();
		document.querySelector(`audio`).play();
	});
	document.querySelector(`#restrt`).addEventListener("click", () => {
		location.reload();
	});
});

function add({ shape, pos = 0, col }, boxes) {
	shape.forEach((index) => {
		const SHORT = boxes[pos + index];
		SHORT.classList.add(`drawn`);
		SHORT.style.backgroundColor = col;
	});
}
function rem({ shape, pos = 0 }, boxes) {
	shape.forEach((index) => {
		const SHORT = boxes[pos + index];
		SHORT.classList.remove(`drawn`);
		SHORT.style.backgroundColor = "";
	});
}

function down(block, boxes) {
	rem(block, boxes);
	block.pos += WIDTH;
	add(block, boxes);
}

function left(block, boxes) {
	const { pos, shape } = block;
	rem(block, boxes);
	const ISEDGE = shape.some((index) => [pos + index] % WIDTH === 0);
	if (!ISEDGE) block.pos--;
	if (shape.some((index) => boxes[pos + index].classList.contains(`taken`))) block.pos++;
	add(block, boxes);
}

function right(block, boxes) {
	const { pos, shape } = block;
	rem(block, boxes);
	const ISEDGE = shape.some((index) => [pos + index] % WIDTH === WIDTH - 1);
	if (!ISEDGE) block.pos++;
	if (shape.some((index) => boxes[pos + index].classList.contains(`taken`))) block.pos--;
	add(block, boxes);
}

function main(block, boxes, futureBlock, NEXTBOX, interval, scoreSystem) {
	const { shape, pos } = block;
	if (shape.some((index) => boxes[pos + index + WIDTH].classList.contains("taken"))) {
		if (++bottomTime == 3) {
			bottomTime = 0;
			const { shapeId, col } = futureBlock;
			interval.stopper();
			shape.forEach((index) => boxes[pos + index].classList.add(`taken`));
			rem(futureBlock, NEXTBOX);
			Object.assign(block, { shapeId: shapeId, col: col, pos: 4, rot: 0 });
			Object.assign(futureBlock, {
				shapeId: randNum(SHAPETYPE),
				col: COLORS[randNum(COLORS)],
			});
			scoreSystem.score++;
			add(block, boxes);
			add(futureBlock, NEXTBOX);
			remRow(boxes, scoreSystem, interval);
			document.querySelector(`#score`).innerHTML = scoreSystem.score;
			interval.timer();
			gameOver(block, boxes, scoreSystem, interval);
		}
	} else {
		bottomTime = 0;
		down(block, boxes);
	}
}
function gameOver({ pos, shape }, boxes, scoreSystem, interval) {
	if (shape.some((index) => boxes[pos + index].classList.contains("taken"))) {
		const { score } = scoreSystem;
		interval.stopper();
		scoreSystem.end = true;
		saveScore(score);
		writeHS(`#highscores`);
		document.querySelector(`#end`).style.display = "";
		document.querySelector(`audio`).pause();
	}
}

function remRow(boxes, scoreSystem, interval) {
	for (let i = 0; i < boxes.length - WIDTH; i += WIDTH) {
		const ROW = [...Array(WIDTH).keys()].map((j) => i + j);
		if (ROW.every((index) => boxes[index].classList.contains("taken"))) {
			const { score, lineScore, clearedLines } = scoreSystem;
			Object.assign(scoreSystem, {
				clearedLines: clearedLines + 1,
				score: score + lineScore,
			});
			console.log(scoreSystem.score);
			if ((clearedLines + 1) % 5 == 0 && interval.time > 150) {
				interval.time -= 100;
				scoreSystem.lineScore += 5;
			}
			ROW.forEach((index) => {
				boxes[index].className = "box";
				boxes[index].style.backgroundColor = "";
			});
			const squaresRemoved = boxes.splice(i, WIDTH);
			squaresRemoved.forEach((item) => boxes.unshift(item));
			boxes.forEach((cell) => document.querySelector(`main`).appendChild(cell));
		}
	}
}

function rot(block, boxes) {
	const { shapeId, rot } = block;
	rem(block, boxes);
	block.rot = rot + 1 == SHAPETYPE[shapeId].length ? 0 : rot + 1;
	checkRotpos(block);
	add(block, boxes);
}

function checkRotpos(block) {
	const { pos, shape } = block;
	if ((pos + 1) % WIDTH < 5 && shape.some((index) => (pos + index + 1) % WIDTH === 0)) {
		block.pos++;
		checkRotpos(block);
	} else if (pos % WIDTH > 5 && shape.some((index) => (pos + index) % WIDTH === 0)) {
		block.pos--;
		checkRotpos(block);
	}
}

function randNum(obj) {
	return Math.floor(Math.random() * obj.length);
}
