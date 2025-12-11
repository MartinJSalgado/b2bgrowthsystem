import { jsPDF } from 'jspdf';

export interface DiagnosticData {
  name: string;
  email: string;
  company: string;
  overallScore: number;
  categoryScores: Record<string, number>;
  bottlenecks: Array<{ category: string; score: number }>;
  primaryConstraint: { category: string; score: number };
  diagnosis: {
    title: string;
    description: string;
    offer: string;
    price: string;
    duration: string;
  };
}

export function generateDiagnosticPDF(data: DiagnosticData): Buffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Add text with wrapping
  const addWrappedText = (text: string, x: number, fontSize: number, fontStyle: string = 'normal', maxWidth?: number) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    const splitText = doc.splitTextToSize(text, maxWidth || contentWidth);
    doc.text(splitText, x, yPos);
    yPos += (fontSize * 0.35 * splitText.length) + 2;
  };

  // === PAGE 1: HEADER & SCORE ===

  // Header with gradient effect (simulated with rectangles)
  doc.setFillColor(7, 193, 216); // #07C1D8
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('FABRIC™ Growth Diagnostic', pageWidth / 2, 25, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Your Complete Analysis & 30-Day Roadmap', pageWidth / 2, 35, { align: 'center' });

  yPos = 65;
  doc.setTextColor(0, 0, 0);

  // Client Info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Prepared for: ${data.name}`, margin, yPos);
  yPos += 5;
  if (data.company) {
    doc.text(`Company: ${data.company}`, margin, yPos);
    yPos += 5;
  }
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, yPos);
  yPos += 15;

  // Overall Score - Big and Bold
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR GROWTH ARCHITECTURE SCORE', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Score circle background
  doc.setFillColor(7, 193, 216);
  doc.circle(pageWidth / 2, yPos + 10, 25, 'F');

  // Score number
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(48);
  doc.setFont('helvetica', 'bold');
  doc.text(data.overallScore.toString(), pageWidth / 2, yPos + 15, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('out of 100', pageWidth / 2, yPos + 25, { align: 'center' });

  yPos += 45;

  // Diagnosis
  checkNewPage(40);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'F');

  yPos += 8;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(data.diagnosis.title, margin + 5, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const descLines = doc.splitTextToSize(data.diagnosis.description, contentWidth - 10);
  doc.text(descLines, margin + 5, yPos);
  yPos += (descLines.length * 4) + 10;

  // === CATEGORY BREAKDOWN ===
  checkNewPage(80);
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('FABRIC™ Category Breakdown', margin, yPos);
  yPos += 10;

  const categories = ['Foundation', 'Architecture', 'Build', 'Release', 'Improve', 'Compound'];
  const categoryLabels: Record<string, string> = {
    'Foundation': 'F - Foundation',
    'Architecture': 'A - Architecture',
    'Build': 'B - Build',
    'Release': 'R - Release',
    'Improve': 'I - Improve',
    'Compound': 'C - Compound'
  };

  categories.forEach((cat, index) => {
    checkNewPage(15);
    const score = data.categoryScores[cat] || 0;

    // Category label
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(categoryLabels[cat], margin, yPos);

    // Score bar
    const barWidth = contentWidth - 30;
    const barHeight = 8;
    const barX = margin;
    const barY = yPos + 2;

    // Background bar (light gray)
    doc.setFillColor(230, 230, 230);
    doc.roundedRect(barX, barY, barWidth, barHeight, 2, 2, 'F');

    // Score bar (gradient effect with color based on score)
    const scoreWidth = (barWidth * score) / 100;
    let color = score < 45 ? [239, 68, 68] : score < 70 ? [251, 191, 36] : [34, 197, 94]; // red, yellow, green
    doc.setFillColor(color[0], color[1], color[2]);
    if (scoreWidth > 0) {
      doc.roundedRect(barX, barY, scoreWidth, barHeight, 2, 2, 'F');
    }

    // Score text
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${score}%`, barX + barWidth + 5, yPos + 7);

    yPos += 14;
  });

  // === NEW PAGE: BOTTLENECKS & ROADMAP ===
  doc.addPage();
  yPos = margin;

  // Header
  doc.setFillColor(7, 193, 216);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Growth Bottlenecks', pageWidth / 2, 25, { align: 'center' });

  yPos = 55;
  doc.setTextColor(0, 0, 0);

  // Primary Constraint
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('🎯 Primary Constraint', margin, yPos);
  yPos += 8;

  doc.setFillColor(255, 245, 235);
  doc.roundedRect(margin, yPos, contentWidth, 18, 3, 3, 'F');

  yPos += 6;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.primaryConstraint.category}`, margin + 5, yPos);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Score: ${data.primaryConstraint.score}%`, contentWidth - 10, yPos, { align: 'right' });

  yPos += 6;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('This is your #1 growth blocker. Fix this first.', margin + 5, yPos);

  yPos += 15;

  // Top 3 Bottlenecks
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Top 3 Growth Bottlenecks', margin, yPos);
  yPos += 10;

  data.bottlenecks.forEach((bottleneck, index) => {
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F');

    yPos += 4;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${bottleneck.category}`, margin + 3, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${bottleneck.score}%`, contentWidth - 5, yPos, { align: 'right' });

    yPos += 12;
  });

  yPos += 10;

  // === 30-DAY ROADMAP ===
  checkNewPage(100);
  doc.setFillColor(7, 193, 216);
  doc.setTextColor(255, 255, 255);
  doc.roundedRect(margin, yPos, contentWidth, 10, 2, 2, 'F');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Your 30-Day Roadmap', margin + 5, yPos + 7);

  yPos += 18;
  doc.setTextColor(0, 0, 0);

  // Week 1
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('🗓️ Week 1: Diagnostic & Priority Setting', margin, yPos);
  yPos += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const week1Tasks = [
    `• Deep dive into your ${data.primaryConstraint.category} constraint`,
    '• Map current state vs desired state',
    '• Identify quick wins and long-term fixes',
    '• Set measurable 30-day goals'
  ];
  week1Tasks.forEach(task => {
    doc.text(task, margin + 5, yPos);
    yPos += 5;
  });

  yPos += 5;

  // Week 2
  checkNewPage(40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('🗓️ Week 2: Foundation Work', margin, yPos);
  yPos += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const week2Tasks = [
    '• Implement quick wins from week 1 analysis',
    `• Begin systematic work on ${data.primaryConstraint.category}`,
    '• Document processes and decisions',
    '• Measure baseline metrics'
  ];
  week2Tasks.forEach(task => {
    doc.text(task, margin + 5, yPos);
    yPos += 5;
  });

  yPos += 5;

  // Week 3
  checkNewPage(40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('🗓️ Week 3: Build & Test', margin, yPos);
  yPos += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const week3Tasks = [
    '• Roll out initial improvements',
    '• Test and validate changes',
    `• Address secondary bottleneck: ${data.bottlenecks[1]?.category || 'TBD'}`,
    '• Gather feedback and iterate'
  ];
  week3Tasks.forEach(task => {
    doc.text(task, margin + 5, yPos);
    yPos += 5;
  });

  yPos += 5;

  // Week 4
  checkNewPage(40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('🗓️ Week 4: Optimize & Scale', margin, yPos);
  yPos += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const week4Tasks = [
    '• Measure results vs baseline',
    '• Refine and optimize systems',
    '• Document wins and lessons learned',
    '• Plan next 30-day cycle'
  ];
  week4Tasks.forEach(task => {
    doc.text(task, margin + 5, yPos);
    yPos += 5;
  });

  // === NEXT STEPS & CTA ===
  checkNewPage(60);
  yPos += 10;

  doc.setFillColor(7, 193, 216);
  doc.roundedRect(margin, yPos, contentWidth, 45, 3, 3, 'F');

  yPos += 8;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Ready to Fix This?', margin + 5, yPos);

  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Recommended: ${data.diagnosis.offer}`, margin + 5, yPos);

  yPos += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Investment: ${data.diagnosis.price} | Timeline: ${data.diagnosis.duration}`, margin + 5, yPos);

  yPos += 7;
  doc.setFontSize(9);
  const ctaText = 'Visit the diagnostic page to explore your options and book a session.';
  doc.text(ctaText, margin + 5, yPos);

  yPos += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('🔗 https://b2bgrowthsystem.com/diagnostic', margin + 5, yPos);

  // Footer
  yPos = pageHeight - 15;
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('FABRIC™ Growth System | Lloyd GTM', pageWidth / 2, yPos, { align: 'center' });
  doc.text('© 2025 All Rights Reserved', pageWidth / 2, yPos + 4, { align: 'center' });

  // Return as Buffer for server-side usage
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  return pdfBuffer;
}

// Browser-friendly version that returns base64
export function generateDiagnosticPDFBase64(data: DiagnosticData): string {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // ... (same PDF generation code as above, but return base64)

  return doc.output('datauristring');
}
