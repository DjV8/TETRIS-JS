const NEXTWIDTH = 4;
const WIDTH = 10;

const BOX = [[0, 1, WIDTH, WIDTH + 1]];
const LINE = [
	[0, WIDTH, WIDTH * 2, WIDTH * 3],
	[0, 1, 2, 3],
];
const ROCKET = [
	[1, WIDTH, WIDTH + 1, WIDTH + 2],
	[1, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
	[WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
	[1, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
];
const PIPE = [
	[0, WIDTH, WIDTH + 1, WIDTH + 2],
	[1, 2, WIDTH + 1, WIDTH * 2 + 1],
	[WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 2],
	[1, WIDTH + 1, WIDTH * 2, WIDTH * 2 + 1],
];
const REVPIPE = [
	[2, WIDTH, WIDTH + 1, WIDTH + 2],
	[1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 2 + 2],
	[WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2],
	[0, 1, WIDTH + 1, WIDTH * 2 + 1],
];
const STAIRS = [
	[1, WIDTH, WIDTH + 1, WIDTH * 2],
	[WIDTH, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 2 + 2],
];
const REVSTAIRS = [
	[0, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
	[WIDTH + 1, WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1],
];
const SHAPETYPE = [BOX, LINE, ROCKET, PIPE, REVPIPE, STAIRS, REVSTAIRS];
const NEXTSHAPES = [
	[0, 1, NEXTWIDTH, NEXTWIDTH + 1],
	[0, 1, 2, 3],
	[1, NEXTWIDTH, NEXTWIDTH + 1, NEXTWIDTH + 2],
	[0, NEXTWIDTH, NEXTWIDTH + 1, NEXTWIDTH + 2],
	[2, NEXTWIDTH, NEXTWIDTH + 1, NEXTWIDTH + 2],
	[0, 1, NEXTWIDTH + 1, NEXTWIDTH + 2],
	[1, 2, NEXTWIDTH, NEXTWIDTH + 1],
];
