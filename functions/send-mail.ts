/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handler } from '@netlify/functions'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

type EmailMessage = {
  email: string
}

const handler: Handler = async (event, context) => {
  const { email } = JSON.parse(event.body) as EmailMessage

  const msg = {
    to: process.env.SENDGRID_TO,
    from: process.env.SENDGRID_FROM,
    replyTo: email,
    subject: `Message from Website`,
    html: `
      Please keep me in the loop!<br /><br />
      Regards,<br /><br />
      <strong>${email}</strong><br />
    `,
  }

  try {
    await sgMail.send(msg)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Message sent! \u{1F680}`,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    }
  }
}

export { handler }
