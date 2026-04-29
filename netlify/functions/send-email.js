/**
 * Netlify Serverless Function — Send Email via Resend REST API
 * 
 * Uses native fetch() — no npm dependencies required.
 * Set RESEND_API_KEY in the Netlify Environment Variables dashboard.
 */

function buildEmailTemplate(data) {
  const { name, email, phone, company, service, budget, message } = data;
  const date = new Date().toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Project Inquiry — Jay's Tech Hub</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family:'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f97316, #ea580c); padding:32px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:800; letter-spacing:-0.02em;">
                Jay's Tech Hub
              </h1>
              <p style="margin:8px 0 0; color:rgba(255,255,255,0.85); font-size:13px; font-weight:500; text-transform:uppercase; letter-spacing:0.1em;">
                New Project Inquiry
              </p>
            </td>
          </tr>

          <!-- Date Badge -->
          <tr>
            <td style="padding:24px 40px 0; text-align:center;">
              <span style="display:inline-block; background:#fff7ed; color:#c2410c; padding:6px 16px; border-radius:9999px; font-size:12px; font-weight:600; letter-spacing:0.03em;">
                📅 ${date}
              </span>
            </td>
          </tr>

          <!-- Client Details -->
          <tr>
            <td style="padding:28px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4e4e7; border-radius:12px; overflow:hidden;">

                <!-- Name -->
                <tr>
                  <td style="padding:14px 20px; background:#fafafa; border-bottom:1px solid #e4e4e7; width:140px;">
                    <span style="font-size:12px; font-weight:700; color:#71717a; text-transform:uppercase; letter-spacing:0.05em;">👤 Name</span>
                  </td>
                  <td style="padding:14px 20px; border-bottom:1px solid #e4e4e7;">
                    <span style="font-size:15px; font-weight:600; color:#18181b;">${escapeHtml(name)}</span>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding:14px 20px; background:#fafafa; border-bottom:1px solid #e4e4e7;">
                    <span style="font-size:12px; font-weight:700; color:#71717a; text-transform:uppercase; letter-spacing:0.05em;">📧 Email</span>
                  </td>
                  <td style="padding:14px 20px; border-bottom:1px solid #e4e4e7;">
                    <a href="mailto:${escapeHtml(email)}" style="font-size:15px; color:#f97316; text-decoration:none; font-weight:500;">${escapeHtml(email)}</a>
                  </td>
                </tr>

                ${phone ? `
                <!-- Phone -->
                <tr>
                  <td style="padding:14px 20px; background:#fafafa; border-bottom:1px solid #e4e4e7;">
                    <span style="font-size:12px; font-weight:700; color:#71717a; text-transform:uppercase; letter-spacing:0.05em;">📱 Phone</span>
                  </td>
                  <td style="padding:14px 20px; border-bottom:1px solid #e4e4e7;">
                    <a href="tel:${escapeHtml(phone)}" style="font-size:15px; color:#18181b; text-decoration:none;">${escapeHtml(phone)}</a>
                  </td>
                </tr>` : ''}

                ${company ? `
                <!-- Company -->
                <tr>
                  <td style="padding:14px 20px; background:#fafafa; border-bottom:1px solid #e4e4e7;">
                    <span style="font-size:12px; font-weight:700; color:#71717a; text-transform:uppercase; letter-spacing:0.05em;">🏢 Company</span>
                  </td>
                  <td style="padding:14px 20px; border-bottom:1px solid #e4e4e7;">
                    <span style="font-size:15px; color:#18181b;">${escapeHtml(company)}</span>
                  </td>
                </tr>` : ''}

                <!-- Service -->
                <tr>
                  <td style="padding:14px 20px; background:#fafafa; border-bottom:1px solid #e4e4e7;">
                    <span style="font-size:12px; font-weight:700; color:#71717a; text-transform:uppercase; letter-spacing:0.05em;">⚙️ Service</span>
                  </td>
                  <td style="padding:14px 20px; border-bottom:1px solid #e4e4e7;">
                    <span style="display:inline-block; background:#fff7ed; color:#c2410c; padding:4px 12px; border-radius:9999px; font-size:13px; font-weight:600;">${escapeHtml(service)}</span>
                  </td>
                </tr>

                ${budget ? `
                <!-- Budget -->
                <tr>
                  <td style="padding:14px 20px; background:#fafafa; border-bottom:1px solid #e4e4e7;">
                    <span style="font-size:12px; font-weight:700; color:#71717a; text-transform:uppercase; letter-spacing:0.05em;">💰 Budget</span>
                  </td>
                  <td style="padding:14px 20px; border-bottom:1px solid #e4e4e7;">
                    <span style="font-size:15px; font-weight:600; color:#18181b;">${escapeHtml(budget)}</span>
                  </td>
                </tr>` : ''}

              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:0 40px 28px;">
              <h3 style="margin:0 0 12px; font-size:14px; font-weight:700; color:#18181b; text-transform:uppercase; letter-spacing:0.05em;">
                💬 Project Details
              </h3>
              <div style="background:#fafafa; border:1px solid #e4e4e7; border-radius:12px; padding:20px; line-height:1.7; font-size:14px; color:#3f3f46; white-space:pre-wrap;">${escapeHtml(message || 'No additional details provided.')}</div>
            </td>
          </tr>

          <!-- Quick Actions -->
          <tr>
            <td style="padding:0 40px 32px; text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent("Re: Your Inquiry at Jay's Tech Hub")}" style="display:inline-block; background:linear-gradient(135deg,#f97316,#ea580c); color:#fff; padding:12px 28px; border-radius:9999px; text-decoration:none; font-size:14px; font-weight:600; box-shadow:0 4px 16px rgba(249,115,22,0.35);">
                      ✉️ Reply to Client
                    </a>
                  </td>
                  ${phone ? `
                  <td>
                    <a href="https://wa.me/${phone.replace(/[^0-9+]/g, '')}" style="display:inline-block; background:#25d366; color:#fff; padding:12px 28px; border-radius:9999px; text-decoration:none; font-size:14px; font-weight:600; box-shadow:0 4px 16px rgba(37,211,102,0.35);">
                      💬 WhatsApp
                    </a>
                  </td>` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#18181b; padding:24px 40px; text-align:center;">
              <p style="margin:0; font-size:13px; color:#a1a1aa;">
                Jay's Tech Hub Limited · RC 7475187
              </p>
              <p style="margin:6px 0 0; font-size:12px; color:#71717a;">
                This is an automated notification from your website contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server misconfigured — missing API key' }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const { name, email, service } = data;
  if (!name || !email || !service) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing required fields: name, email, service' }),
    };
  }

  const html = buildEmailTemplate(data);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "Jay's Tech Hub <onboarding@resend.dev>",
        to: ['jaystechub@gmail.com'],
        reply_to: email,
        subject: `New Inquiry: ${service} — from ${name}`,
        html,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend error:', result);
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: result.message || 'Failed to send email' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, id: result.id }),
    };
  } catch (err) {
    console.error('Fetch error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
