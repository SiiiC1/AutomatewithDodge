'use client';

import { useRef, useState } from 'react';
import { useInView, motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Clock,
  BarChart3,
  ChevronRight,
  Loader2,
  Sparkles,
  AlertCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────

interface AutomationStep {
  step: number;
  title: string;
  description: string;
}

interface AutomationAnalysis {
  summary: string;
  automationApproach: {
    recommended: string;
    reasoning: string;
    alternatives: string[];
  };
  steps: AutomationStep[];
  estimatedTimeSaving: string;
  complexity: 'Low' | 'Medium' | 'High';
  aiEnhancement: string;
  quickWin: string;
}

// ── Sub-components ──────────────────────────────────────────────────────────

const COMPLEXITY_COLORS: Record<string, string> = {
  Low: 'text-accent border-accent/30 bg-accent/10',
  Medium: 'text-primary border-primary/30 bg-primary/10',
  High: 'text-secondary border-secondary/30 bg-secondary/10',
};

function ComplexityBadge({ level }: { level: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        COMPLEXITY_COLORS[level] ?? 'text-light/60 border-mid bg-mid/40'
      }`}
    >
      {level} Complexity
    </span>
  );
}

function StreamingText({ text }: { text: string }) {
  return (
    <span>
      {text}
      <motion.span
        className="inline-block w-0.5 h-3.5 ml-0.5 align-middle rounded-full bg-primary"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      />
    </span>
  );
}

function ResultCard({ analysis, isStreaming }: { analysis: AutomationAnalysis; isStreaming: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-5"
    >
      {/* Summary banner */}
      <div
        className="rounded-xl p-4 border"
        style={{
          background: 'rgba(0,217,255,0.05)',
          borderColor: 'rgba(0,217,255,0.2)',
        }}
      >
        <p className="text-sm text-light/80 leading-relaxed">
          <span className="text-primary font-semibold">Analysis: </span>
          {isStreaming && !analysis.automationApproach?.recommended ? (
            <StreamingText text={analysis.summary} />
          ) : (
            analysis.summary
          )}
        </p>
      </div>

      {/* Recommended approach */}
      <AnimatePresence>
        {analysis.automationApproach?.recommended && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.35 }}
            className="rounded-xl p-5 border space-y-3 overflow-hidden"
            style={{
              background: 'rgba(4,6,16,0.4)',
              borderColor: 'rgba(0,217,255,0.12)',
            }}
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs text-light/40 uppercase tracking-widest mb-1">
                  Recommended Approach
                </p>
                <p className="text-lg font-heading font-semibold text-primary">
                  {analysis.automationApproach.recommended}
                </p>
              </div>
              {analysis.complexity && <ComplexityBadge level={analysis.complexity} />}
            </div>
            {analysis.automationApproach.reasoning && (
              <p className="text-sm text-light/70 leading-relaxed">
                {analysis.automationApproach.reasoning}
              </p>
            )}
            {analysis.automationApproach.alternatives?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs text-light/40">Alternatives:</span>
                {analysis.automationApproach.alternatives.map((alt) => (
                  <span
                    key={alt}
                    className="text-xs px-2 py-0.5 rounded border text-light/50 border-mid/60"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps */}
      <AnimatePresence>
        {analysis.steps?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <p className="text-xs text-light/40 uppercase tracking-widest mb-3">
              Implementation Steps
            </p>
            {analysis.steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                className="flex gap-3 items-start rounded-lg p-3 border"
                style={{
                  background: 'rgba(30,58,95,0.15)',
                  borderColor: 'rgba(0,217,255,0.07)',
                }}
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(0,217,255,0.15)',
                    color: '#00D9FF',
                  }}
                >
                  {s.step}
                </span>
                <div>
                  <p className="text-sm font-medium text-light/90">{s.title}</p>
                  {s.description && (
                    <p className="text-xs text-light/55 mt-0.5 leading-relaxed">{s.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics row */}
      <AnimatePresence>
        {(analysis.estimatedTimeSaving || analysis.aiEnhancement) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {analysis.estimatedTimeSaving && (
              <div
                className="rounded-xl p-4 border flex items-start gap-3"
                style={{
                  background: 'rgba(16,185,129,0.05)',
                  borderColor: 'rgba(16,185,129,0.2)',
                }}
              >
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-light/40 uppercase tracking-wider mb-0.5">
                    Time Saved
                  </p>
                  <p className="text-sm font-semibold text-accent">
                    {analysis.estimatedTimeSaving}
                  </p>
                </div>
              </div>
            )}
            {analysis.aiEnhancement && (
              <div
                className="rounded-xl p-4 border flex items-start gap-3"
                style={{
                  background: 'rgba(124,58,237,0.05)',
                  borderColor: 'rgba(124,58,237,0.2)',
                }}
              >
                <Sparkles className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-light/40 uppercase tracking-wider mb-0.5">
                    AI Enhancement
                  </p>
                  <p className="text-xs text-light/70 leading-relaxed">{analysis.aiEnhancement}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick win */}
      <AnimatePresence>
        {analysis.quickWin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl p-4 border flex gap-3 items-start"
            style={{
              background: 'rgba(0,217,255,0.03)',
              borderColor: 'rgba(0,217,255,0.15)',
            }}
          >
            <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">
                Quick Win — Start Here
              </p>
              <p className="text-sm text-light/75">
                {isStreaming ? (
                  <StreamingText text={analysis.quickWin} />
                ) : (
                  analysis.quickWin
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Streaming JSON parser ───────────────────────────────────────────────────

function parseStreamingJson(raw: string): Partial<AutomationAnalysis> {
  const cleaned = raw
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const result: Partial<AutomationAnalysis> = {};

    const summaryMatch = cleaned.match(/"summary"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (summaryMatch) result.summary = summaryMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');

    const recommendedMatch = cleaned.match(/"recommended"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    const reasoningMatch = cleaned.match(/"reasoning"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);

    if (recommendedMatch || reasoningMatch) {
      result.automationApproach = {
        recommended: recommendedMatch ? recommendedMatch[1].replace(/\\"/g, '"') : '',
        reasoning: reasoningMatch
          ? reasoningMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n')
          : '',
        alternatives: [],
      };

      const altMatch = cleaned.match(/"alternatives"\s*:\s*\[([^\]]*)\]/);
      if (altMatch) {
        result.automationApproach.alternatives = altMatch[1]
          .split(',')
          .map((s) => s.trim().replace(/^"|"$/g, ''))
          .filter(Boolean);
      }
    }

    const complexityMatch = cleaned.match(/"complexity"\s*:\s*"(Low|Medium|High)"/);
    if (complexityMatch) result.complexity = complexityMatch[1] as 'Low' | 'Medium' | 'High';

    const timeSavingMatch = cleaned.match(/"estimatedTimeSaving"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (timeSavingMatch) result.estimatedTimeSaving = timeSavingMatch[1].replace(/\\"/g, '"');

    const aiEnhancementMatch = cleaned.match(/"aiEnhancement"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (aiEnhancementMatch)
      result.aiEnhancement = aiEnhancementMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');

    const quickWinMatch = cleaned.match(/"quickWin"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
    if (quickWinMatch)
      result.quickWin = quickWinMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');

    const stepsMatch = cleaned.match(/"steps"\s*:\s*\[[\s\S]*?(?:\]|$)/);
    if (stepsMatch) {
      const stepMatches = [...stepsMatch[0].matchAll(/\{[^{}]*"step"\s*:\s*(\d+)[^{}]*\}/g)];
      if (stepMatches.length > 0) {
        result.steps = stepMatches.map((m) => {
          const stepObj = m[0];
          const stepNum = parseInt(m[1], 10);
          const titleM = stepObj.match(/"title"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
          const descM = stepObj.match(/"description"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
          return {
            step: stepNum,
            title: titleM ? titleM[1].replace(/\\"/g, '"') : '',
            description: descM ? descM[1].replace(/\\"/g, '"').replace(/\\n/g, '\n') : '',
          };
        });
      }
    }

    return result;
  }
}

// ── Main Section ────────────────────────────────────────────────────────────

const PLACEHOLDER_PROBLEMS = [
  'Our sales team manually copies leads from LinkedIn into HubSpot every morning. It takes about 2 hours and errors creep in constantly...',
  'We generate weekly reports by pulling data from 4 spreadsheets and copy-pasting into a slide deck. Takes half a day every Friday...',
  'Customer support emails arrive and we manually read, categorize, and assign them to the right team member. Volume is 200+ per day...',
];

export default function AutomationAdvisor() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [analysis, setAnalysis] = useState<Partial<AutomationAnalysis> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [placeholder] = useState(
    () => PLACEHOLDER_PROBLEMS[Math.floor(Math.random() * PLACEHOLDER_PROBLEMS.length)]
  );

  const charCount = problem.length;
  const isReady = charCount >= 10 && charCount <= 2000;
  const showResult = analysis !== null && (analysis.summary || isStreaming);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isReady || loading) return;

    setLoading(true);
    setIsStreaming(false);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch('/api/automate-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Request failed');
      }

      const contentType = res.headers.get('content-type') ?? '';
      if (contentType.includes('text/plain')) {
        setIsStreaming(true);
        setLoading(false);
        setAnalysis({});

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            accumulated += decoder.decode(value, { stream: true });
            const parsed = parseStreamingJson(accumulated);
            if (Object.keys(parsed).length > 0) {
              setAnalysis(parsed);
            }
          }
          setAnalysis(parseStreamingJson(accumulated));
        }
      } else {
        const data = await res.json();
        setAnalysis(data.analysis);
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    } finally {
      setIsStreaming(false);
    }
  }

  function handleReset() {
    setAnalysis(null);
    setError(null);
    setProblem('');
    setIsStreaming(false);
  }

  return (
    <section
      ref={ref}
      id="automation-advisor"
      className="section-padding relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(124,58,237,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Live Demo</p>
          <h2 className="font-heading text-h2 font-bold text-light mb-4">
            Automation{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 100%)',
              }}
            >
              Advisor
            </span>
          </h2>
          <p className="text-light/60 text-base leading-relaxed max-w-xl mx-auto">
            Describe a repetitive workflow that costs your team time. Claude will analyze it
            and recommend the best automation approach — live, right here.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          initial={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 sm:p-8 border"
          style={{
            background: 'rgba(4,6,16,0.5)',
            borderColor: 'rgba(0,217,255,0.1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="workflow-problem"
                    className="block text-sm font-medium text-light/70"
                  >
                    Describe your workflow problem
                  </label>
                  <div className="relative">
                    <textarea
                      id="workflow-problem"
                      rows={5}
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      placeholder={placeholder}
                      disabled={loading}
                      className="w-full rounded-xl px-4 py-3 text-sm text-light/90 placeholder:text-light/25 resize-none outline-none transition-all duration-200 disabled:opacity-50"
                      style={{
                        background: 'rgba(30,58,95,0.3)',
                        border: '1px solid rgba(0,217,255,0.12)',
                        caretColor: '#00D9FF',
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = 'rgba(0,217,255,0.35)')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = 'rgba(0,217,255,0.12)')
                      }
                    />
                    <span
                      className={`absolute bottom-2.5 right-3 text-xs tabular-nums pointer-events-none ${
                        charCount > 1800 ? 'text-red-400' : 'text-light/30'
                      }`}
                    >
                      {charCount}/2000
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-2 text-sm text-red-400 rounded-lg px-3 py-2.5 border border-red-500/20 bg-red-500/5 overflow-hidden"
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={!isReady || loading}
                  whileHover={
                    isReady && !loading
                      ? { scale: 1.02, boxShadow: '0 0 28px rgba(0,217,255,0.25)' }
                      : {}
                  }
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background:
                      isReady && !loading
                        ? 'linear-gradient(135deg, rgba(0,217,255,0.15) 0%, rgba(124,58,237,0.15) 100%)'
                        : 'rgba(30,58,95,0.3)',
                    border: '1px solid rgba(0,217,255,0.3)',
                    color: '#00D9FF',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing your workflow…
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Analyze My Workflow
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                <div className="flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-light/25" />
                  <p className="text-center text-xs text-light/25">
                    Powered by{' '}
                    <span className="text-light/40 font-medium">OpenAI</span>
                    {' '}via GPT-4o mini
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-light/80">
                      Automation Analysis
                    </span>
                    {isStreaming && (
                      <span className="flex items-center gap-1 text-xs text-primary/70">
                        <motion.span
                          className="inline-block w-1.5 h-1.5 rounded-full bg-primary"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        Generating…
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-light/40 hover:text-primary transition-colors duration-150"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Analyze another
                  </button>
                </div>

                {analysis && Object.keys(analysis).length > 0 && (
                  <ResultCard
                    analysis={analysis as AutomationAnalysis}
                    isStreaming={isStreaming}
                  />
                )}

                {isStreaming && !analysis?.summary && (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="h-4 rounded-full"
                        style={{ background: 'rgba(30,58,95,0.4)', width: `${100 - i * 12}%` }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                )}

                <div
                  className="flex items-center justify-center gap-1.5 pt-2 border-t"
                  style={{ borderColor: 'rgba(0,217,255,0.06)' }}
                >
                  <Sparkles className="w-3 h-3 text-light/20" />
                  <p className="text-xs text-light/20">
                    Powered by <span className="text-light/30 font-medium">OpenAI</span> via GPT-4o mini
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
