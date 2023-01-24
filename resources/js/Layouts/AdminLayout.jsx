import React, { useEffect } from "react";
import NavbarAdmin from "@/Components/NavbarAdmin";

export default function AdminLayout({ children }) {
    return (
        <main>
            <div className="bg-gray-100 font-sans leading-normal tracking-normal">
                <header>
                    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
                        <NavbarAdmin  />
                    </div>
                </header>
                <section>{children}</section>
                <footer className="bg-white border-t border-gray-400 shadow">
                    <div className="container max-w-md mx-auto flex py-8">
                        <div className="w-full mx-auto flex flex-wrap">
                            <div className="flex w-full md:w-1/2 ">
                                <div className="px-8">
                                    <h3 className="font-bold text-gray-900">
                                        About
                                    </h3>
                                    <p className="py-4 text-gray-600 text-sm">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Maecenas vel mi ut
                                        felis tempus commodo nec id erat.
                                        Suspendisse consectetur dapibus velit ut
                                        lacinia.
                                    </p>
                                </div>
                            </div>

                            <div className="flex w-full md:w-1/2">
                                <div className="px-8">
                                    <h3 className="font-bold text-gray-900">
                                        Social
                                    </h3>
                                    <ul className="list-reset items-center text-sm pt-3">
                                        <li>
                                            <a
                                                className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-1"
                                                href="#"
                                            >
                                                Add social link
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-1"
                                                href="#"
                                            >
                                                Add social link
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:underline py-1"
                                                href="#"
                                            >
                                                Add social link
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}
