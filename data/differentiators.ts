export interface Differentiator {
  id: string
  icon: string
  title: string
  description: string
}

export const differentiators: Differentiator[] = [
  {
    id: 'no-code-first',
    icon: 'Code2',
    title: 'No-Code First Philosophy',
    description:
      'Empowering teams to maintain their own automation without developer dependency. I build systems your team can actually own.',
  },
  {
    id: 'roi-focused',
    icon: 'TrendingUp',
    title: 'ROI-Focused Implementation',
    description:
      'Every workflow justified by clear business metrics before a single node is built. If the ROI isn\'t obvious, we don\'t build it.',
  },
  {
    id: 'scalable',
    icon: 'Layers',
    title: 'Scalable Architecture',
    description:
      'Build once, grow infinitely. Systems designed to handle 10x volume without rebuilding — proper foundations from day one.',
  },
  {
    id: 'human-centered',
    icon: 'Users',
    title: 'Human-Centered Design',
    description:
      'Automation that enhances your team\'s capabilities, not replaces their judgment. People and systems working together.',
  },
]
