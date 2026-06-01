import { motion } from 'framer-motion'
export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div initial={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}
      className="fixed inset-0 z-[9999] bg-white dark:bg-slate-950 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-5">
        <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.35 }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-2xl shadow-indigo-500/30">KC</div>
          <motion.div className="absolute -inset-2 rounded-2xl border-2 border-indigo-400/30"
            animate={{ scale:[1,1.18,1], opacity:[1,0.15,1] }}
            transition={{ duration:1.4, repeat:Infinity }}
          />
        </motion.div>
        <div className="text-center">
          <p className="text-slate-900 dark:text-white font-bold text-base">K Chandana</p>
          <p className="text-slate-400 text-xs mt-0.5 font-mono tracking-wider">AI & Data Science Portfolio</p>
        </div>
        <div className="flex gap-1.5">
          {[0,1,2].map(i=><motion.div key={i} className="w-2 h-2 rounded-full bg-indigo-500" animate={{y:[-4,0,-4]}} transition={{duration:0.65,repeat:Infinity,delay:i*0.15}}/>)}
        </div>
      </div>
      <motion.div initial={{scaleX:0}} animate={{scaleX:1}}
        transition={{duration:1.3,ease:'easeInOut'}}
        onAnimationComplete={onComplete}
        style={{originX:0}}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"
      />
    </motion.div>
  )
}
