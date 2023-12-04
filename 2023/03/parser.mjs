export default class Parser {
  constructor(data) {
    this.data = this.parse(data);
  }

  parse(data) {
    return data.split('\n')
      .map((row) => row.split(''));
  }

  render() {
    return this.data;
  }
}
