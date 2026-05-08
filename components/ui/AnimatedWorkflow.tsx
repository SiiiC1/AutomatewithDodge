'use client'
import { motion } from 'framer-motion'

interface AnimatedWorkflowProps {
  accentColor: string
}

const NODES = ['Trigger', 'AI', 'Route', 'Notify']
const NODE_Y = 48
const VIEWBOX_W = 480
const SPACING = VIEWBOX_W / (NODES.length + 1)

export function AnimatedWorkflow({ accentColor }: AnimatedWorkflowProps) {
  const positions = NODES.map((_, i) => SPACING * (i + 1))

  return (
    <div className="w-full h-20 overflow-hidden">
      <svg
        viewBox={`0 0 ${VIEWBOX_W} 96`}
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Dashed connection lines */}
        {positions.slice(0, -1).map((x, i) => (
          <line
            key={`line-${i}`}
            x1={x + 22}
            y1={NODE_Y}
            x2={positions[i + 1] - 22}
            y2={NODE_Y}
            stroke={accentColor}
            strokeWidth={1.5}
            strokeOpacity={0.35}
            strokeDasharray="4 3"
          />
        ))}

        {/* Node circles */}
        {positions.map((x, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={x}
              cy={NODE_Y}
              r={20}
              fill="transparent"
              stroke={accentColor}
              strokeWidth={1.5}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 2.5,
                delay: i * 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <text
              x={x}
              y={NODE_Y + 4}
              textAnchor="middle"
              fontSize={9}
              fill={accentColor}
              fontFamily="Inter, sans-serif"
              fontWeight="500"
            >
              {NODES[i]}
            </text>
          </g>
        ))}

        {/* Traveling pulse dot */}
        <motion.circle
          cy={NODE_Y}
          r={5}
          fill={accentColor}
          initial={{ cx: positions[0], opacity: 0 }}
          animate={{
            cx: [...positions, positions[positions.length - 1]],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0.8,
            times: [0, 0.1, 0.5, 0.9, 1],
          }}
        />
      </svg>
    </div>
  )
}
