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
        html: `<b style='color: grey'>${name}, ${message}, ${mail}</b>` // html body

    })
}