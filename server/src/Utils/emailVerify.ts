import nodemailer from "nodemailer"

export const sendEmail = async (email: string) => {
  const transporter = nodemailer.createTransport({
    name: "localhost",
    service: "gmail",
    auth: {
      user: "loejstarc@gmail.com",
      pass: "scch oxcd okjd jvph",
    },
  })

  var mailOptions = {
    from: "morton.abernathy@ethereal.email",
    to: email,
    subject: "OpenChat Account Verification",
    text: `Click the link to verify your account:`,
    html: `<a href="http://localhost:3000/verify?email=${email}">Click here to verify</a>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}
