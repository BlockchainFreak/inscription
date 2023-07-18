import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
    service: 'outlook', // You can use other services like yahoo, outlook, etc.
    auth: {
        user: process.env.PROVIDER_EMAIL ?? "",
        pass: process.env.PROVIDER_PASSWORD ?? "",
    }
});

const htmlString = `<!DOCTYPE html><html><head><title>Verification Email</title></head><body><h2>Welcome, {{username}}</h2><p>Your verification code for Inscription App is: <code>{{code}}</code></p></body><style>code {background-color: #9b9da0;padding: 5px 10px;border-radius: 5px;color: black;}@media (prefers-color-scheme: dark) {code {background-color: #343a40;padding: 5px 10px;border-radius: 5px;color: white;}}</style></html>`;


type params = {
    email: string;
    code: string;
    username: string;
}

export const sendVerificationCode = ({ email, code, username }: params) => {
    return new Promise<SMTPTransport.SentMessageInfo>((resolve, reject) => {
        const mailOptions = {
            from: process.env.PROVIDER_EMAIL ?? "",
            to: email,
            subject: `your verification code for Inscription App is: ${code}`,
            html: htmlString.replace('{{username}}', username).replace('{{code}}', code),// plain text body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(info);
            }
        });
    })
}