import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
    const navigate = useNavigate();

    const onClickLogout = () => {
        Cookies.remove("jwt_token");
        navigate("/login", { replace: true });
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">

                <Link to="/" className="flex items-center">
                    <img
                        src="YOUR_LOGO"
                        alt="logo"
                        className="h-12"
                    />
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <Link to="/about" className="hover:text-blue-600">About</Link>
                    <Link to="/services" className="hover:text-blue-600">Services</Link>
                    <Link to="/contact" className="hover:text-blue-600">Contact</Link>

                    <button
                        onClick={onClickLogout}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;