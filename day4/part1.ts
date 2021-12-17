import {getInputSplitByBlankLines} from "../common/inputUtils";

type BoardCell = {
    number: number,
    marked: boolean
}

export class Board {
    private played: number[] = [];
    private readonly cells: BoardCell[][];
    private done: boolean = false;

    constructor(config: string[]) {
        let cells: BoardCell[][] = [];
        for (let line of config) {
            cells.push(line.split(/\s+/)
                .filter(val => val.trim())
                .map(val => parseInt(val))
                .map(number => ({
                    number,
                    marked: false
                })));
        }
        this.cells = cells;
    }

    public play(number: number) {
        this.played.push(number);
        for (let [rowNum, cellRow] of this.cells.entries()) {
            for (let [colNum, cell] of cellRow.entries()) {
                if (cell.number === number) {
                    cell.marked = true;
                    this.done = this.checkDone(rowNum, colNum);
                }
            }
        }
    }

    private checkDone(row: number, col: number): boolean {
        const rowDone = this.cells[row].every(cell => cell.marked);
        return rowDone || this.cells.every(cellRow => cellRow[col].marked);
    }

    public isDone(): boolean {
        return this.done;
    }

    public getScore(): number {
        return this.played.slice(-1)[0] * this.cells.reduce(
            (boardUnmarkedTotal, row) => boardUnmarkedTotal + row.reduce(
                (rowUnmarkedTotal, cell) =>
                    !cell.marked ? rowUnmarkedTotal + cell.number : rowUnmarkedTotal
                , 0)
            , 0)
    }
}

export default function part1(): number {
    const [numbersString, ...boardConfigs] = getInputSplitByBlankLines(4);
    const numbers = numbersString.split(',').map(val => parseInt(val))
    const boards: Board[] = [];

    for (let boardConfig of boardConfigs) {
        boards.push(new Board(boardConfig.split('\n')))
    }

    for (let number of numbers) {
        for (let board of boards) {
            board.play(number);
            if (board.isDone()) {
                return board.getScore();
            }
        }
    }

    return -1;
}