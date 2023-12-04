export default class CardCalculator {
  #data;

  #counts;

  constructor(data) {
    this.#data = data;
    this.#counts = new Array(data.length).fill(1);
  }

  #getGuessedNumbers = ({ winNumbers, yourNumbers }) => yourNumbers.filter((n) => winNumbers.includes(n));

  #getCopyIncreases = ({ length }) => length;

  #addAll = ((acc, n) => acc + n);

  #process(increases) {
    for (let i = 0; i < this.#counts.length; i += 1) {
      for (let j = 0; j < increases[i]; j += 1) {
        if (!this.#counts[i + j + 1]) continue;

        this.#counts[i + j + 1] += this.#counts[i];
      }
    }
  }

  renderTotalCards() {
    const increases = this.#data
      .map(this.#getGuessedNumbers)
      .map(this.#getCopyIncreases);

    this.#process(increases);

    return this.#counts.reduce(this.#addAll, 0);
  }
}
