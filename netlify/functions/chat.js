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

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: CORS_HEADERS, body: 'Method Not Allowed' };
    }

    try {
        const { messages, userInfo } = JSON.parse(event.body || '{}');
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        if (!GROQ_API_KEY) {
            console.error('Missing GROQ_API_KEY environment variable');
            return {
                statusCode: 500,
                headers: CORS_HEADERS,
                body: JSON.stringify({ error: 'Server configuration error' })
            };
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant', // Fast and accurate model on Groq
                messages: [
                    {
                        role: 'system',
                        content: `You are the official AI assistant for XshootSMS, an advanced, enterprise-grade Bulk SMS & Messaging platform.
Your tone must be helpful, professional, and slightly enthusiastic. 
When explaining features, sound knowledgeable but keep answers easy to understand and well-formatted using Markdown (bolding, lists). 

${userInfo ? `CRITICAL CONTEXT:
The user you are speaking to is named "${userInfo.name}" and their phone number is "${userInfo.phone}". Address them by name occasionally to feel personal.` : ''}

Core Knowledge:
- **Services:** Bulk SMS (Promotional & Transactional), WhatsApp Business API, Voice Calls, RCS Messaging.
- **Key Features:** Real-time analytics, DLT compliance support, API integration, 99.9% uptime, deep targeting, fast delivery.
- **Pricing:** Flexible Pay-as-you-go. For exact pricing details or custom enterprise plans, direct the user to the Pricing page or tell them to Contact Sales.
- **API:** We have robust Developer APIs for integrating with CRMs and applications.

If you don't know the answer to a very specific technical query, direct them to contact our support team.`
                    },
                    ...messages
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Grok API Error:', data);
            return {
                statusCode: response.status,
                headers: CORS_HEADERS,
                body: JSON.stringify({ error: data.error?.message || 'Failed to communicate with Grok API' })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                ...CORS_HEADERS,
            },
            body: JSON.stringify({ reply: data.choices[0].message.content })
        };
    } catch (error) {
        console.error('Chat function error:', error);
        return {
            statusCode: 500,
            headers: CORS_HEADERS,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

