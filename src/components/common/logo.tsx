import { Link } from "react-router-dom"
import logo from "../../assets/images/logo.webp"

const Logo = () => {
    return (
        <Link to={`/`}>
            <div className="w-32 h-16 bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${logo})` }} />
        </Link>
    )
}

export default Logo