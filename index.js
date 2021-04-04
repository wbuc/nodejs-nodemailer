const dotenv = require("dotenv");
const express = require("express");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const app = express();
const port = 4000;

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

app.get("/", async (req, res) => {
    try {
        const order = {
            orderId: 948584,
            name: "Patrik",
            price: 50
        };

        const mailInfo = {
            from: "shop@example.com",
            to: "test943933@test.com",
            subject: "Order Confirmation",
            template: "orderConfirmation",
            context: order,
            attachments: [
                {
                    filename: "order-detail.jpg",
                    path: "./order-detail.jpg"
                }
            ]
        };

        await transporter.sendMail(mailInfo);

        res.send("email sent");

    } catch (e) {
        console.log(e);
        res.status(500).send("Something broke!");
    }
});

app.listen(port, () => console.log(`app listening on port ${port}!`))
