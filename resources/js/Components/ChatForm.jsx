import React, { useState } from "react";

const ChatForm = ({ chatId, sendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    };

    useEffect(() => {
        echo.channel("gorpratama").listen("ChatSent", (data) => {
            setMessage(data.message);
        });
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <textarea
                    className="form-textarea block w-full"
                    rows="3"
                    placeholder="Tulis pesan ..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    disabled={!message}
                >
                    Kirim
                </button>
            </div>
        </form>
    );
};

export default ChatForm;
