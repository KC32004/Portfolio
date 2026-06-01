import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Mail, MapPin, Clock } from 'lucide-react'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { contactService } from '../../services/api'
import { PERSONAL } from '../../data/portfolioData'

const init = { fullName:'', email:'', subject:'', message:'' }

export default function ContactSection() {
  const [form, setForm] = useState(init)
  const [errs, setErrs] = useState({})
  const [status, setStatus] = useState('idle')
  const [msg, setMsg] = useState('')

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName='Name required'
    if (!form.email.trim()||!/\S+@\S+\.\S+/.test(form.email)) e.email='Valid email required'
    if (!form.subject.trim()) e.subject='Subject required'
    if (form.message.trim().length<10) e.message='Message too short (min 10 chars)'
    setErrs(e); return !Object.keys(e).length
  }
  const change = e => { const {name,value}=e.target; setForm(p=>({...p,[name]:value})); if(errs[name]) setErrs(p=>({...p,[name]:''})) }
  const submit = async e => {
    e.preventDefault(); if(!validate()) return; setStatus('loading')
    try { const r=await contactService.submit(form); setMsg(r.data.message); setStatus('success'); setForm(init) }
    catch(err) { setMsg(err.response?.data?.message||'Something went wrong.'); setStatus('error') }
  }
  const inp = f => `w-full px-4 py-3 rounded-xl border text-slate-900 dark:text-white text-sm placeholder-slate-400 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 transition-all duration-200 ${errs[f]?'border-red-400 focus:ring-red-500/20 bg-red-50 dark:bg-red-500/5':'border-slate-200 dark:border-slate-700 focus:border-indigo-400 focus:ring-indigo-500/20'}`

  return (
    <SectionWrapper id="contact" className="section-gray">
      <div className="container-xl">
        <SectionHeader eyebrow="Get In Touch" title="Let's Connect" subtitle="Open to internships, full-time roles, collaborations, and interesting conversations" />
        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6 space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</p>
              {[
                {icon:<Mail size={15}/>,label:'Email',val:PERSONAL.email,href:`mailto:${PERSONAL.email}`},
                {icon:<Github size={15}/>,label:'GitHub',val:'KC32004',href:PERSONAL.github},
                {icon:<Linkedin size={15}/>,label:'LinkedIn',val:'k-chandana',href:PERSONAL.linkedin},
                {icon:<MapPin size={15}/>,label:'Location',val:'Bengaluru, India',href:null},
              ].map(({icon,label,val,href})=>(
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-100 dark:border-indigo-500/20">{icon}</div>
                  <div><p className="text-xs text-slate-400">{label}</p>
                    {href?<a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{val}</a>
                    :<p className="text-sm font-semibold text-slate-800 dark:text-white">{val}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="card p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/><span className="text-sm font-bold text-green-700 dark:text-green-400">Available for Opportunities</span></div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Final year B.E. AI & DS student graduating 2026. Actively seeking internships and full-time roles.</p>
            </div>
            <div className="card p-4 flex items-center gap-3">
              <Clock size={15} className="text-slate-400 shrink-0"/>
              <p className="text-xs text-slate-500">Response time: <strong className="text-slate-900 dark:text-white">within 24 hours</strong></p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status==='success'?(
                <motion.div key="ok" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="card p-10 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center"><CheckCircle size={32} className="text-green-500"/></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{msg}</p>
                  <button onClick={()=>setStatus('idle')} className="btn-primary text-sm py-2 px-6 mt-1">Send Another</button>
                </motion.div>
              ):(
                <motion.form key="form" initial={{opacity:0}} animate={{opacity:1}} onSubmit={submit} className="card p-7 space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Send a Message</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Full Name *</label><input name="fullName" value={form.fullName} onChange={change} placeholder="Your name" className={inp('fullName')}/>{errs.fullName&&<p className="mt-1 text-xs text-red-500">{errs.fullName}</p>}</div>
                    <div><label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Email *</label><input name="email" type="email" value={form.email} onChange={change} placeholder="you@email.com" className={inp('email')}/>{errs.email&&<p className="mt-1 text-xs text-red-500">{errs.email}</p>}</div>
                  </div>
                  <div><label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Subject *</label><input name="subject" value={form.subject} onChange={change} placeholder="What's this about?" className={inp('subject')}/>{errs.subject&&<p className="mt-1 text-xs text-red-500">{errs.subject}</p>}</div>
                  <div><label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Message *</label><textarea name="message" value={form.message} onChange={change} rows={5} placeholder="Tell me about the opportunity..." className={`${inp('message')} resize-none`}/><div className="flex justify-between mt-1">{errs.message?<p className="text-xs text-red-500">{errs.message}</p>:<span/>}<p className="text-xs text-slate-400">{form.message.length}/2000</p></div></div>
                  {status==='error'&&<div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20"><AlertCircle size={15} className="text-red-500 shrink-0"/><p className="text-sm text-red-600 dark:text-red-400">{msg}</p></div>}
                  <button type="submit" disabled={status==='loading'} className="btn-primary w-full justify-center disabled:opacity-60">
                    {status==='loading'?<><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"/>Sending...</>:<><Send size={15}/>Send Message</>}
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
