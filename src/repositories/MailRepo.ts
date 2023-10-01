import { Schema, Model, Connection } from 'mongoose';

export type MailStatus = 'Sent' | 'Error' | 'Pending';

export interface Mail {
    from: string;
    to: string[];
    subject: string;
    html: string;
    error?: any;
    request?: any;
    status: MailStatus;
}

export type IMailRepo = Model<Mail>;

const MailSchema = new Schema<Mail>({
    from: { type: Schema.Types.String, required: true },
    to: { type: [Schema.Types.String], required: true },
    subject: { type: Schema.Types.String, required: true },
    html: { type: Schema.Types.String, required: true },
    error: { type: Schema.Types.Mixed, required: false },
    request: { type: Schema.Types.Mixed, required: false },
    status: {
        type: Schema.Types.String,
        enum: ['Sent', 'Error', 'Pending'],
        required: true,
        default: 'Pending'
    }
});

export const MailRepo = async (connection: Connection): Promise<IMailRepo> => {
    const mailRepo = connection.model<Mail>('mail', MailSchema);
    await mailRepo.syncIndexes();
    return mailRepo;
};
