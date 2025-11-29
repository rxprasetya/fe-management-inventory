import { DesktopNavbar, MobileNavbar } from './navbar'
import ModeToggle from '../common/mode-toggle'
import Profile from '../common/profile'
import Logo from '../common/logo'

const Header = () => {
    return (
        <header className="w-full fixed left-0 top-0 right-0 bg-background z-50">
            <div className="lg:box-border lg:px-8 lg:border-b">
                <div className="flex justify-between items-center">
                    <div className="inline-flex lg:hidden">
                        <MobileNavbar />
                    </div>
                    <Logo />
                    <div className="flex items-center justify-center gap-2">
                        <ModeToggle />
                        <Profile />
                    </div>
                </div>
            </div>
            <div className="hidden lg:inline-flex lg:box-border lg:px-8 ">
                <DesktopNavbar />
            </div>
        </header>
    )
}

export default Header