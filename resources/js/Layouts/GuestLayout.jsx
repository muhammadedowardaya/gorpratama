import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div
            className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
            style={{
                background: "rgb(14, 123, 129)",
                background:
                    "linear-gradient(to bottom right, #0e7b81, #82c180)",
            }}
        >
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-white" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 border border-solid border-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
