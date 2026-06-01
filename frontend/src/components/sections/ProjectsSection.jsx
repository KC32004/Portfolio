import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Search } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { PROJECTS } from '../../data/portfolioData'

const tops = { blue:'from-indigo-500 to-blue-500', violet:'from-purple-500 to-violet-500', amber:'from-amber-400 to-orange-500', green:'from-emerald-500 to-teal-500', teal:'from-teal-500 to-cyan-500' }
const badges = { blue:'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300', violet:'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300', amber:'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300', green:'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', teal:'bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300' }
const cats = ['All', ...new Set(PROJECTS.map(p => p.category))]

function Card({ p, i }) {
  return (
    <motion.div layout
      initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
      transition={{ duration:0.35, delay:i*0.05 }}
      className="card-hover flex flex-col overflow-hidden group"
    >
      <div className={`h-1.5 bg-gradient-to-r ${tops[p.color]||tops.blue}`} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${badges[p.color]||badges.blue}`}>{p.category}</span>
          <span className="text-4xl font-bold font-display text-slate-100 dark:text-slate-800 select-none leading-none">{String(p.id).padStart(2,'0')}</span>
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{p.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{p.description}</p>
        <ul className="space-y-1 mb-4">
          {p.highlights.slice(0,3).map(h => (
            <li key={h} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>{h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.map(t => <span key={t} className="pill-gray text-xs">{t}</span>)}
        </div>
        <div className="flex gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Github size={13}/> GitHub</a>}
          {p.demo ? <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"><ExternalLink size={13}/> Live</a>
            : <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 dark:text-slate-700"><ExternalLink size={13}/> Demo soon</span>}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const filtered = useMemo(() => PROJECTS.filter(p =>
    (cat==='All'||p.category===cat) && (!q || p.title.toLowerCase().includes(q.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(q.toLowerCase())))
  ), [q, cat])

  return (
    <SectionWrapper id="projects" className="section-gray">
      <div className="container-xl">
        <SectionHeader eyebrow="My Work" title="Featured Projects" subtitle="Real applications spanning AI, full-stack development, and blockchain" />
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search projects..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${cat===c ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500'}`}
              >{c}</button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <Card key={p.id} p={p} i={i} />)}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && <p className="text-center py-16 text-slate-400">No projects match that search.</p>}
        <div className="text-center mt-10">
          <a href="https://github.com/KC32004" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github size={16}/> View All on GitHub
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
