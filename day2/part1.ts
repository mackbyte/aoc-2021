import {getInputLines} from "../common/inputUtils";

export default function part1(): number {
    const lines = getInputLines(2);
    let horizontal = 0;
    let depth = 0;

    for(let line of lines) {
        let [direction, distanceText] = line.split(' ');
        let distance = parseInt(distanceText);
        if(direction === 'forward') {
            horizontal += distance;
        } else if(direction === 'up') {
            depth -= distance;
        } else if(direction === 'down') {
            depth += distance;
        }
    }

    return horizontal * depth;
}