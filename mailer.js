const mailer = require('nodemailer')

module.exports.send = async function main(name, message, mail) {

    let transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'courseprojectbd@gmail.com', // generated ethereal user
        pass: 'sashakalinachudo' // generated ethereal password
      }
    })

    let info = await transporter.sendMail({

        from: '"Tripcy" <tripcy@feedback.com>', // sender address
        to: 'courseprojectbd@gmail.com', // list of receivers
        subject: "Зворотній зв'язок", // Subject line
        html: `<body>
        <p style='color: #FFFFFF; font-family: 'Century Gothic';'>
        <b>Ім'я користувача:</b> ${name}, <br>
        <b>Текст повідомлення:</b> ${message}, <br>
        <b>Електронна адреса: ${mail}</b>
        </p>
        </body>` // html body

    })
}