export default class InputParser {
  constructor(input) {
    this.input = input;
  }

  #parse(input) {
    return input.split('\n').filter((x) => x).map(this.#parseRow);
  }

  #parseRow = (row) => {
    const [rowStart, rowEnd] = row.split(':').map((x) => x.trim());
    const [winNumbers, yourNumbers] = rowEnd.split(' | ')
      .map((x) => x.trim())
      .map((x) => this.#parseNumbers(x));

    return {
      id: this.#parseCardId(rowStart),
      winNumbers,
      yourNumbers,
    };
  }

  #parseNumbers = (numbersString) => {
    return numbersString
      .split(' ')
      .filter((x) => x)
      .map((x) => parseInt(x, 10));
  }

  #parseCardId(rowStart) {
    const [, cardNumber] = rowStart.split(' ').filter((x) => x);

    return parseInt(cardNumber, 10);
  }

  render() {
    return this.#parse(this.input);
  }
}
