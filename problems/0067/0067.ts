import { AbstractSolution, RunSolution } from "../../utils/solution";
import fs from "fs";

@RunSolution
export class Solution67 extends AbstractSolution {

    //use this to cache so we don't explore branches more than once
    private calcMap = new Map<string, number>();

    getProblemName(): string {
        return "Maximum Path Sum II";
    }

    protected solve() {
        return this.calcBranch(this.getInput(), 0, 0);
    }

    /**
     * Recursive implementation
     * We'll branch out in the available paths
     * Using a cache enables us to avoid exploring subtrees more than once
     * @param input 
     * @param rowIndex 
     * @param columnIndex 
     * @returns 
     */
    private calcBranch(input: number[][], rowIndex: number, columnIndex: number): number {

        let sum = 0;

        if (rowIndex === input.length) {
            sum = 0;
        } else if (columnIndex === input[rowIndex].length) {
            sum = 0;
        } else {
            const index = `${rowIndex},${columnIndex}`;
            if (this.calcMap.has(index)) {
                sum = this.calcMap.get(index)!;
            } else {

                const current = input[rowIndex][columnIndex];
                sum = current + Math.max(
                    this.calcBranch(input, rowIndex + 1, columnIndex),
                    this.calcBranch(input, rowIndex + 1, columnIndex + 1)
                );

                this.calcMap.set(
                    index,
                    sum
                );
            }

        }

        return sum;
    }

    //read the input and map to 2d array
    private getInput(): number[][] {
        const input = fs.readFileSync(__dirname + "/triangle.txt", "utf-8");

        return input.split("\n")
            .filter(line => !!line.trim())
            .map(line => {
                return line.replace(/\s+/g, " ")
                    .split(" ")
                    .filter(str => !!str.trim())
                    .map(numStr => parseInt(numStr));
            });
    }

}