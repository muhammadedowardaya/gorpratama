import React from "react";

const Card = ({ image, name, status, buttons, onClick, children }) => {
    return (
        <div className="grid justify-between w-full md:w-[250px] h-full rounded overflow-hidden  ">
            {children ?? (
                <div className="backdrop-filter backdrop-blur bg-opacity-5 bg-slate-50 shadow-lg">
                    <img
                        className={`w-full md:min-w-[250px] h-[200px] object-cover object-center p-0`}
                        src={image}
                        alt={name}
                    />
                    <div
                        className={`grid justify-center ${
                            name != "" ? "" : "hidden"
                        }`}
                    >
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{name}</div>
                            <p className={`text-slate-50 text-base`}>
                                {status}
                            </p>
                        </div>
                        {buttons &&
                            Array.isArray(buttons) &&
                            buttons.map((item, index) => (
                                <button
                                    key={index}
                                    className={`text-white font-bold py-2 px-4 rounded ${item.className}`}
                                    onClick={item.onClick}
                                >
                                    {item.title}
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
