import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: CORS_HEADERS, body: '' };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: CORS_HEADERS, body: 'Method Not Allowed' };
    }

    try {
        const payload = JSON.parse(event.body || '{}');
        const { name, phone, email = "N/A", source = "Website Form" } = payload;

        // Basic validation
        if (!name || !phone) {
            return {
                statusCode: 400,
                headers: CORS_HEADERS,
                body: JSON.stringify({ error: 'Name and Phone are required.' })
            };
        }

        // Load Environment Variables
        const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
        const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

        // Check if configuration exists
        if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
            console.error("Missing Google Sheets credentials in Environment Variables.");
            return {
                statusCode: 500,
                headers: CORS_HEADERS,
                body: JSON.stringify({ error: 'Server configuration error' })
            };
        }

        // Format the private key (handles Netlify env var newline escaping)
        const formattedPrivateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

        // Initialize auth
        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: formattedPrivateKey,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        // Initialize the doc
        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        await sheet.loadHeaderRow();

        // Format Date to Indian Standard Time (IST)
        const dateOptions = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const timestamp = new Intl.DateTimeFormat('en-IN', dateOptions).format(new Date());

        // Append a new row
        await sheet.addRow({
            'Timestamp': timestamp,
            'Source': source,
            'Name': name,
            'Phone': phone,
            'Email': email,
            'Message': payload.message || "N/A"
        }, { insert: true });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                ...CORS_HEADERS,
            },
            body: JSON.stringify({ success: true, message: 'Lead saved successfully.' })
        };

    } catch (error) {
        console.error('Error saving lead to Google Sheets:', error);
        return {
            statusCode: 500,
            headers: CORS_HEADERS,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

