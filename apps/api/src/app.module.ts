import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./prisma.service";
import { ReservationsController } from "./reservations.controller";
import { ReservationsService } from "./reservations.service";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ReservationsController],
  providers: [PrismaService, ReservationsService],
})
export class AppModule {}