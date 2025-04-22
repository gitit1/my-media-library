import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdatePathDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  driveLetter?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
