import TruncateText from "./TruncateText";

export default function MessageAlert({
    url_foto,
    nama,
    pesan,
    onClick,
    jumlah_pesan,
}) {
    return (
        <div
            className={`flex justify-between w-[80vw] md:w-[500px] items-center bg-gray-100 hover:bg-gray-200 shadow px-2 py-1 rounded select-none`}
            onClick={onClick}
        >
            <div className="flex items-center">
                <img
                    src={url_foto}
                    alt="sender photo"
                    className="w-10 h-10 rounded-full border border-gray-300 mr-2 object-cover object-center"
                />
                <div>
                    <p className="font-extrabold text-[0.8em] sm:text-base text-gray-800">
                        {nama}
                    </p>
                    <span className="text-slate-500 text-sm sm:text-base sm:hidden">
                        <TruncateText text={pesan} limit={15} />
                    </span>
                    <span className="text-slate-500 text-sm sm:text-base hidden sm:inline-block overflow-hidden">
                        <TruncateText text={pesan} limit={50} />
                    </span>
                </div>
            </div>
            <div>
                {pesan.length > 0 && (
                    <div className="ml-3 font-bold bg-sky-500 text-sm w-5 h-5 text-center text-white rounded-full">
                        {pesan.length}
                    </div>
                )}
            </div>
        </div>
    );
}
