import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function SectionWrapper({ children, className = '', id = '' }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <motion.section id={id} ref={ref}
      initial={{ opacity:0, y:28 }}
      animate={isVisible ? { opacity:1, y:0 } : { opacity:0, y:28 }}
      transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
      className={`py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      {eyebrow && (
        <div className="section-eyebrow mb-3 justify-center">
          <span className="w-6 h-0.5 bg-indigo-500 rounded-full" />
          {eyebrow}
          <span className="w-6 h-0.5 bg-indigo-500 rounded-full" />
        </div>
      )}
      <h2 className="heading-md text-gradient mb-3">{title}</h2>
      {subtitle && <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">{subtitle}</p>}
    </div>
  )
}
