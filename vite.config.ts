import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      {
        name: 'chat-api-dev',
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res, next) => {
            if (req.method !== 'POST') return next();

            let body = '';
            req.on('data', chunk => { body += chunk.toString() });
            req.on('end', async () => {
              try {
                const { messages, userInfo } = JSON.parse(body || '{}');
                const GROQ_API_KEY = env.GROQ_API_KEY;

                if (!GROQ_API_KEY) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Missing API Key' }));
                  return;
                }

                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                  },
                  body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
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
                res.setHeader('Content-Type', 'application/json');
                if (!response.ok) {
                  res.statusCode = response.status;
                  res.end(JSON.stringify({ error: data.error?.message || 'API Error' }));
                } else {
                  res.end(JSON.stringify({ reply: data.choices[0].message.content }));
                }
              } catch (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
              }
            });
          });

          server.middlewares.use('/api/lead', (req, res, next) => {
            if (req.method !== 'POST') return next();

            let body = '';
            req.on('data', chunk => { body += chunk.toString() });
            req.on('end', async () => {
              try {
                const payload = JSON.parse(body || '{}');
                const { name, phone, email = "N/A", source = "Website Form" } = payload;
                if (!name || !phone) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Name and Phone are required' }));
                  return;
                }

                const GOOGLE_SERVICE_ACCOUNT_EMAIL = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
                const GOOGLE_PRIVATE_KEY = env.GOOGLE_PRIVATE_KEY;
                const GOOGLE_SHEET_ID = env.GOOGLE_SHEET_ID;

                if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Missing Credentials' }));
                  return;
                }

                const formattedPrivateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

                const { GoogleSpreadsheet } = await import('google-spreadsheet');
                const { JWT } = await import('google-auth-library');

                const serviceAccountAuth = new JWT({
                  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
                  key: formattedPrivateKey,
                  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                });

                const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
                await doc.loadInfo();
                const sheet = doc.sheetsByIndex[0];
                await sheet.loadHeaderRow();

                const dateOptions = { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
                const timestamp = new Intl.DateTimeFormat('en-IN', dateOptions as any).format(new Date());

                await sheet.addRow({
                  'Timestamp': timestamp,
                  'Source': source,
                  'Name': name,
                  'Phone': phone,
                  'Email': email,
                  'Message': payload.message || "N/A"
                }, { insert: true });

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                console.error(error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
              }
            });
          });
        }
      }
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "es2015",
      minify: 'terser' as const,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 2,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            // Core React - loaded first
            if (id.includes('react-dom')) return 'vendor-react';
            if (id.includes('react-router')) return 'vendor-react';
            if (id.includes('node_modules/react/')) return 'vendor-react';

            // Animation library - heavy, separate chunk
            if (id.includes('framer-motion')) return 'vendor-animation';

            // UI libraries
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@radix-ui')) return 'vendor-ui';

            // Charts - only used on specific pages
            if (id.includes('recharts')) return 'vendor-charts';

            // Analytics - deferred
            if (id.includes('react-ga4')) return 'vendor-analytics';
            if (id.includes('react-helmet')) return 'vendor-seo';
          },
        },
      },
    },
  };
});
