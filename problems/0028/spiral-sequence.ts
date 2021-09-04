import { AbstractSequence } from "../../utils/sequence";

export class SpiralSequence28 extends AbstractSequence<BigInt> {

    private static instance = new SpiralSequence28();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): BigInt[] {
        return [1n, 3n, 5n, 7n, 9n, 13n, 17n, 21n, 25n];
    }

    protected calculateNthItem(n: number): BigInt {
        /**
         *  * 1, 2,3,4   ,5,    6, 7, 8, 9     ,10,11 ,12, 13
         *  * 1, 3,5,7,   9,    13,17,21, 25,   31, 37, 43, 49
            * x, prev + 2    prev + 4       prev + 6
         */

        const prevValue = this.getNthItem(n-1);
        const increment = BigInt(2*Math.ceil((n-1)/4));

        //@ts-ignore
        return prevValue+increment;
    }

    static getNthSpiralNumber(n: number): BigInt {
        return SpiralSequence28.instance.getNthItem(n);
    }

    static getSpiralSumOfRange(startN: number, endN: number): BigInt {
        return SpiralSequence28.instance.getSumOfRange(startN, endN);
    }

    static getSpiralNumbersInRange(startN: number, endN: number): BigInt[] {
        return SpiralSequence28.instance.getItemsInRange(startN, endN);
    }
    
}