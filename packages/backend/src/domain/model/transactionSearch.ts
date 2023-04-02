export class TransactionSearch {
    transaction: string;
    score: number;

    increaseScore() {
        this.score = this.score + 1;
    }
}
