import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-page flex flex-col items-center justify-center px-4 text-center">
            {/* Animated number */}
            <div className="relative mb-6">
                <span className="text-9xl font-black text-stone-200 select-none">404</span>
                <span className="absolute inset-0 flex items-center justify-center text-6xl">🪑</span>
            </div>

            <h1 className="text-3xl font-bold text-stone-800 mb-3">Page Not Found</h1>
            <p className="text-stone-500 text-base max-w-md mb-8">
                Oops! The page you're looking for doesn't exist. It may have been moved or deleted.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2.5 border-2 border-brand text-brand font-semibold rounded-xl hover:bg-brand hover:text-white transition-all"
                >
                    ← Go Back
                </button>
                <Link to="/">
                    <button className="px-6 py-2.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-all shadow-md hover:shadow-lg">
                        Go to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
