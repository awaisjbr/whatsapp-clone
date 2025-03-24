import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth:{
        user: "81869e002@smtp-brevo.com",
        pass: "hny5b6f71PN2LvI4",
    }
})