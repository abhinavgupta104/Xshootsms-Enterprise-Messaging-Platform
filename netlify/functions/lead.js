import crypto from 'crypto';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Sign a Google JWT using Node.js built-in crypto (no npm packages!)
function createJWT(email, privateKey) {
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({
        iss: email,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
    })).toString('base64url');

    const toSign = `${header}.${payload}`;
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(toSign);
    const signature = sign.sign(privateKey, 'base64url');
    return `${toSign}.${signature}`;
}

// Get a Google OAuth2 access token
async function getAccessToken(email, privateKey) {
    const jwt = createJWT(email, privateKey);
    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    });
    const data = await res.json();
    if (!res.ok) throw new Error('Auth failed: ' + JSON.stringify(data));
    return data.access_token;
}

// Append a row to Google Sheets via REST API
async function appendRow(accessToken, sheetId, values) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:F1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [values] }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error('Sheets API failed: ' + JSON.stringify(data));
    return data;
}

export const handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS_HEADERS, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS_HEADERS, body: 'Method Not Allowed' };

    try {
        const payload = JSON.parse(event.body || '{}');
        const { name, phone, email = 'N/A', source = 'Website Form' } = payload;

        if (!name || !phone) {
            return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Name and Phone are required.' }) };
        }

        const SERVICE_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '')
            .replace(/^"|"$/g, '')       // strip surrounding quotes
            .replace(/\\n/g, '\n');      // convert literal \n to real newlines
        const SHEET_ID = process.env.GOOGLE_SHEET_ID;

        if (!SERVICE_EMAIL || !PRIVATE_KEY || !SHEET_ID) {
            console.error('Missing env vars');
            return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Server configuration error' }) };
        }

        // Timestamp in IST
        const timestamp = new Intl.DateTimeFormat('en-IN', {
            timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short',
            day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        }).format(new Date());

        const attribution = [
            `utm_source=${payload.utm_source || ''}`,
            `utm_medium=${payload.utm_medium || ''}`,
            `utm_campaign=${payload.utm_campaign || ''}`,
            `utm_term=${payload.utm_term || ''}`,
            `utm_content=${payload.utm_content || ''}`,
            `gclid=${payload.gclid || ''}`,
            `landing_path=${payload.landing_path || ''}`,
        ].join(' | ');

        const notes = payload.message
            ? `${payload.message} | ${attribution}`
            : attribution;

        const accessToken = await getAccessToken(SERVICE_EMAIL, PRIVATE_KEY);
        await appendRow(accessToken, SHEET_ID, [timestamp, source, name, phone, email, notes]);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
            body: JSON.stringify({ success: true, message: 'Lead saved successfully.' })
        };

    } catch (error) {
        console.error('Error:', error.message);
        return {
            statusCode: 500,
            headers: CORS_HEADERS,
            body: JSON.stringify({ error: 'Internal Server Error', detail: error.message })
        };
    }
};
