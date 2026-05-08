export type ToolCategory =
  | 'AI & LLMs'
  | 'Automation'
  | 'CRM & Sales'
  | 'Database & PM'
  | 'Communication'
  | 'Dev & Code'
  | 'Marketing & Finance'

export interface Tool {
  id: string
  name: string
  category: ToolCategory
  useCase: string
  abbr: string
  color: string
}

export const CATEGORY_COLORS: Record<ToolCategory, string> = {
  'AI & LLMs': '#7C3AED',
  'Automation': '#00D9FF',
  'CRM & Sales': '#F59E0B',
  'Database & PM': '#10B981',
  'Communication': '#3B82F6',
  'Dev & Code': '#EC4899',
  'Marketing & Finance': '#EF4444',
}

export const tools: Tool[] = [
  // AI & LLMs
  { id: 'openai', name: 'OpenAI', category: 'AI & LLMs', useCase: 'GPT-4 for intelligent text processing and decision-making', abbr: 'AI', color: '#10a37f' },
  { id: 'claude', name: 'Claude', category: 'AI & LLMs', useCase: 'Complex reasoning and analysis in automation pipelines', abbr: 'Cl', color: '#D4904E' },
  { id: 'claude-code', name: 'Claude Code', category: 'AI & LLMs', useCase: 'AI-assisted scripting and automation development', abbr: 'CC', color: '#7C3AED' },
  { id: 'elevenlabs', name: 'ElevenLabs', category: 'AI & LLMs', useCase: 'AI voice synthesis for automated voice notifications', abbr: 'EL', color: '#f5c518' },
  { id: 'vapi', name: 'Vapi', category: 'AI & LLMs', useCase: 'AI phone agent platform for automated voice workflows', abbr: 'Va', color: '#00D9FF' },
  // Automation
  { id: 'n8n', name: 'n8n', category: 'Automation', useCase: 'Self-hosted workflow automation for complex multi-step processes', abbr: 'n8', color: '#ea4b71' },
  { id: 'make', name: 'Make.com', category: 'Automation', useCase: 'Visual automation builder for connecting apps and APIs', abbr: 'Mk', color: '#9333ea' },
  { id: 'zapier', name: 'Zapier', category: 'Automation', useCase: 'Rapid automation across 6000+ app integrations', abbr: 'Zp', color: '#FF4A00' },
  { id: 'webhooks', name: 'Webhooks', category: 'Automation', useCase: 'Real-time event triggers between systems', abbr: '<>', color: '#10B981' },
  { id: 'rest-apis', name: 'REST APIs', category: 'Automation', useCase: 'Direct API integrations for custom workflow connections', abbr: 'API', color: '#00D9FF' },
  // CRM & Sales
  { id: 'ghl', name: 'GoHighLevel', category: 'CRM & Sales', useCase: 'All-in-one CRM and marketing automation for agencies', abbr: 'GHL', color: '#f97316' },
  { id: 'zoho', name: 'Zoho CRM', category: 'CRM & Sales', useCase: 'Enterprise CRM with deep workflow automation capabilities', abbr: 'Zo', color: '#e42527' },
  { id: 'apollo', name: 'Apollo.io', category: 'CRM & Sales', useCase: 'Lead intelligence and sales engagement automation', abbr: 'Ap', color: '#0062ff' },
  // Database & PM
  { id: 'airtable', name: 'Airtable', category: 'Database & PM', useCase: 'Flexible database for workflow data logging and tracking', abbr: 'At', color: '#18bfff' },
  { id: 'notion', name: 'Notion', category: 'Database & PM', useCase: 'Connected workspace for SOPs and process documentation', abbr: 'No', color: '#888888' },
  { id: 'supabase', name: 'Supabase', category: 'Database & PM', useCase: 'Postgres backend for storing and querying automation data', abbr: 'Sb', color: '#3ecf8e' },
  { id: 'jira', name: 'Jira', category: 'Database & PM', useCase: 'Issue tracking and project management workflow integration', abbr: 'Ji', color: '#0052cc' },
  { id: 'asana', name: 'Asana', category: 'Database & PM', useCase: 'Task management automation for team workflow handoffs', abbr: 'As', color: '#f06a6a' },
  // Communication
  { id: 'slack', name: 'Slack', category: 'Communication', useCase: 'Automated team notifications and alert routing', abbr: 'Sl', color: '#4a154b' },
  { id: 'whatsapp', name: 'WhatsApp', category: 'Communication', useCase: 'WhatsApp Business API for client communication automation', abbr: 'WA', color: '#25d366' },
  { id: 'twilio', name: 'Twilio', category: 'Communication', useCase: 'SMS and voice automation for notifications and alerts', abbr: 'Tw', color: '#f22f46' },
  { id: 'zoom', name: 'Zoom', category: 'Communication', useCase: 'Meeting scheduling and recording workflow automation', abbr: 'Zm', color: '#2d8cff' },
  { id: 'google-workspace', name: 'Google Workspace', category: 'Communication', useCase: 'Gmail, Sheets, Drive automation for business workflows', abbr: 'GW', color: '#4285f4' },
  { id: 'meta-api', name: 'Meta API', category: 'Communication', useCase: 'Facebook/Instagram messaging and lead form automation', abbr: 'Me', color: '#1877f2' },
  // Dev & Code
  { id: 'github', name: 'GitHub', category: 'Dev & Code', useCase: 'Version control and CI/CD workflow automation', abbr: 'GH', color: '#6e40c9' },
  { id: 'cursor', name: 'Cursor', category: 'Dev & Code', useCase: 'AI-powered IDE for rapid automation script development', abbr: 'Cu', color: '#00D9FF' },
  { id: 'wordpress', name: 'WordPress', category: 'Dev & Code', useCase: 'CMS integration for content and lead automation', abbr: 'WP', color: '#21759b' },
  // Marketing & Finance
  { id: 'ahrefs', name: 'Ahrefs', category: 'Marketing & Finance', useCase: 'SEO data automation for reporting workflows', abbr: 'Ah', color: '#ff7100' },
  { id: 'xero', name: 'Xero', category: 'Marketing & Finance', useCase: 'Accounting automation for invoice and payment workflows', abbr: 'Xe', color: '#13b5ea' },
]

export const toolCategories = Array.from(new Set(tools.map(t => t.category))) as ToolCategory[]
