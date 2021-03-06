import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution1 extends AbstractSolution {

    getProblemName(): string {
        return "Multiples of 3 or 5";
    }

    /**
     * The commented out code used less efficient methods
     * We're keeping those here for reference and for comparison with the "SmarterSolve" method
     */
    protected solve() {
        //return this.bruteForceSolve(1000);
        //return this.smartSolve(1000);
        return this.smarterSolve(1000);
    }

    /**
     * This calculates the answer better than the other two methods below
     * Instead of looping, we just perform a few calculations
     * @param limit 
     * @returns 
     */
    private smarterSolve(limit: number): number {
        const sum3 = 3*this.sumFromOneToN(limit/3);
        const sum5 = 5*this.sumFromOneToN(limit/5);
        const sum15 = 15*this.sumFromOneToN(limit/15);

        return sum3 + sum5 - sum15 - limit;
    }

    private sumFromOneToN(n: number): number {
        n = Math.floor(n);
        return (n*(n+1))/2;
    }

    /**
     * This is better than the brute force, but there's still a faster way
     * @param limit 
     * @returns 
     */
    private smartSolve(limit: number): number {
        let sum: number = 0;
        for (let i=3; i<limit; i+=3) {
            sum += i;
        }

        for (let i=5; i<limit; i+=5) {
            if (i % 3 !== 0) {
                sum += i;
            }
        }

        return sum;
    }

    /**
     * This is an initial attempt at solving the problem
     * It gets the correct answer, but it isn't the most efficient way
     * @param limit 
     * @returns 
     */
    private bruteForceSolve(limit: number): number {
        let sum: number = 0;
        for (let i=1; i<limit; i++) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }
        return sum;
    }

}