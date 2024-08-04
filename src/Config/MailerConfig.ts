import nodemailer from 'nodemailer';
let host_env = typeof process.env.SMTP_HOST !== undefined ? process.env.SMTP_HOST : "";

const transport = nodemailer.createTransport({
    host: host_env,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth:{
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS
    }
});

export default transport;