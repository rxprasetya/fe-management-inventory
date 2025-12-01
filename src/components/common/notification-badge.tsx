import { AnimatePresence, motion } from "motion/react"

const NotificationBadge = () => {
    return (
        <AnimatePresence>
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
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </AnimatePresence>
    )
}

export default NotificationBadge