import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateReservationDto } from "./create-reservation.dto";
import { ReservationsService } from "./reservations.service";

@Controller()
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}
  @Get("health") health() { return { ok: true }; }
  @Post("reservations") create(@Body() dto: CreateReservationDto) { return this.service.create(dto); }
}