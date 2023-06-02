import React from "react";

function TruncateText({ text = "", limit }) {
    if (text.length <= limit) {
        return <span>{text}</span>;
    }

    const truncatedText = text.slice(0, limit) + "...";
    return <span>{truncatedText}</span>;
}

export default TruncateText;
