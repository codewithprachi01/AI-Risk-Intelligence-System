import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const loadNotifications = () => {

            const data = JSON.parse(
                localStorage.getItem("riskNotifications") || "[]"
            );

            setNotifications(data);
        };

        loadNotifications();

        window.addEventListener(
            "notificationUpdated",
            loadNotifications
        );

        return () => {

            window.removeEventListener(
                "notificationUpdated",
                loadNotifications
            );

        };

    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div
            className="
            h-16
            bg-[#0B1220]
            border-b
            border-white/10
            flex
            items-center
            justify-between
            px-8
            text-white
            "
        >

            <div>

                <h1
                    className="
                    text-xl
                    font-semibold
                    "
                >
                    AI Multi-Risk
                    <span className="text-cyan-400">
                        {" "}Intelligence
                    </span>
                </h1>

            </div>

            <div className="flex items-center gap-6">

                <Link to="/notifications">

                    <div
                        className="
                        relative
                        cursor-pointer
                        "
                    >

                        <span className="text-2xl">
                            🔔
                        </span>

                        {notifications.length > 0 && (

                            <span
                                className="
                                absolute
                                -top-2
                                -right-3
                                bg-red-500
                                text-white
                                text-xs
                                rounded-full
                                min-w-5.5
                                h-5.5
                                flex
                                items-center
                                justify-center
                                "
                            >
                                {notifications.length}
                            </span>

                        )}

                    </div>

                </Link>

                <div className="text-gray-300">
                    Prachi 👋
                </div>

                <button
                    onClick={logout}
                    className="
                    bg-red-500/20
                    text-red-400
                    border
                    border-red-400/30
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-red-500/30
                    "
                >
                    Logout
                </button>

            </div>

        </div>

    );
}

export default Navbar;