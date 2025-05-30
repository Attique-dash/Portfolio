import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function generateSimpleCV() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Title
  page.drawText('MUHAMMAD ATTIQUE', {
    x: 50,
    y: height - 50,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  // Subtitle
  page.drawText('Full Stack Developer', {
    x: 50,
    y: height - 80,
    size: 16,
    font: font,
    color: rgb(0, 0, 0),
  });
  
  // Contact Information
  const contactInfo = [
    'Email: attiqueshafeeq246@gmail.com',
    'Phone: +92-3244771036',
    'Location: Whadat Road Lahore, Pakistan'
  ];
  
  contactInfo.forEach((info, index) => {
    page.drawText(info, {
      x: 50,
      y: height - 120 - (index * 20),
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    });
  });
  
  // About Me
  page.drawText('About Me', {
    x: 50,
    y: height - 200,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  const aboutText = 'Experienced Full Stack Developer with hands-on experience in building modern web applications using React, Node.js, and other cutting-edge technologies. Focused on delivering scalable, high-performance solutions with clean and maintainable code.';
  
  page.drawText(aboutText, {
    x: 50,
    y: height - 230,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
    maxWidth: width - 100,
  });
  
  // Skills
  page.drawText('Skills', {
    x: 50,
    y: height - 300,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  const skills = [
    'Frontend: React, Next.js, TypeScript',
    'Backend: Node.js, Python, TypeScript',
    'Database: MongoDB, Firebase, SQL'
  ];
  
  skills.forEach((skill, index) => {
    page.drawText(skill, {
      x: 50,
      y: height - 330 - (index * 20),
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    });
  });
  
  // Education
  page.drawText('Education', {
    x: 50,
    y: height - 400,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  const education = [
    'Bachelor of Science in Computer Science',
    'Superior University — 2023 – 2027',
    'Intermediate in Computer Science (ICS)',
    'Concordia College — 2021 – 2023'
  ];
  
  education.forEach((edu, index) => {
    page.drawText(edu, {
      x: 50,
      y: height - 430 - (index * 20),
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    });
  });
  
  return await pdfDoc.save();
}