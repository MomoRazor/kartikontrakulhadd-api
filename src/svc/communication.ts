import { MailService } from '@sendgrid/mail';
import { IMailRepo, Mail } from '../repositories';

export interface ICommunicationSvc {
    sendEmail: (email: Mail) => Promise<Mail>;
}

// Service
export const CommunicationSvc = (
    sendGrid: MailService,
    emailRepo: IMailRepo,
    fromEmail: string
): ICommunicationSvc => {
    const sendEmail = async (email: Mail) => {
        const { to, subject, html, from } = email;

        const msg: any = {
            to: to,
            from: from || fromEmail,
            subject: subject,
            html: html
        };
        let mail = await emailRepo.create({
            to: to,
            from: from || fromEmail,
            subject: subject,
            html: html
        });

        try {
            await sendGrid.sendMultiple(msg);

            await emailRepo.findByIdAndUpdate(
                mail._id,
                {
                    $set: {
                        status: 'Success'
                    }
                },
                {
                    new: true
                }
            );
        } catch (e) {
            await emailRepo.findByIdAndUpdate(
                mail._id,
                {
                    $set: {
                        status: 'Failed'
                    }
                },
                {
                    new: true
                }
            );
        }

        return mail;
    };

    return {
        sendEmail
    };
};
