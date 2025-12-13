import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { generateDiagnosticPDF, DiagnosticData } from '../src/utils/pdf-generator';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const diagnosticData: DiagnosticData = req.body;

    // Validate required fields
    if (!diagnosticData.email || !diagnosticData.name || !diagnosticData.overallScore) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not configured');
      return res.status(500).json({
        error: 'Email service not configured',
        details: 'RESEND_API_KEY environment variable is missing'
      });
    }

    console.log('📧 Attempting to send diagnostic email to:', diagnosticData.email);
    console.log('📊 Score:', diagnosticData.overallScore);

    // Generate PDF
    console.log('📄 Generating PDF...');
    const pdfBuffer = await generateDiagnosticPDF(diagnosticData);
    console.log('✅ PDF generated successfully, buffer size:', pdfBuffer.length, 'bytes');

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Prepare email HTML
    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: #334155;
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
    }
    .header {
      background: linear-gradient(135deg, #07C1D8 0%, #06a8bd 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      color: white;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      margin-top: 8px;
    }
    .content {
      padding: 40px 30px;
    }
    .score-box {
      background: linear-gradient(135deg, #07C1D8 0%, #06a8bd 100%);
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
    }
    .score {
      font-size: 64px;
      font-weight: bold;
      color: white;
      line-height: 1;
    }
    .score-label {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      margin-top: 8px;
    }
    .diagnosis-box {
      background: #f1f5f9;
      border-left: 4px solid #07C1D8;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .diagnosis-title {
      font-size: 20px;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 8px;
    }
    .diagnosis-text {
      color: #475569;
      font-size: 14px;
      line-height: 1.6;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #07C1D8 0%, #06a8bd 100%);
      color: white;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      margin: 20px 0;
      font-weight: 600;
      font-size: 16px;
    }
    .cta-button:hover {
      opacity: 0.9;
    }
    .attachment-notice {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      border-radius: 8px;
      padding: 16px;
      margin: 20px 0;
    }
    .attachment-icon {
      font-size: 24px;
      margin-right: 8px;
    }
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .footer-links {
      margin-top: 15px;
    }
    .footer-links a {
      color: #07C1D8;
      text-decoration: none;
      margin: 0 10px;
    }
    h2 {
      color: #0f172a;
      font-size: 22px;
      margin-top: 0;
    }
    p {
      margin: 12px 0;
    }
    .next-steps {
      background: #f8fafc;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .next-steps h3 {
      color: #0f172a;
      font-size: 16px;
      margin-top: 0;
      margin-bottom: 12px;
    }
    .next-steps ul {
      margin: 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin: 8px 0;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">✨ FABRIC™ Growth System</div>
      <div class="subtitle">Your Complete Growth Diagnostic Results</div>
    </div>

    <div class="content">
      <h2>Hi ${diagnosticData.name},</h2>

      <p>Thank you for completing the FABRIC™ Growth Diagnostic. Your results are ready.</p>

      <div class="score-box">
        <div class="score">${diagnosticData.overallScore}</div>
        <div class="score-label">Growth Architecture Score</div>
      </div>

      <div class="diagnosis-box">
        <div class="diagnosis-title">${diagnosticData.diagnosis.title}</div>
        <div class="diagnosis-text">${diagnosticData.diagnosis.description}</div>
      </div>

      <div class="attachment-notice">
        <strong><span class="attachment-icon">📄</span>Your Complete Analysis is Attached</strong>
        <p style="margin: 8px 0 0 0; font-size: 14px;">
          We've attached a detailed PDF with your full diagnostic breakdown,
          top bottlenecks, and a custom 30-day roadmap to fix your growth system.
        </p>
      </div>

      <div class="next-steps">
        <h3>🎯 What's in Your PDF:</h3>
        <ul>
          <li><strong>Complete FABRIC™ breakdown</strong> - Scores across all 6 categories</li>
          <li><strong>Your #1 constraint</strong> - The primary bottleneck holding you back</li>
          <li><strong>Top 3 growth bottlenecks</strong> - Priority areas to address</li>
          <li><strong>30-day roadmap</strong> - Week-by-week action plan</li>
          <li><strong>Recommended next steps</strong> - How to fix this systematically</li>
        </ul>
      </div>

      <p><strong>Ready to fix your growth system?</strong></p>

      <p>Based on your score, we recommend: <strong>${diagnosticData.diagnosis.offer}</strong></p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://b2bgrowthsystem.com/diagnostic" class="cta-button">
          Explore Your Options
        </a>
      </div>

      <p style="font-size: 14px; color: #64748b;">
        Questions? Just reply to this email. I read every response personally.
      </p>

      <p style="font-size: 14px; color: #64748b;">
        — Lloyd<br>
        FABRIC™ Growth System
      </p>
    </div>

    <div class="footer">
      <p><strong>FABRIC™ Growth System</strong></p>
      <p>The systematic approach to B2B growth.</p>
      <div class="footer-links">
        <a href="https://b2bgrowthsystem.com">Website</a> •
        <a href="https://b2bgrowthsystem.com/diagnostic">Take Diagnostic</a>
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
        © 2025 Lloyd GTM. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Send email with PDF attachment
    console.log('📨 Sending email via Resend...');
    console.log('From: Lloyd | Growth Systems <lloyd@lloydgtm.com>');
    console.log('To:', diagnosticData.email);

    const result = await resend.emails.send({
      from: 'Lloyd | Growth Systems <lloyd@lloydgtm.com>',
      to: diagnosticData.email,
      subject: `Your Growth Diagnostic Results (Score: ${diagnosticData.overallScore}/100) 📊`,
      html: emailHTML,
      attachments: [
        {
          filename: `FABRIC-Diagnostic-${diagnosticData.name.replace(/\s+/g, '-')}.pdf`,
          content: pdfBuffer.toString('base64'),
        }
      ]
    });

    console.log(`✅ Diagnostic PDF sent successfully!`);
    console.log('Email ID:', result.data?.id);
    console.log('Recipient:', diagnosticData.email);
    console.log('Score:', diagnosticData.overallScore);

    return res.status(200).json({
      success: true,
      message: 'Diagnostic PDF sent successfully',
      emailId: result.data?.id
    });

  } catch (error: any) {
    console.error('❌ Error sending diagnostic PDF:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Log Resend-specific error details
    if (error.response) {
      console.error('Resend API response:', error.response);
    }

    return res.status(500).json({
      error: 'Failed to send diagnostic PDF',
      details: error.message,
      errorName: error.name
    });
  }
}
