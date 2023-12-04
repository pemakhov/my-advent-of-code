import InputParser from './input-parser.mjs';
import INPUT from './input.mjs';
import CardProcessor from './part-1.mjs';
import CardCalculator from './part-2.mjs';

const inputParser = new InputParser(INPUT)
const data = inputParser.render();

const cardProcessor = new CardProcessor(data);
const totalPoints = cardProcessor.renderTotalPoints(data);

console.log({ totalPoints });

const cardCalculator = new CardCalculator(data);
const totalCards = cardCalculator.renderTotalCards(data);

console.log({ totalCards });
