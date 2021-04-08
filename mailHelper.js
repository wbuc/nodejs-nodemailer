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

/# Nodemailer config #/;
const transporter = nodemailer.createTransport({
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

transporter.use("compile", hbs(options));

module.exports = {
    sendMail(
        {
            to,
            subject,
            template,
            context,
            attachments
        }
    ) {
        return transporter.sendMail({
            to,
            from: FROM_EMAIL,
            subject,
            template,
            context,
            attachments
        });
    },
    sendWelcomeMail(data) {
        data.template = 'welcome';
        data.subject = "Welcome to Dynamext"
        return this.sendMail(data);
    },
    sendPasswordResetMail(data) {
        data.template = 'requestPasswordReset';
        data.subject = "Password reset request"
        return this.sendMail(data);
    }
}
