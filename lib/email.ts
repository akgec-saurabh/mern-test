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

  const info = await transporter.sendMail({
    from: "onboarding@resend.dev",
    to: eamil,
    subject: "Hello World",
    html: `<strong>${OTP}</strong>`,
  });

  console.log("Message sent: %s", info.messageId);
  return OTP;
}
