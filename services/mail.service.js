import nodemailer from 'nodemailer';

class MailService {
    
    async init() {
        let testAccount = await nodemailer.createTestAccount();

        this.transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: testAccount.user, 
              pass: testAccount.pass, 
            },
          });
    }

    async sendActivationMail(to, link) {
        let info = await this.transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', 
            to: to, 
            subject: "Hello ✔",
            text: "Hello world?", 
            html: `<a href="${link}">${link}</a>`, 
          });
    }
}

const mailService = new MailService();
mailService.init();

export { mailService }