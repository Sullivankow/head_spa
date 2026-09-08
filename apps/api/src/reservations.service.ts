import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "./prisma.service";
import { Resend } from "resend";

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async create(dto: any) {
    if (dto.website) return { ok: true }; // honeypot anti-spam
    const date = new Date(`${dto.date}T12:00:00`);
    if (Number.isNaN(date.getTime())) throw new BadRequestException("Date invalide");

    const reservation = await this.prisma.reservation.create({
      data: { name:dto.name, email:dto.email, phone:dto.phone, treatment:dto.treatment, date, time:dto.time, message:dto.message }
    });

    const key = this.config.get<string>("RESEND_API_KEY");
    const director = this.config.get<string>("DIRECTOR_EMAIL");
    const from = this.config.get<string>("MAIL_FROM") || "Headspa <onboarding@resend.dev>";

    if (key && director) {
      const resend = new Resend(key);
      await resend.emails.send({
        from, to: director, subject: `Nouvelle demande de réservation — ${dto.treatment}`,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>Nouvelle demande de réservation</h2>
          <p><b>Nom :</b> ${esc(dto.name)}</p><p><b>Email :</b> ${esc(dto.email)}</p>
          <p><b>Téléphone :</b> ${esc(dto.phone || "Non renseigné")}</p><p><b>Rituel :</b> ${esc(dto.treatment)}</p>
          <p><b>Date :</b> ${esc(dto.date)} à ${esc(dto.time)}</p><p><b>Message :</b> ${esc(dto.message || "—")}</p>
          <p><small>ID : ${reservation.id}</small></p></div>`
      });
    } else this.logger.warn("Resend non configuré : réservation enregistrée en BDD uniquement.");

    return { ok: true, id: reservation.id };
  }
}
function esc(v: string) {
  return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}