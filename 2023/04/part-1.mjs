export default class CardProcessor {
  #data;

  constructor(data) {
    this.#data = data;
  }

  #getGuessedNumbers = ({ winNumbers, yourNumbers }) => yourNumbers.filter((n) => winNumbers.includes(n));

  #getPointsPerCard = ({ length }) => length ? 2 ** (length - 1) : 0;

  #addAll = ((acc, n) => acc + n);

  renderTotalPoints() {
    return this.#data
      .map(this.#getGuessedNumbers)
      .map(this.#getPointsPerCard)
      .reduce(this.#addAll, 0);
  }
}
