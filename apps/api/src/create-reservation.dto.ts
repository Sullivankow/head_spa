import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateReservationDto {
  @IsString() @MinLength(2) name!: string;
  @IsEmail() email!: string;
  @IsOptional() @IsString() phone?: string;
  @IsIn(["Rituel Découverte", "Rituel Signature", "Évasion Profonde"]) treatment!: string;
  @IsString() date!: string;
  @IsString() time!: string;
  @IsOptional() @IsString() message?: string;
  @IsOptional() @IsString() website?: string;
}