import { getInputLines } from "../common/inputUtils";

export default function part1(): number {
    const lines = getInputLines(1);
    let previous: number = parseInt(lines.shift()!);
    let countIncreased: number = 0;

    for (let line of lines) {
        let current = parseInt(line);
        if(current > previous) {
            countIncreased++;
        }
        previous = current;
    }

    return countIncreased;
}