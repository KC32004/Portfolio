import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Search, Tag } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { PROJECTS } from '../../data/portfolioData'

const colorTop = {
  blue: 'bg-blue-600', violet: 'bg-violet-600',
  amber: 'bg-amber-500', green: 'bg-emerald-600', teal: 'bg-teal-600'
}
const colorBadge = {
  blue:   'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/20',
  violet: 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/20',
  amber:  'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20',
  green:  'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20',
  teal:   'bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/20',
}
const categories = ['All', ...new Set(PROJECTS.map(p => p.category))]

function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="card overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className={`h-1.5 w-full ${colorTop[project.color] || 'bg-blue-600'}`} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className={`tag border ${colorBadge[project.color] || colorBadge.blue}`}>{project.category}</span>
          <span className="text-3xl font-bold font-display text-slate-100 dark:text-slate-800 select-none">{String(project.id).padStart(2,'0')}</span>
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-lg font-display mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{project.description}</p>
        <ul className="space-y-1 mb-4">
          {project.highlights.slice(0,3).map(h => (
            <li key={h} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-blue-500 mt-0.5 shrink-0">▸</span> {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(t => (
            <span key={t} className="tag bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-mono">{t}</span>
          ))}
        </div>
        <div className="flex gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Github size={14} /> GitHub
            </a>
          )}
          {project.demo
            ? <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"><ExternalLink size={14} /> Live Demo</a>
            : <span className="flex items-center gap-1.5 text-xs text-slate-300 dark:text-slate-700"><ExternalLink size={14} /> Demo soon</span>
          }
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const filtered = useMemo(() => PROJECTS.filter(p => {
    const matchCat = cat === 'All' || p.category === cat
    const q = search.toLowerCase()
    return matchCat && (!q || p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)))
  }), [search, cat])

  return (
    <SectionWrapper id="projects" className="section-alt">
      <div className="section-container">
        <SectionHeader label="My Work" title="Featured Projects" subtitle="Real applications built across AI, web development, and blockchain" />
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or tech..."
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  cat === c ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Tag size={11} /> {c}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg mb-1">No projects found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}
        <div className="text-center mt-10">
          <a href="https://github.com/KC32004" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Github size={18} /> View All on GitHub
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
