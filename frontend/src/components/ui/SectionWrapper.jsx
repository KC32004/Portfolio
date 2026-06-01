import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function SectionWrapper({ children, className = '', id = '' }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`py-20 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="text-center mb-14">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 mb-3 uppercase tracking-widest">
        {label}
      </span>
      <h2 className="section-title gradient-text mb-3">{title}</h2>
      {subtitle && <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-balance">{subtitle}</p>}
    </div>
  )
}
