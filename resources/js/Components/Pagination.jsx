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
                    {links.map((link, key) => {
                        // Jika link.label sama dengan label untuk tombol prev atau next
                        // dan link.url bernilai null, maka kembalikan null
                        if (
                            (link.label === "&laquo; Sebelumnya" ||
                                link.label === "Berikutnya &raquo;") &&
                            link.url === null
                        ) {
                            return null;
                        }

                        return (
                            <a
                                key={key}
                                className={`${getClassName(link.active)} btn `}
                                href={link.url}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            ></a>
                        );
                    })}
                </div>
            </div>
        )
    );
}
