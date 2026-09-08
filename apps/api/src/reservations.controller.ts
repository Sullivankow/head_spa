import { Body, Controller, Get, Post } from "@nestjs/common";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { ReservationsService } from "./reservations.service";

class CreateReservationDto {
  @IsString() @MinLength(2) name!: string;
  @IsEmail() email!: string;
  @IsOptional() @IsString() phone?: string;
  @IsIn(["Rituel Découverte","Rituel Signature","Évasion Profonde"]) treatment!: string;
  @IsString() date!: string;
  @IsString() time!: string;
  @IsOptional() @IsString() message?: string;
  @IsOptional() @IsString() website?: string;
}

@Controller()
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}
  @Get("health") health() { return { ok: true }; }
  @Post("reservations") create(@Body() dto: CreateReservationDto) { return this.service.create(dto); }
}