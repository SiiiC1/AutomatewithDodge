export interface WorkflowResult {
  label: string
  value: string
}

export interface Workflow {
  id: string
  title: string
  subtitle: string
  accentColor: string
  results: WorkflowResult[]
  problem: string
  solution: string
  steps: string[]
}

export const workflows: Workflow[] = [
  {
    id: 'ai-ticketing',
    title: 'AI Ticketing Route',
    subtitle: 'From support chaos to instant routing — fully automated ticket management',
    accentColor: '#00D9FF',
    results: [
      { label: 'Saved per week', value: '6–8 hrs' },
      { label: 'Faster routing', value: '80%' },
      { label: 'Team efficiency', value: '3x' },
    ],
    problem:
      'Support tickets pile up in a single inbox with no clear ownership. Every submission needs manual review to determine which department should handle it. Tickets get misrouted or delayed. Finance questions go to Tech. Urgent issues sit unnoticed. Teams lose track of their queue. Customers wait hours for basic acknowledgment.',
    solution:
      'A fully automated AI-powered routing system that analyzes every support ticket instantly and sends it to the right department — with zero manual sorting. No inbox confusion. No misrouted requests. No delayed responses. Just intelligent, instant ticket distribution with automatic acknowledgment.',
    steps: [
      'Analyzes incoming support tickets using AI to determine department',
      'Routes automatically to the correct team (Finance, Tech, Sales, Management)',
      'Sends real-time Slack notifications to department-specific channels',
      'Updates dedicated Google Sheet tracker for each department',
      'Generates and sends professional acknowledgment email via Gmail',
      'Detects urgent tickets and triggers escalation alerts',
      'Maintains complete ticket history and status tracking',
    ],
  },
  {
    id: 'accounts-payable',
    title: 'Accounts Payable Email Automation',
    subtitle: 'From inbox overwhelm to instant processing — fully automated invoice management',
    accentColor: '#7C3AED',
    results: [
      { label: 'Saved per week', value: '8–10 hrs' },
      { label: 'Faster processing', value: '85%' },
      { label: 'Payment accuracy', value: '2.5x' },
    ],
    problem:
      'Invoice emails flood the finance inbox daily. Each one requires manual review, data entry into spreadsheets, and team notifications. Extracting vendor names, amounts, due dates, and invoice numbers takes hours. High-value invoices slip through without proper alerts. Payment deadlines get missed. The finance team drowns in repetitive data entry instead of strategic work.',
    solution:
      'A fully automated invoice processing system that monitors Gmail 24/7, extracts all critical invoice data using AI, and logs everything instantly — with zero manual data entry. No missed invoices. No late payments. No spreadsheet drudgery. Just intelligent extraction, automatic logging, and smart alerts for high-value items.',
    steps: [
      'Monitors Gmail continuously for incoming invoices and payment requests',
      'Extracts invoice fields automatically (vendor, amount, due date, invoice #)',
      'Parses and validates data using AI before logging',
      'Updates Google Sheets with complete invoice details in real-time',
      'Sends Slack notifications to finance channel for every invoice logged',
      'Triggers high-value alerts when amounts exceed threshold',
      'Maintains searchable invoice history with all critical data points',
    ],
  },
  {
    id: 'lead-qualification',
    title: 'AI Lead Qualification & Sales Automation',
    subtitle: 'From lead chaos to instant prioritization — fully automated qualification system',
    accentColor: '#10B981',
    results: [
      { label: 'Saved per week', value: '10–12 hrs' },
      { label: 'Faster qualification', value: '70%' },
      { label: 'Conversion rates', value: '2x' },
    ],
    problem:
      'Every lead from your webhook gets the same treatment regardless of quality. Sales teams waste hours manually reviewing and scoring each submission. Hot leads with high buying intent sit in the queue alongside cold tire-kickers. No automatic prioritization. No instant routing. Revenue opportunities cool down while reps dig through unqualified prospects.',
    solution:
      'A fully automated AI-powered lead qualification engine that analyzes every submission instantly, scores buying intent, and routes hot prospects to sales while cold leads get nurture sequences — with zero manual review. No missed opportunities. No wasted sales time. No revenue leakage.',
    steps: [
      'Analyzes incoming leads using AI to determine temperature (Hot/Warm/Cold)',
      'Scores buying intent strength and qualification criteria automatically',
      'Merges lead data with AI-generated qualification insights',
      'Routes hot leads instantly to sales team via Slack and email alerts',
      'Sends warm leads to appropriate nurture workflows and CRM tracking',
      'Directs cold leads to long-term education sequences',
      'Updates Google Sheets and CRM with complete lead intelligence in real-time',
    ],
  },
  {
    id: 'gmail-sorting',
    title: 'Gmail Sorting and Response System',
    subtitle: 'From inbox overload to intelligent triage — fully automated email management',
    accentColor: '#F59E0B',
    results: [
      { label: 'Saved per week', value: '8–10 hrs' },
      { label: 'Faster response', value: '75%' },
      { label: 'Inbox efficiency', value: '2.5x' },
    ],
    problem:
      'Every email hits your inbox demanding immediate attention. Sorting through hundreds of messages daily to find what actually needs human response eats hours. Simple queries sit alongside complex decisions with no clear prioritization. Response times lag. Important emails get buried. The inbox becomes a productivity black hole.',
    solution:
      'A fully automated AI-powered email management system that analyzes every incoming Gmail message, extracts key details, determines response complexity, and either replies automatically or routes to the right person — with zero inbox chaos.',
    steps: [
      'Monitors Gmail continuously and analyzes each incoming email with AI',
      'Extracts sender details, subject, key content, and intent automatically',
      'Generates comprehensive email summaries for quick review',
      'Determines if AI can handle the response or human expertise is required',
      'Sends automated AI-generated replies for simple/routine inquiries',
      'Routes complex emails to Slack with context for human response needed',
      'Logs all emails to Google Sheets with complete metadata and AI analysis',
      'Maintains searchable email history with response status tracking',
    ],
  },
]
