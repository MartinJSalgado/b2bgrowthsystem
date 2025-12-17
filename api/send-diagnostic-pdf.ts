import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

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

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Generate category breakdown HTML
    const categories = ['Foundation', 'Architecture', 'Build', 'Release', 'Improve', 'Compound'];
    const categoryLabels: Record<string, string> = {
      'Foundation': 'F - Foundation',
      'Architecture': 'A - Architecture',
      'Build': 'B - Build',
      'Release': 'R - Release',
      'Improve': 'I - Improve',
      'Compound': 'C - Compound'
    };

    const categoryBarsHTML = categories.map(cat => {
      const score = diagnosticData.categoryScores[cat] || 0;
      const color = score < 45 ? '#EF4444' : score < 70 ? '#FBBD24' : '#22C55E';
      return `
        <div style="margin: 16px 0;">
          <div style="font-weight: 600; margin-bottom: 8px; color: #0f172a;">${categoryLabels[cat]}</div>
          <div style="background: #e5e7eb; border-radius: 8px; height: 12px; overflow: hidden;">
            <div style="background: ${color}; height: 100%; width: ${score}%; border-radius: 8px;"></div>
          </div>
          <div style="text-align: right; font-size: 14px; font-weight: 600; color: #475569; margin-top: 4px;">${score}%</div>
        </div>
      `;
    }).join('');

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
    .bottleneck-box {
      background: #fef2f2;
      border: 2px solid #fecaca;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .bottleneck-item {
      background: white;
      border-radius: 6px;
      padding: 12px;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .bottleneck-score {
      font-size: 24px;
      font-weight: bold;
      color: #dc2626;
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
    .roadmap-section {
      background: #f8fafc;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .roadmap-week {
      margin: 16px 0;
    }
    .roadmap-week h4 {
      color: #0f172a;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .roadmap-week ul {
      margin: 0;
      padding-left: 20px;
    }
    .roadmap-week li {
      margin: 6px 0;
      color: #475569;
      font-size: 14px;
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
    h3 {
      color: #0f172a;
      font-size: 18px;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    p {
      margin: 12px 0;
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

      <p>Thank you for completing the FABRIC™ Growth Diagnostic. Here are your complete results.</p>

      <div class="score-box">
        <div class="score">${diagnosticData.overallScore}</div>
        <div class="score-label">Growth Architecture Score</div>
      </div>

      <div class="diagnosis-box">
        <div class="diagnosis-title">${diagnosticData.diagnosis.title}</div>
        <div class="diagnosis-text">${diagnosticData.diagnosis.description}</div>
      </div>

      <h3>📊 Your FABRIC™ Category Breakdown</h3>
      ${categoryBarsHTML}

      <div class="bottleneck-box">
        <h3 style="margin-top: 0; color: #991b1b;">🎯 Your Primary Constraint</h3>
        <div class="bottleneck-item">
          <div>
            <div style="font-weight: 700; font-size: 16px; color: #0f172a;">${diagnosticData.primaryConstraint.category}</div>
            <div style="font-size: 13px; color: #64748b; font-style: italic;">This is your #1 growth blocker. Fix this first.</div>
          </div>
          <div class="bottleneck-score">${diagnosticData.primaryConstraint.score}%</div>
        </div>

        <h3 style="margin-top: 20px; margin-bottom: 12px; color: #991b1b;">Top 3 Growth Bottlenecks</h3>
        ${diagnosticData.bottlenecks.map((b, i) => `
          <div class="bottleneck-item">
            <div style="font-weight: 600; color: #0f172a;">${i + 1}. ${b.category}</div>
            <div class="bottleneck-score">${b.score}%</div>
          </div>
        `).join('')}
      </div>

      <div class="roadmap-section">
        <h3 style="margin-top: 0;">🗓️ Your 30-Day Roadmap</h3>

        <div class="roadmap-week">
          <h4>Week 1: Diagnostic & Priority Setting</h4>
          <ul>
            <li>Deep dive into your ${diagnosticData.primaryConstraint.category} constraint</li>
            <li>Map current state vs desired state</li>
            <li>Identify quick wins and long-term fixes</li>
            <li>Set measurable 30-day goals</li>
          </ul>
        </div>

        <div class="roadmap-week">
          <h4>Week 2: Foundation Work</h4>
          <ul>
            <li>Implement quick wins from week 1 analysis</li>
            <li>Begin systematic work on ${diagnosticData.primaryConstraint.category}</li>
            <li>Document processes and decisions</li>
            <li>Measure baseline metrics</li>
          </ul>
        </div>

        <div class="roadmap-week">
          <h4>Week 3: Build & Test</h4>
          <ul>
            <li>Roll out initial improvements</li>
            <li>Test and validate changes</li>
            <li>Address secondary bottleneck: ${diagnosticData.bottlenecks[1]?.category || 'TBD'}</li>
            <li>Gather feedback and iterate</li>
          </ul>
        </div>

        <div class="roadmap-week">
          <h4>Week 4: Optimize & Scale</h4>
          <ul>
            <li>Measure results vs baseline</li>
            <li>Refine and optimize systems</li>
            <li>Document wins and lessons learned</li>
            <li>Plan next 30-day cycle</li>
          </ul>
        </div>
      </div>

      <h3>💡 Recommended Next Step</h3>
      <div style="background: #f0f9ff; border: 2px solid #07C1D8; border-radius: 8px; padding: 20px; margin: 16px 0;">
        <div style="font-weight: 700; font-size: 18px; color: #0f172a; margin-bottom: 8px;">${diagnosticData.diagnosis.offer}</div>
        <div style="color: #475569; margin-bottom: 8px;">${diagnosticData.diagnosis.description}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
          <div style="color: #64748b; font-size: 14px;">Investment: <strong>${diagnosticData.diagnosis.price}</strong></div>
          <div style="color: #64748b; font-size: 14px;">Timeline: <strong>${diagnosticData.diagnosis.duration}</strong></div>
        </div>
      </div>

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

    // Send email with diagnostic results
    console.log('📨 Sending email via Resend...');
    console.log('From: Lloyd | Growth Systems <lloyd@lloydgtm.com>');
    console.log('To:', diagnosticData.email);

    const result = await resend.emails.send({
      from: 'Lloyd | Growth Systems <lloyd@lloydgtm.com>',
      to: diagnosticData.email,
      subject: `Your Growth Diagnostic Results (Score: ${diagnosticData.overallScore}/100) 📊`,
      html: emailHTML
    });

    console.log(`✅ Diagnostic email sent successfully!`);
    console.log('Email ID:', result.data?.id);
    console.log('Recipient:', diagnosticData.email);
    console.log('Score:', diagnosticData.overallScore);

    return res.status(200).json({
      success: true,
      message: 'Diagnostic email sent successfully',
      emailId: result.data?.id
    });

  } catch (error: any) {
    console.error('❌ Error sending diagnostic email:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Log Resend-specific error details
    if (error.response) {
      console.error('Resend API response:', error.response);
    }

    return res.status(500).json({
      error: 'Failed to send diagnostic email',
      details: error.message,
      errorName: error.name
    });
  }
}
