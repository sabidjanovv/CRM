import { IsOptional, IsString } from 'class-validator';

export class CreateReasonLidDto {
    @IsOptional()
    @IsString({message:"Reason must be a string not number"})
    readonly reason_lid?: string;
}
