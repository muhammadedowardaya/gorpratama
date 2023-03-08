import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pb-20 sm:pt-0 bg-gradient-to-br from-teal-300 via-teal-500 to-teal-700 bg-fixed dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
            <div className="pt-10">
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
