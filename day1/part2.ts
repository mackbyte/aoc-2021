import { getInputLines } from "../common/inputUtils";

export default function part1(): number {
    const lines = getInputLines(1);
    let previous: number = parseInt(lines[0]) + parseInt(lines[1]) + parseInt(lines[2]);
    let countIncreased: number = 0;

    for(let i = 1; i < lines.length - 2; i++) {
        let current = parseInt(lines[i]) + parseInt(lines[i+1]) + parseInt(lines[i+2]);
        if(current > previous) {
            countIncreased++;
        }
        previous = current;
    }

    return countIncreased;
}