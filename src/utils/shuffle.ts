/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffle(a: any[]) {
	for (let i = a.length - 1; i > 0; i--) {

		//Find a random index between 0 <=randomIndex < i
		let randomIndex = Math.floor(Math.random() * (i + 1));

		//Swap values at postions i and randomIndex
		let temp = a[i];
		a[i] = a[randomIndex];
		a[randomIndex] = temp;
	}
	return a;
}
