import { Combinations } from "../../utils/combinations";
import { AbstractSolution, RunSolution } from "../../utils/solution";
const fs = require("fs");

@RunSolution
export class Solution59 extends AbstractSolution {

    //generate an array of all letters (we could type this out manually if we wanted to)
    private letters = new Array(26).fill(0).map((_, index) => 97+index).map(
        code => String.fromCharCode(code)
    );

    getProblemName(): string {
        return "XOR Decryption";
    }

    protected solve() {
        return this.doSolve();
    }

    /**
     * Iterate over possible 3 letter passwords and attempt to decrypt with each one
     * @returns 
     */
    private doSolve(): number {
        const cipherCodes = this.loadCodes();
        let sum = -1;
        Combinations.forEachNPossibilities(3, this.letters, pwdThree => {
            sum = this.decipherText(pwdThree, cipherCodes);
            if (sum > -1) {
                //stop generating possibilities
                return false;
            }
        });
        return sum;
    }

    /**
     * We'll use common words with spaces to check if we've found the decrypted version
     * @param pwdThree 
     * @param codes 
     * @returns 
     */
    private decipherText(pwdThree: string, codes: number[]): number {
        const commonWords = [
            "and",
            "the",
            "is"
        ];

        const pwdCodes = Array.from(pwdThree).map(char => char.charCodeAt(0));

        const plainCodes = codes.map((code, index) => pwdCodes[index % 3]^code);
        const plainText = plainCodes.reduce((str, code) => {
            return str + String.fromCharCode(code);
        }, "");

        let hasCommonWords = true;
        for (let i=0; hasCommonWords && i<commonWords.length; i++) {
            const word = commonWords[i];
            if (plainText.indexOf(" "+word) === -1 && plainText.indexOf(word+" ") === -1) {
                hasCommonWords = false;
            }
        }

        if (hasCommonWords) {
            //console.log(plainText);
            return plainCodes.reduce((acc, code) => acc + code);
        } else {
            return -1;
        }
    }

    //read the file synchronously and split by comma
    private loadCodes(): number[] {
        const codesStr = fs.readFileSync(__dirname+"/p059_cipher.txt", "utf-8");
        return codesStr.split(",").map((code: string) => parseInt(code));
    }

}