import {getInputLines} from "../common/inputUtils";
import {Counts} from "./part1";

const getCountsForCandidates = (candidates: string[]): Counts => {
    let counts: Counts = {};

    for(let i = 0; i < candidates[0].length; i++) {
        counts[i] = {"0": 0, "1": 0}
    }

    for (let line of candidates) {
        for (let [position, digit] of line.split('').entries()) {
            counts[position][digit]++;
        }
    }

    return counts;
}

export default function part2(): number {
    const lines = getInputLines(3);
    const digits = lines[0].length;
    let o2GenRatingCandidates = [...lines];
    let c02ScrubberRatingCandidates = [...lines];
    let o2GenRating: string | null = null;
    let c02ScrubberRating: string | null = null;

    for(let i = 0; i < digits; i++) {
        let o2Counts = getCountsForCandidates(o2GenRatingCandidates);
        let c02Counts = getCountsForCandidates(c02ScrubberRatingCandidates);

        let o2BitCriteria = o2Counts[i]['1'] >= o2Counts[i]['0'] ? '1' : '0';
        let c02BitCriteria = c02Counts[i]['0'] <= c02Counts[i]['1'] ? '0' : '1';

        if(!o2GenRating) {
            o2GenRatingCandidates = o2GenRatingCandidates.filter(candidate => candidate.charAt(i) === o2BitCriteria);
            if(o2GenRatingCandidates.length === 1) {
                o2GenRating = o2GenRatingCandidates[0];
            }
        }

        if(!c02ScrubberRating) {
            c02ScrubberRatingCandidates = c02ScrubberRatingCandidates.filter(candidate => candidate.charAt(i) === c02BitCriteria);
            if(c02ScrubberRatingCandidates.length === 1) {
                c02ScrubberRating = c02ScrubberRatingCandidates[0];
            }
        }
    }

    return parseInt(o2GenRating!, 2) * parseInt(c02ScrubberRating!, 2);
}