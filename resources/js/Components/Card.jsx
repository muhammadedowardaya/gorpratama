import React from "react";

const Card = ({ image, name, status, onDelete, onEdit, children }) => {
    return (
        <div className="grid justify-evenly w-full md:w-[250px] h-full rounded overflow-hidden shadow-lg backdrop-filter backdrop-blur bg-opacity-5 bg-slate-50">
            {children ?? (
                <div>
                    <img
                        className={`w-full h-[200px] object-cover object-center p-0`}
                        src={image}
                        alt={name}
                    />
                    <div
                        className={`grid justify-between ${
                            name != "" ? "" : "hidden"
                        }`}
                    >
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{name}</div>
                            <p className={`text-slate-50 text-base`}>
                                {status}
                            </p>
                        </div>
                        <div
                            className={`${
                                onDelete || onEdit ? "px-6 " : "hidden"
                            }`}
                        >
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={onDelete}
                            >
                                Hapus
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={onEdit}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
