import {IsOptional, IsNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

// TODO remove to common dtos!!!
export class LimitDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({required: false})
  limit: number;
}
