function saveScore(s) {
	let c = document.cookie.slice(4, -1);
	let exp = new Date();
	exp.setFullYear(exp.getFullYear() + 1);
	if (!c) {
		document.cookie = `HS=[${s},0,0,0];expires=${exp}`;
	} else {
		let HS = c.split(',');
		for (let i = 0; i < HS.length; i++) if (s != 0 && s > HS[i]) [s, HS[i]] = [HS[i], s];
		document.cookie = `HS=[${HS[0]},${HS[1]},${HS[2]},${HS[3]}];expires=${exp}`;
	}
}
function writeHS(id) {
	let HS = document.cookie.slice(4, -1).split(',');
	let text = '';
	HS.forEach((H) => {
		text += `<li>${H}</li>`;
	});
	document.querySelector(id).innerHTML = text;
}
