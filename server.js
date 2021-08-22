const express = require('express');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(cors({ origin: "*" }));

app.use("/src", express.static(process.cwd() + "/src"));

const transporter = nodemailer.createTransport({
    host: "smtp.live.com",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Servidor preaparado para receber mensagens')
    }
})

app.post("/send", (req, res) => {

    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function(err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function(property) {
            data[property] = fields[property].toString();
        });
        console.log(data);
        const mail = {
            from: `${data.name} <${data.email}>`,
            to: process.env.EMAIL,
            text: `${data.name} <${data.email}> \n${data.message}`,
        };

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro');
            } else {
                res.status(200).send('Sucesso');
            }
        })
    })
});


app.route("/").get(function(req, res) {
    res.sendFile(process.cwd() + "/src/index.html");
});

app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`);
})