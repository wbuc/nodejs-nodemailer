const express = require("express");
const nodemailer = require("nodemailer");
const MailService = require("./MailService");
const mailService = new MailService();
const mailHelper = require("./mailHelper");
const app = express();
const port = 4000;

/# Class approach #/;
app.get("/", async (req, res) => {
    try {
        const order = {
            orderId: 948584,
            name: "Patrik",
            price: 100
        };

        const mailInfo = {
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

        await mailService.sendMail(mailInfo);
        res.send("email sent");

    } catch (e) {
        console.log(e);
        res.status(500).send("Something broke!");
    }
});
/# Helper approach #/;
app.get("/v1", async (req, res) => {
    try {
        const order = {
            orderId: 948584,
            name: "Patrik",
            price: 100
        };

        const mailInfo = {
            to: "test943933@test.com",
            subject: "Order Confirmation v1",
            template: "orderConfirmation",
            context: order,
            attachments: [
                {
                    filename: "order-detail.jpg",
                    path: "./order-detail.jpg"
                }
            ]
        };

        await mailHelper.sendMail(mailInfo);
        res.send("email sent from helper!");

    } catch (e) {
        console.log(e);
        res.status(500).send("Something broke!");
    }
});

app.listen(port, () => console.log(`app listening on port ${port}!`))
