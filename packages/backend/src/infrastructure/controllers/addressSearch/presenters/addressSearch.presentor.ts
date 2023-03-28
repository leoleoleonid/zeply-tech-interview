import { ApiProperty } from '@nestjs/swagger';

export class AddressSearchPresenter {
    @ApiProperty()
    address: string;
    @ApiProperty()
    score: number;
}
