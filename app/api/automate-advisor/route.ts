import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert business automation consultant embedded in the portfolio of Dodge, a specialist in AI-powered workflow automation. You have deep knowledge of n8n, Zapier, Make (Integromat), Python scripting, RPA tools (UiPath, Automation Anywhere), and AI-powered workflows using GPT and other LLMs.

When a user describes their workflow problem, respond with a structured analysis in this exact JSON format:

{
  "summary": "One sentence capturing the core pain point",
  "automationApproach": {
    "recommended": "Name of the best tool/approach (e.g., n8n + OpenAI API)",
    "reasoning": "2-3 sentences explaining why this is the best fit",
    "alternatives": ["alternative 1", "alternative 2"]
  },
  "steps": [
    { "step": 1, "title": "Step title", "description": "What happens in this step" }
  ],
  "estimatedTimeSaving": "e.g., 4-6 hours per week",
  "complexity": "Low | Medium | High",
  "aiEnhancement": "Specific way AI can augment this workflow",
  "quickWin": "The single highest-impact first action to take"
}

Keep steps to 3-5 items. Be specific and actionable. If the problem is too vague, make reasonable assumptions and state them in the reasoning field. Always find an angle where AI adds value — this is a portfolio demonstration of Dodge's automation expertise. Respond only with the JSON object, no prose before or after.`;

async function notifyDiscord(problem: string, raw: string): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('[discord] DISCORD_WEBHOOK_URL is not set');
    return;
  }

  let recommended = 'N/A';
  let complexity = 'N/A';
  let timeSaving = 'N/A';

  try {
    const parsed = JSON.parse(raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
    recommended = parsed?.automationApproach?.recommended ?? recommended;
    complexity = parsed?.complexity ?? complexity;
    timeSaving = parsed?.estimatedTimeSaving ?? timeSaving;
  } catch (e) {
    console.error('[discord] JSON parse failed:', e);
  }

  const preview = problem.length > 200 ? problem.slice(0, 200) + '…' : problem;

  console.log('[discord] sending notification...');
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [
        {
          title: '⚡ New SiiiC Analysis',
          color: 0x00d9ff,
          fields: [
            { name: '📋 Problem', value: preview, inline: false },
            { name: '✅ Recommended', value: recommended, inline: true },
            { name: '🔧 Complexity', value: complexity, inline: true },
            { name: '⏱ Time Saved', value: timeSaving, inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });
  console.log('[discord] response status:', res.status);
}

export async function POST(req: NextRequest) {
  try {
    const { problem } = await req.json();

    if (!problem || typeof problem !== 'string' || problem.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please describe your workflow problem in more detail.' },
        { status: 400 }
      );
    }

    if (problem.length > 2000) {
      return NextResponse.json(
        { error: 'Description too long. Please keep it under 2000 characters.' },
        { status: 400 }
      );
    }

    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Here is my workflow problem:\n\n${problem.trim()}\n\nPlease analyze this and provide your automation recommendation in the specified JSON format.`,
        },
      ],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        let accumulated = '';
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? '';
            if (text) {
              accumulated += text;
              controller.enqueue(encoder.encode(text));
            }
          }
          await notifyDiscord(problem.trim(), accumulated);
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new NextResponse(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err) {
    console.error('[automate-advisor]', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again shortly.' },
      { status: 500 }
    );
  }
}
