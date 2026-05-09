import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, EMAIL_FROM } from '../config/env.config.js';

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendContactEmail = async (name, email, subject, message) => {
  try {
    const msg = {
      to: EMAIL_FROM,
      from: EMAIL_FROM,
      replyTo: email,
      subject: `[Contact Form] ${subject} - from ${name}`,
      html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
                    <div style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 30px; border-radius: 20px 20px 0 0; text-align: center;">
                        <h2 style="color: white; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 20px;">New Contact Inquiry</h2>
                    </div>
                    
                    <div style="padding: 40px; background: white; border: 1px solid #f1f5f9; border-top: none; border-radius: 0 0 20px 20px;">
                        <div style="margin-bottom: 25px;">
                            <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">From</span>
                            <p style="margin: 5px 0 0 0; color: #1e293b; font-weight: 700; font-size: 16px;">${name} &lt;${email}&gt;</p>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Subject</span>
                            <p style="margin: 5px 0 0 0; color: #1e293b; font-weight: 700; font-size: 16px;">${subject}</p>
                        </div>

                        <div style="margin-bottom: 30px; padding: 20px; background: #f8fafc; border-radius: 15px; border-left: 4px solid #3b82f6;">
                            <span style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Message</span>
                            <p style="margin: 10px 0 0 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>

                        <div style="text-align: center; margin-top: 40px;">
                            <a href="mailto:${email}" style="display: inline-block; padding: 14px 30px; background: #1e293b; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Reply to ${name}</a>
                        </div>
                    </div>
                    
                    <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 30px;">
                        &copy; 2026 CodeFolio &bull; Automated System
                    </p>
                </div>
            `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    console.log(error?.response?.data ? JSON.stringify(error?.response?.data, null, 2) : error);
    return false;
  }
};

export const sendOtpEmail = async (email, otp) => {
  try {
    const msg = {
      to: email,
      from: EMAIL_FROM,
      subject: 'Your Verification Code - CodeFolio',
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #4f46e5; text-align: center;">CodeFolio</h2>
                    <p>Hello,</p>
                    <p>Use the following code to complete your verification. This code is valid for 10 minutes.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1f2937; background: #f3f4f6; padding: 10px 20px; border-radius: 8px;">
                            ${otp}
                        </span>
                    </div>
                    <p>If you didn't request this, please ignore this email.</p>
                    <p style="font-size: 11px; color: #94a3b8; text-align: center; font-style: italic;">
                        Tip: If you found this in spam, please mark it as 'Not Spam' to ensure you receive future emails in your inbox.
                    </p>
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                    <p style="font-size: 12px; color: #6b7280; text-align: center;">
                        &copy; 2026 CodeFolio. All rights reserved.
                    </p>
                </div>
            `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    console.log(error?.response?.data ? JSON.stringify(error?.response?.data, null, 2) : error);
    return false;
  }
};
