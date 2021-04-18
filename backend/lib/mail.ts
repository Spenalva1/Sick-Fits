import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string): string => `
  <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>Spenalva</p>
  </div>
`;

const sendPasswordResetEmail = async (
  resetToken: string,
  to: string
): Promise<void> => {
  // email the user a token
  const info = await transporter.sendMail({
    to,
    from: 'sickfits@sickfits.com',
    subject: 'Password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
    
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
};

export { sendPasswordResetEmail };
