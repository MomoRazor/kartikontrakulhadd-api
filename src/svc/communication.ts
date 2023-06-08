import { MailService } from "@sendgrid/mail"
import { IMailRepo, Mail } from "../repositories"

export interface ICommunicationSvc {
    sendEmail: (email: Mail) => Promise<Mail>
}

// Service
export const CommunicationSvc = (
    sendGrid: MailService,
    emailRepo: IMailRepo,
    fromEmail: string
): ICommunicationSvc => {
    const sendEmail = async (email: Mail) => {
        const { to, subject, html, from } = email

        const msg: any = {
            to: to,
            from: from || fromEmail,
            subject: subject,
            html: html
        }
        await sendGrid.sendMultiple(msg)

        return await emailRepo.create({
            data: {
                to: to,
                from: from || fromEmail,
                subject: subject,
                html: html
            }
        })
    }

    return {
        sendEmail
    }
}
