import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePathDto {
  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  driveLetter: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
