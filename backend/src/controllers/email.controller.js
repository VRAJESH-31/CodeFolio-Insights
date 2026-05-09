import { sendContactEmail } from '../utils/sendgrid.util.js';
import asyncHandler from '../utils/async-handler.util.js';

const handleContactInquiry = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;
    const success = await sendContactEmail(name, email, subject, message);
    if (success) return res.status(200).json({ message: "Message sent successfully" });
    throw new ApiError(500, "Failed to send message. Please try again later.");
});

export { handleContactInquiry };
