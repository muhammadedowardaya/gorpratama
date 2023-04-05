import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const JoinSchedule = ({ schedule }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                `/booking-schedules/${schedule.id}/join`,
                {
                    name,
                    email,
                    message,
                }
            );

            console.log(response.data);

            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            console.error(error.response.data);
            setError(error.response.data.message);
        }
    };

    return (
        <form className="border rounded p-4" onSubmit={handleSubmit}>
            <h2 className="font-bold mb-2">Join Schedule</h2>

            {error && (
                <div className="bg-red-100 p-2 rounded mb-4">{error}</div>
            )}

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                >
                    Name
                </label>
                <input
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="message"
                >
                    Message
                </label>
                <textarea
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    name="message"
                    rows="4"
                    value={message}
                    onChange={handleMessageChange}
                ></textarea>
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Join
                </button>
            </div>
        </form>
    );
};

JoinSchedule.propTypes = {
    schedule: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        availableSlots: PropTypes.number.isRequired,
    }).isRequired,
};

export default JoinSchedule;
