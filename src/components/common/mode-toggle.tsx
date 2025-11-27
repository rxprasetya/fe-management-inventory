import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/common/theme-provider'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const ModeToggle = () => {
    const { setTheme } = useTheme()
    const theme = localStorage.getItem("vite-ui-theme")
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="link" size="icon-lg" onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}>
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Theme Mode</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default ModeToggle