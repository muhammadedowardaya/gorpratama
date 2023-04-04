import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { CgPlayTrackPrevO } from "react-icons/cg";
import { router } from "@inertiajs/react";

export default function Pagination({ links, className }) {
    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-slate-700 focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-slate-700 focus:border-primary focus:text-primary";
        }
    }

    return (
        links.length > 3 && (
            <div className={`mb-4 ${className}`}>
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) =>
                        link.url === null ? (
                            <a
                                key={key}
                                className={`${getClassName(link.active)} btn `}
                                href={link.url}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            ></a>
                        ) : (
                            <a
                                key={key}
                                className={`${getClassName(link.active)} btn `}
                                href={link.url}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            ></a>
                        )
                    )}
                </div>
            </div>

            // <div className="flex justify-center items-center mt-8">
            //     <nav className="block">
            //         <ul className="flex pl-0 rounded list-none">
            //             {links.map((link, index) => (
            //                 <li key={index}>
            //                     <a
            //                         href={link.url}
            //                         className={`text-gray-600 hover:text-gray-800 px-3 py-2 rounded ${
            //                             link.active ? "bg-gray-200" : ""
            //                         }`}
            //                     >
            //                         {link.label}
            //                     </a>
            //                 </li>
            //             ))}
            //         </ul>
            //     </nav>
            // </div>
        )
    );
}
