import {getInputLines} from "../common/inputUtils";

export default function part2(): number {
    const lines = getInputLines(2);
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    for(let line of lines) {
        let [direction, distanceText] = line.split(' ');
        let distance = parseInt(distanceText);
        if(direction === 'forward') {
            horizontal += distance;
            depth += aim * distance;
        } else if(direction === 'up') {
            aim -= distance;
        } else if(direction === 'down') {
            aim += distance;
        }
    }

    return horizontal * depth;
}