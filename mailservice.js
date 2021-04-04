const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const dotenv = require("dotenv");

dotenv.config();

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    FROM_EMAIL
} = process.env;


class MailService {
    constructor(host, port, user, password) {

        /# Nodemailer config #/;
        this._transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD
            }
        });
        /# Handlebar config #/;
        const options = {
            viewEngine: {
                partialsDir: __dirname + "/views/partials",
                layoutsDir: __dirname + "/views/layouts",
                extname: ".hbs"
            },
            extName: ".hbs",
            viewPath: "views"
        };


        this._transporter.use("compile", hbs(options));
    }
    sendMail({
        to,
        subject,
        template,
        context,
        attachments
    }) {
        return this._transporter.sendMail({
            to,
            from: FROM_EMAIL,
            subject,
            template,
            context,
            attachments
        });
    }
}

module.exports = MailService;
