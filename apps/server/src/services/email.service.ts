import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, username: string, code: string) {
  await transporter.sendMail({
    from: `"AcademicQuest" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your AcademicQuest account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0B0B0F; color: #ffffff; padding: 32px; border-radius: 12px;">
        <h2 style="color: #8B5CF6; margin-bottom: 8px;">AcademicQuest</h2>
        <h3 style="color: #ffffff; margin-bottom: 16px;">Verify your email, ${username}!</h3>
        <p style="color: #A1A1AA; margin-bottom: 24px;">Enter this code to activate your account:</p>
        <div style="background: #1A102B; border: 2px solid #8B5CF6; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #8B5CF6;">${code}</span>
        </div>
        <p style="color: #A1A1AA; font-size: 13px;">This code expires in <strong style="color: #ffffff;">10 minutes</strong>.</p>
        <p style="color: #A1A1AA; font-size: 13px;">If you did not create an account, ignore this email.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, username: string, code: string) {
  await transporter.sendMail({
    from: `"AcademicQuest" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset your AcademicQuest password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #0B0B0F; color: #ffffff; padding: 32px; border-radius: 12px;">
        <h2 style="color: #8B5CF6; margin-bottom: 8px;">AcademicQuest</h2>
        <h3 style="color: #ffffff; margin-bottom: 16px;">Password Reset</h3>
        <p style="color: #A1A1AA; margin-bottom: 8px;">Hello ${username},</p>
        <p style="color: #A1A1AA; margin-bottom: 24px;">Your password reset code is:</p>
        <div style="background: #1A102B; border: 2px solid #8B5CF6; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #8B5CF6;">${code}</span>
        </div>
        <p style="color: #A1A1AA; font-size: 13px;">This code expires in <strong style="color: #ffffff;">10 minutes</strong>.</p>
        <p style="color: #A1A1AA; font-size: 13px;">If you did not request this reset, ignore this email.</p>
      </div>
    `,
  });
}