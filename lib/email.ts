import nodemailer from "nodemailer";

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

function generateOTP(): string {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 8; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// Function to send OTP via email
// export async function sendOTP(email: string): Promise<string> {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.resend.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "resend",
//       pass: process.env.RESEND_API_KEY,
//     },
//   });

//   const OTP = generateOTP();

//   let mailOptions: EmailOptions = {
//     from: "your_email@gmail.com",
//     to: email,
//     subject: "Your OTP for verification",
//     text: `Your OTP is: ${OTP}. Please use this OTP to verify your account.`,
//   };

//   let info = await transporter.sendMail(mailOptions);

//   console.log("Message sent: %s", info.messageId);
//   return OTP;
// }

export async function sendOtp(eamil: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });

  const OTP = generateOTP();

  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
      }
      .otp {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color: #007bff;
        margin-bottom: 20px;
      }
      p {
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>OTP Verification</h1>
      <p>Your OTP for verification is:</p>
      <div class="otp">${OTP}</div>
      <p>Please use this OTP to verify your account.</p>
    </div>
  </body>
  </html>
`;

  const info = await transporter.sendMail({
    from: "onboarding@resend.dev",
    to: eamil,
    subject: "Hello World",
    html: htmlContent,
  });

  console.log("Message sent: %s", info.messageId);
  return OTP;
}
