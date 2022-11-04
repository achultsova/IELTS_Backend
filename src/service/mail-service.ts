const nodemailer = require('nodemailer');

type MailServiceType = {
    transporter: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        }
    }
}
class MailService {
    transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Thanks for registering',
            text: '',
            html:
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300&display=swap" rel="stylesheet">
                    <title>Registering</title>
                </head>
              <body>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F2F5F5">
                    <tr>
                        <td align="center" >
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#393E59" style="padding-left: 40px; margin-top: 60px">
                                <tr>
                                    <td>
                                        <h3 style="font-size: 36px; font-family: IBM Plex Serif; font-weight: 300; color: #fff">Thanks for registering!</h3>
                                    </td>
                                </tr>
                               </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#fff" style="padding-left: 40px; padding-bottom: 46px; padding-top: 40px; margin-bottom: 60px; margin-top: 20px; font-family: Arial, Helvetica, sans-serif;">
                                <tr>
                                    <td>
                                        <p>
                                            Thanks for creating an account.<br>
                                            Please confirm your email and sign in with your credentials.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href=${link} style="text-decoration: none; color: #000;">Confirm your email →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                  </table>
                </body>
            </html>
                `
        })
    }
    async sendForgotPasswordMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Forgot password',
            text: '',
            html:
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300&display=swap" rel="stylesheet">
                    <title>Registering</title>
                </head>
              <body>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F2F5F5">
                    <tr>
                        <td align="center" >
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#393E59" style="padding-left: 40px; margin-top: 60px">
                                <tr>
                                    <td>
                                        <h3 style="font-size: 36px; font-family: IBM Plex Serif; font-weight: 300; color: #fff">Recover the password</h3>
                                    </td>
                                </tr>
                               </table> 
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#fff" style="padding-left: 40px; padding-bottom: 46px; padding-top: 40px; margin-bottom: 60px; margin-top: 20px; font-family: Arial, Helvetica, sans-serif;">
                                <tr>
                                    <td>
                                        <p>
                                        Hello,<br>
                                        We've just received a password reset request. Please click the link below<br>
                                        to reset your password. If you did NOT request a new password, ignore<br>
                                        this email and your password will remain unchanged. 
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href=${link} style="text-decoration: none; color: #000;">Reset password →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                  </table>
                </body>
            </html>
                `
        })
    }
}

module.exports = new MailService();