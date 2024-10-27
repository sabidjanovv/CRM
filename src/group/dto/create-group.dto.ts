import { IsNotEmpty, IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter group name' })
  group_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter like exaple: (08:30)'})
  lesson_start_time: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter like exaple: (2 hours)' })
  lesson_continuous: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter like exaple: (Monday, Wednesday, Friday)' })
  lesson_week_day: string;

  @IsInt()
  @IsNotEmpty({ message: 'Please enter group_stage_id, Example: (1)' })
  group_stage_id: number;

  @IsString()
  @IsNotEmpty({ message: 'Please enter room_number, Example: (101)' })
  room_number: string;

  @IsInt()
  @IsNotEmpty({ message: 'Please enter room_floor, Example: (1)' })
  room_floor: number;

  @IsInt()
  @IsNotEmpty({ message: 'Please enter branch_id, Example: (1)' })
  branch_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'Please enter lessons_quant, Example: (10)' })
  lessons_quant: number;

  @IsBoolean()
  @IsNotEmpty({ message: 'Please enter is_active, Example: (true)' })
  is_active: boolean;

  staff: string
}
