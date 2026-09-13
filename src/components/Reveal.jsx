import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export function Reveal({ children, className = '', delay = 0, y = 32, once = true, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px' }}
      transition={{ duration: 1.1, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function RevealText({ text, className = '', delay = 0, as: Tag = 'p' }) {
  const words = String(text).split(' ')
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, delay: delay + i * 0.03, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
