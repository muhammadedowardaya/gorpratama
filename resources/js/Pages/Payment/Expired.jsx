const Expired = () => {
    return (
        <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-red-500 to-yellow-500">
            <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute w-96 h-96 top-0 left-0 opacity-20 animate-bounce"
            >
                <path
                    fill="#fff"
                    d="M48.1,-57.3C60.7,-47.3,71.7,-34.6,78.7,-19.2C85.7,-3.8,88.7,14.4,81.9,28.2C75.2,42,58.7,52.5,42.5,59.3C26.3,66.1,10.4,69.2,-5.7,69.1C-21.8,69,-43.6,65.8,-52.4,53.4C-61.2,40.9,-57,19.1,-55.5,-0.9C-54,-20.9,-55.1,-41.9,-46.8,-52.8C-38.5,-63.7,-20.8,-64.5,-3.3,-63.3C14.3,-62,28.6,-58.7,48.1,-57.3Z"
                    transform="translate(100 100)"
                />
            </svg>
            <h1 class="text-4xl font-bold mt-12 mb-4 text-white">
                Invoice sudah kedaluwarsa
            </h1>
            <p class="text-2xl mb-8 text-white">
                Sorry, your payment cannot be processed.
            </p>
            <a
                href="/pilih-lapangan"
                class="py-3 px-6 bg-white text-black border-2 border-black rounded-full text-xl font-bold uppercase transition duration-200 ease-in-out hover:bg-black hover:text-white transform hover:-translate-y-1 hover:scale-110"
            >
                Booking Lagi
            </a>
        </div>
    );
};

export default Expired;
