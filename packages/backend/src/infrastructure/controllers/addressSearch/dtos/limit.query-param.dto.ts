import {IsOptional, IsNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

// TODO remove to common dtos!!!
export class LimitDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({required: false})
  limit: number;
}
