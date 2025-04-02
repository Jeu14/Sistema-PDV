const nodemailer = require('nodemailer')

const transportador = nodemailer.createTransport({
	host: 'smtp.sendgrid.net',
	port: 587,
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.API_EMAIL,
	},
})

module.exports = transportador
