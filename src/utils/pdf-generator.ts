import PDFDocument from 'pdfkit';

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

export function generateDiagnosticPDF(data: DiagnosticData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 20, bottom: 20, left: 20, right: 20 }
      });

      const chunks: Buffer[] = [];

      // Collect PDF data chunks
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      // Helper function to check if we need a new page
      const checkNewPage = (requiredSpace: number) => {
        if (doc.y + requiredSpace > pageHeight - margin - 20) {
          doc.addPage();
          return true;
        }
        return false;
      };

      // === PAGE 1: HEADER & SCORE ===

      // Header with background
      doc.rect(0, 0, pageWidth, 50).fill('#07C1D8');

      // Logo/Title
      doc.fillColor('#FFFFFF')
         .fontSize(28)
         .font('Helvetica-Bold')
         .text('FABRIC™ Growth Diagnostic', margin, 15, {
           width: contentWidth,
           align: 'center'
         });

      doc.fontSize(12)
         .font('Helvetica')
         .text('Your Complete Analysis & 30-Day Roadmap', margin, 32, {
           width: contentWidth,
           align: 'center'
         });

      doc.fillColor('#000000');
      doc.y = 65;

      // Client Info
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#646464')
         .text(`Prepared for: ${data.name}`, margin, doc.y);

      doc.moveDown(0.3);

      if (data.company) {
        doc.text(`Company: ${data.company}`, margin, doc.y);
        doc.moveDown(0.3);
      }

      doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, doc.y);

      doc.moveDown(1);

      // Overall Score - Big and Bold
      doc.fillColor('#000000')
         .fontSize(14)
         .font('Helvetica-Bold')
         .text('YOUR GROWTH ARCHITECTURE SCORE', margin, doc.y, {
           width: contentWidth,
           align: 'center'
         });

      doc.moveDown(1.5);

      // Score circle background
      const scoreY = doc.y + 25;
      doc.circle(pageWidth / 2, scoreY, 25).fill('#07C1D8');

      // Score number
      doc.fillColor('#FFFFFF')
         .fontSize(48)
         .font('Helvetica-Bold')
         .text(data.overallScore.toString(), margin, scoreY - 15, {
           width: contentWidth,
           align: 'center'
         });

      doc.fontSize(12)
         .font('Helvetica')
         .text('out of 100', margin, scoreY + 10, {
           width: contentWidth,
           align: 'center'
         });

      doc.y = scoreY + 35;
      doc.moveDown(1);

      // Diagnosis
      checkNewPage(40);
      const diagY = doc.y;
      doc.roundedRect(margin, diagY, contentWidth, 50, 3).fill('#F5F5F5');

      doc.fillColor('#000000')
         .fontSize(16)
         .font('Helvetica-Bold')
         .text(data.diagnosis.title, margin + 5, diagY + 8, { width: contentWidth - 10 });

      doc.fontSize(10)
         .font('Helvetica')
         .text(data.diagnosis.description, margin + 5, diagY + 24, {
           width: contentWidth - 10,
           lineGap: 2
         });

      doc.y = diagY + 60;

      // === CATEGORY BREAKDOWN ===
      checkNewPage(80);
      doc.moveDown(1);
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('FABRIC™ Category Breakdown', margin, doc.y);

      doc.moveDown(0.8);

      const categories = ['Foundation', 'Architecture', 'Build', 'Release', 'Improve', 'Compound'];
      const categoryLabels: Record<string, string> = {
        'Foundation': 'F - Foundation',
        'Architecture': 'A - Architecture',
        'Build': 'B - Build',
        'Release': 'R - Release',
        'Improve': 'I - Improve',
        'Compound': 'C - Compound'
      };

      categories.forEach((cat) => {
        checkNewPage(18);
        const score = data.categoryScores[cat] || 0;

        // Category label
        doc.fontSize(11)
           .font('Helvetica-Bold')
           .text(categoryLabels[cat], margin, doc.y);

        const barY = doc.y + 2;
        const barWidth = contentWidth - 30;
        const barHeight = 8;

        // Background bar (light gray)
        doc.roundedRect(margin, barY, barWidth, barHeight, 2).fill('#E6E6E6');

        // Score bar (color based on score)
        const scoreWidth = (barWidth * score) / 100;
        let color = score < 45 ? '#EF4444' : score < 70 ? '#FBBD24' : '#22C55E';
        if (scoreWidth > 0) {
          doc.roundedRect(margin, barY, scoreWidth, barHeight, 2).fill(color);
        }

        // Score text
        doc.fontSize(10)
           .font('Helvetica-Bold')
           .fillColor('#000000')
           .text(`${score}%`, margin + barWidth + 5, barY + 5);

        doc.y = barY + 14;
      });

      // === NEW PAGE: BOTTLENECKS & ROADMAP ===
      doc.addPage();

      // Header
      doc.rect(0, 0, pageWidth, 40).fill('#07C1D8');
      doc.fillColor('#FFFFFF')
         .fontSize(20)
         .font('Helvetica-Bold')
         .text('Your Growth Bottlenecks', margin, 18, {
           width: contentWidth,
           align: 'center'
         });

      doc.y = 55;
      doc.fillColor('#000000');

      // Primary Constraint
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('🎯 Primary Constraint', margin, doc.y);

      doc.moveDown(0.6);

      const pcY = doc.y;
      doc.roundedRect(margin, pcY, contentWidth, 20, 3).fill('#FFF5EB');

      doc.fillColor('#000000')
         .fontSize(12)
         .font('Helvetica-Bold')
         .text(data.primaryConstraint.category, margin + 5, pcY + 6);

      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#646464')
         .text(`Score: ${data.primaryConstraint.score}%`, pageWidth - margin - 60, pcY + 6);

      doc.fontSize(9)
         .font('Helvetica-Oblique')
         .fillColor('#000000')
         .text('This is your #1 growth blocker. Fix this first.', margin + 5, pcY + 14);

      doc.y = pcY + 25;
      doc.moveDown(1);

      // Top 3 Bottlenecks
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Top 3 Growth Bottlenecks', margin, doc.y);

      doc.moveDown(0.8);

      data.bottlenecks.forEach((bottleneck, index) => {
        const bnY = doc.y;
        doc.roundedRect(margin, bnY, contentWidth, 12, 2).fill('#F5F5F5');

        doc.fontSize(11)
           .font('Helvetica-Bold')
           .fillColor('#000000')
           .text(`${index + 1}. ${bottleneck.category}`, margin + 3, bnY + 4);

        doc.fontSize(10)
           .font('Helvetica')
           .text(`${bottleneck.score}%`, pageWidth - margin - 30, bnY + 4);

        doc.y = bnY + 15;
      });

      doc.moveDown(1);

      // === 30-DAY ROADMAP ===
      checkNewPage(100);
      const roadmapY = doc.y;
      doc.roundedRect(margin, roadmapY, contentWidth, 10, 2).fill('#07C1D8');
      doc.fillColor('#FFFFFF')
         .fontSize(14)
         .font('Helvetica-Bold')
         .text('Your 30-Day Roadmap', margin + 5, roadmapY + 6);

      doc.y = roadmapY + 18;
      doc.fillColor('#000000');

      // Week 1
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('🗓️ Week 1: Diagnostic & Priority Setting', margin, doc.y);

      doc.moveDown(0.4);

      doc.fontSize(10).font('Helvetica');
      const week1Tasks = [
        `• Deep dive into your ${data.primaryConstraint.category} constraint`,
        '• Map current state vs desired state',
        '• Identify quick wins and long-term fixes',
        '• Set measurable 30-day goals'
      ];
      week1Tasks.forEach(task => {
        doc.text(task, margin + 5, doc.y);
        doc.moveDown(0.3);
      });

      doc.moveDown(0.5);

      // Week 2
      checkNewPage(40);
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('🗓️ Week 2: Foundation Work', margin, doc.y);

      doc.moveDown(0.4);

      doc.fontSize(10).font('Helvetica');
      const week2Tasks = [
        '• Implement quick wins from week 1 analysis',
        `• Begin systematic work on ${data.primaryConstraint.category}`,
        '• Document processes and decisions',
        '• Measure baseline metrics'
      ];
      week2Tasks.forEach(task => {
        doc.text(task, margin + 5, doc.y);
        doc.moveDown(0.3);
      });

      doc.moveDown(0.5);

      // Week 3
      checkNewPage(40);
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('🗓️ Week 3: Build & Test', margin, doc.y);

      doc.moveDown(0.4);

      doc.fontSize(10).font('Helvetica');
      const week3Tasks = [
        '• Roll out initial improvements',
        '• Test and validate changes',
        `• Address secondary bottleneck: ${data.bottlenecks[1]?.category || 'TBD'}`,
        '• Gather feedback and iterate'
      ];
      week3Tasks.forEach(task => {
        doc.text(task, margin + 5, doc.y);
        doc.moveDown(0.3);
      });

      doc.moveDown(0.5);

      // Week 4
      checkNewPage(40);
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('🗓️ Week 4: Optimize & Scale', margin, doc.y);

      doc.moveDown(0.4);

      doc.fontSize(10).font('Helvetica');
      const week4Tasks = [
        '• Measure results vs baseline',
        '• Refine and optimize systems',
        '• Document wins and lessons learned',
        '• Plan next 30-day cycle'
      ];
      week4Tasks.forEach(task => {
        doc.text(task, margin + 5, doc.y);
        doc.moveDown(0.3);
      });

      // === NEXT STEPS & CTA ===
      checkNewPage(60);
      doc.moveDown(1);

      const ctaY = doc.y;
      doc.roundedRect(margin, ctaY, contentWidth, 50, 3).fill('#07C1D8');

      doc.fillColor('#FFFFFF')
         .fontSize(14)
         .font('Helvetica-Bold')
         .text('Ready to Fix This?', margin + 5, ctaY + 8);

      doc.fontSize(11)
         .font('Helvetica-Bold')
         .text(`Recommended: ${data.diagnosis.offer}`, margin + 5, ctaY + 20);

      doc.fontSize(10)
         .font('Helvetica')
         .text(`Investment: ${data.diagnosis.price} | Timeline: ${data.diagnosis.duration}`, margin + 5, ctaY + 30);

      doc.fontSize(9)
         .text('Visit the diagnostic page to explore your options and book a session.', margin + 5, ctaY + 38);

      doc.font('Helvetica-Bold')
         .text('🔗 https://b2bgrowthsystem.com/diagnostic', margin + 5, ctaY + 45);

      // Footer
      doc.fillColor('#969696')
         .fontSize(8)
         .font('Helvetica')
         .text('FABRIC™ Growth System | Lloyd GTM', margin, pageHeight - 15, {
           width: contentWidth,
           align: 'center'
         });

      doc.text('© 2025 All Rights Reserved', margin, pageHeight - 10, {
        width: contentWidth,
        align: 'center'
      });

      // Finalize the PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

// Browser-friendly version that returns base64
export function generateDiagnosticPDFBase64(data: DiagnosticData): Promise<string> {
  return generateDiagnosticPDF(data).then(buffer => buffer.toString('base64'));
}
