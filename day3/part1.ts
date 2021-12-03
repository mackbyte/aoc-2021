import {getInputLines} from "../common/inputUtils";

type Counts = {
    [position: number]: {
        [digit: string]: number,
    }
}

export default function part1(): number {
    const lines = getInputLines(3);
    let counts: Counts = {};

    for(let i = 0; i < lines[0].length; i++) {
        counts[i] = {"0": 0, "1": 0}
    }

    for (let line of lines) {
        for (let [position, digit] of line.split('').entries()) {
            counts[position][digit]++;
        }
    }

    let gamma = '';
    let epsilon = '';
    for(let count of Object.values(counts)) {
        gamma += count['0'] > count['1'] ? '0' : '1';
        epsilon += count['0'] < count['1'] ? '0' : '1';
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}