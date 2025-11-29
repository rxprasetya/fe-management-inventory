import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { cn } from "@/lib/utils"

const FadeAnimate = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 0.4,
                    ease: "easeInOut"
                }
            }}
            exit={{ opacity: 0 }}
            className={cn(className)}>
            {children}
        </motion.div>
    )
}

export default FadeAnimate