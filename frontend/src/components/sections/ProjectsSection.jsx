import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Search, Tag } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { PROJECTS } from '../../data/portfolioData'

const colorMap = {
  blue: { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', glow: 'shadow-blue-500/10', accent: 'from-blue-600 to-blue-700' },
  violet: { badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20', glow: 'shadow-violet-500/10', accent: 'from-violet-600 to-violet-700' },
  amber: { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', glow: 'shadow-amber-500/10', accent: 'from-amber-600 to-orange-600' },
  green: { badge: 'bg-green-500/10 text-green-400 border-green-500/20', glow: 'shadow-green-500/10', accent: 'from-green-600 to-teal-600' },
  teal: { badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20', glow: 'shadow-teal-500/10', accent: 'from-teal-600 to-cyan-600' }
}

const categories = ['All', ...new Set(PROJECTS.map(p => p.category))]

function ProjectCard({ project, index }) {
  const colors = colorMap[project.color] || colorMap.blue
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className={`card overflow-hidden group hover:border-slate-600 hover:shadow-xl ${colors.glow} transition-all duration-300`}
    >
      {/* Header */}
      <div className={`h-2 bg-gradient-to-r ${colors.accent}`} />
      <div className="p-6">
        {/* Category + number */}
        <div className="flex items-start justify-between mb-4">
          <span className={`tag border ${colors.badge}`}>{project.category}</span>
          <span className="text-4xl font-bold font-display text-slate-800 select-none">
            {String(project.id).padStart(2, '0')}
          </span>
        </div>

        {/* Title + desc */}
        <h3 className="font-bold text-white text-lg font-display mb-2 group-hover:text-blue-300 transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-5">
          {project.highlights.slice(0, 3).map(h => (
            <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="text-blue-500 mt-0.5">▸</span> {h}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(t => (
            <span key={t} className="tag bg-slate-800 text-slate-400 border border-slate-700 font-mono">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-3 border-t border-slate-800">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-medium"
            >
              <Github size={14} /> GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {!project.demo && (
            <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <ExternalLink size={14} /> Demo coming soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const q = search.toLowerCase()
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))
      return matchCat && matchSearch
    })
  }, [search, activeCategory])

  return (
    <SectionWrapper id="projects" className="bg-slate-950">
      <div className="section-container">
        <SectionHeader label="My Work" title="Featured Projects" subtitle="Real-world applications built across AI, web development, and blockchain" />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          {/* Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                }`}
              >
                <Tag size={11} /> {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-lg mb-2">No projects found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="https://github.com/KC32004" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Github size={18} /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
