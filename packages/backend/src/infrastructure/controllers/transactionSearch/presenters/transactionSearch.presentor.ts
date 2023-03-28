import { ApiProperty } from '@nestjs/swagger';

export class TransactionSearchPresenter {
    @ApiProperty()
    transaction: string;
    @ApiProperty()
    score: number;
}
