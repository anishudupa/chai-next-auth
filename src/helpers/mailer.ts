import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import User from "@/models/user.model"
export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                },
            })
        } else if (emailType == "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                },
            })
        }
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        const mailOptions = {
            from: "anishudupa29@gmail.com", // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `<p>Click <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
            }  OR copy and paste the below link.<br />${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}</p>`, // html body
        }

        const info = await transporter.sendMail(mailOptions)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
