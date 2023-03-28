import {IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddAddressDTO {
  @ApiProperty({ required: true })
  @IsString()
  address: string;
}
