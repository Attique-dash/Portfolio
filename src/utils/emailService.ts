import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_lmaa5bs'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_zr091np'; // Replace with your EmailJS template ID
const PUBLIC_KEY = 'Mla1XLDrEbsqEhMuK'; // Replace with your EmailJS public key

export const sendEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return { success: true, data: response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}; 