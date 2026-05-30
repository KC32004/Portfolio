import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Mail, MapPin, Clock } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { contactService } from '../../services/api'
import { PERSONAL } from '../../data/portfolioData'

const initialForm = { fullName: '', email: '', subject: '', message: '' }
const initialErrors = {}

export default function ContactSection() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('')

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await contactService.submit(form)
      setServerMsg(res.data.message)
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setServerMsg(err.response?.data?.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-slate-900 border rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none transition-all duration-200 ${
      errors[field] ? 'border-red-500/70 focus:border-red-500' : 'border-slate-700 focus:border-blue-500'
    }`

  return (
    <SectionWrapper id="contact" className="bg-slate-950">
      <div className="section-container">
        <SectionHeader label="Get In Touch" title="Let's Connect" subtitle="Open to internships, full-time roles, collaborations, and conversations about AI, web dev, or blockchain" />

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Info panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6 space-y-5">
              <p className="text-sm font-mono text-slate-500">// Contact Info</p>
              {[
                { icon: <Mail size={16} />, label: 'Email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
                { icon: <Github size={16} />, label: 'GitHub', value: 'KC32004', href: PERSONAL.github },
                { icon: <Linkedin size={16} />, label: 'LinkedIn', value: 'k-chandana', href: PERSONAL.linkedin },
                { icon: <MapPin size={16} />, label: 'Location', value: 'Bengaluru, India', href: null }
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-blue-400 transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm text-white">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-green-400">Available for Opportunities</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Final year B.E. student graduating in 2026. Currently seeking internships, full-time roles, and collaborative projects in AI, data science, and web development.
              </p>
            </div>

            <div className="card p-5 flex items-center gap-3">
              <Clock size={16} className="text-slate-500 shrink-0" />
              <p className="text-xs text-slate-400">Typical response time: <span className="text-white font-medium">within 24 hours</span></p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-10 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">{serverMsg}</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary mt-2 text-sm py-2 px-5">Send Another</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="card p-7 space-y-5"
                >
                  <p className="text-xs font-mono text-slate-500">// Send a message</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name *</label>
                      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" className={inputClass('fullName')} />
                      {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass('email')} />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Subject *</label>
                    <input name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className={inputClass('subject')} />
                    {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about the opportunity, project, or just say hello..." className={`${inputClass('message')} resize-none`} />
                    <div className="flex justify-between mt-1">
                      {errors.message ? <p className="text-xs text-red-400">{errors.message}</p> : <span />}
                      <p className="text-xs text-slate-600">{form.message.length}/2000</p>
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <AlertCircle size={16} className="text-red-400 shrink-0" />
                      <p className="text-sm text-red-400">{serverMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
