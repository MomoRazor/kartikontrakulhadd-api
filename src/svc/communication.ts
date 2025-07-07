import { TransactionalEmailsApi } from '@getbrevo/brevo';
import { IMailRepo, Mail } from '../repositories';

export interface ICommunicationSvc {
    sendEmail: (email: Mail) => Promise<Mail>;
}

// Service
export const CommunicationSvc = (
    brevo: TransactionalEmailsApi,
    emailRepo: IMailRepo,
    fromEmail: string
): ICommunicationSvc => {
    const sendEmail = async (email: Mail) => {
        const { to, subject, html, from } = email;

        let mail = await emailRepo.create({
            to: to,
            from: from || fromEmail,
            subject: subject,
            html: html
        });

        try {
            await brevo.sendTransacEmail({
                sender: { email: from || fromEmail },
                to: to.map((email) => ({ email })),
                subject: subject,
                htmlContent: html
            });

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
