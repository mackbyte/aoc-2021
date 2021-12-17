import {getInputSplitByBlankLines} from "../common/inputUtils";
import {Board} from "./part1";

export default function part2(): number {
    const [numbersString, ...boardConfigs] = getInputSplitByBlankLines(4);
    const numbers = numbersString.split(',').map(val => parseInt(val))
    let boards: Board[] = [];

    for (let boardConfig of boardConfigs) {
        boards.push(new Board(boardConfig.split('\n')))
    }

    let lastBoard: Board;

    for (let number of numbers) {
        for (let i = boards.length-1; i >= 0; i--) {
            let board = boards[i];
            board.play(number);
            if (board.isDone()) {
                lastBoard = board;
                boards = [
                    ...boards.slice(0, i),
                    ...boards.slice(i+1)
                ]
            }
        }
    }

    return lastBoard!.getScore();
}