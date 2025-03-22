import React from 'react';
import jsPDF from 'jspdf';

const PdfWithLogo = () => {
  const handleGeneratePdf = async () => {
    const doc = new jsPDF();
    const logoUrl = '/vishvin.png'; // 👈 place logo inside public folder

    const loadImage = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = 'Anonymous'; // optional
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });

    const logoImg = await loadImage(logoUrl);
    if (logoImg) {
      doc.addImage(logoImg, 'PNG', 70, 10, 60, 20); // 👈 Adjust placement
    }

    doc.setFontSize(16);
    doc.text('Company Report', 80, 50);
    doc.setFontSize(12);
    doc.text('This is a test PDF with logo.', 20, 70);

    doc.save('company_report.pdf');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>PDF Generator with Logo</h2>
      <button onClick={handleGeneratePdf}>📄 Download PDF</button>
    </div>
  );
};

export default PdfWithLogo;
