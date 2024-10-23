import { IsOptional, IsString } from 'class-validator';

export class CreateReasonLidDto {
    @IsOptional()
    @IsString()
    readonly reason_lid?: string;
}
