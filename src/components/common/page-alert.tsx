import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react";

const PageAlert = ({ status, error, message }: { status?: boolean, error?: string, message?: string }) => {
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        if (!status) return

        if (status) {
            setVisible(true)

            const timer = setTimeout(() => {
                setVisible(false)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [status])

    return (
        <AnimatePresence>
            {visible &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeInOut"
                        }
                    }}
                    exit={{ opacity: 0 }}
                    className="fixed top-8 left-1/2 -translate-x-1/2 md:left-auto md:right-16 md:translate-x-0 md:top-auto md:bottom-8 w-full max-w-sm rounded-lg z-50 box-border px-2 select-none">
                    <Alert className={`shadow-lg ${error ? "bg-red-200" : "bg-green-200"} `}>
                        <Info className="" color="black" />
                        <AlertTitle className="text-black">Information</AlertTitle>
                        <AlertDescription className="text-gray-600">{message}</AlertDescription>
                    </Alert >
                </motion.div>
            }
        </AnimatePresence >
    )
};

export default PageAlert;
