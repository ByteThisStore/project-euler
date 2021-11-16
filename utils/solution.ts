
/**
 * Runner to test solutions and print out how long they took
 */
export abstract class AbstractSolution {

    /**
     * Name of the current problem being solved
     */
    abstract getProblemName(): string;

    async run(outputType: 'console' | 'json'): Promise<void> {
        const startDate = new Date();

        if (outputType === 'console') {
            console.log(`Running solution for ${this.getProblemName()}`);
        }

        const solution = await this.solve();
        
        const endDate = new Date();

        if (outputType === 'console') {
            console.log("SOLUTION: ", solution);
            console.log(`Solution took ${+endDate - +startDate}ms`);
        } else if (outputType === 'json') {
            console.log(JSON.stringify({
                executionTimeMs: +endDate - +startDate,
                solution
            }));
        }
    }

    protected abstract solve(): any;

}

export function RunSolution(constructor: new () => any) {
    let type = 'console';
    if (process.argv[2] === 'json') {
        type = 'json';
    }
    new constructor().run(type);
} 