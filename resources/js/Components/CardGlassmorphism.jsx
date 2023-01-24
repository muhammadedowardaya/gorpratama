import "../../css/cardGlassmorphism.css";
import VanillaTilt from "vanilla-tilt";

export default function CardGlassmorphism({
    number = 0,
    title,
    content,
    link,
    linkCaption = "Button",
    width,
    height,
}) {
    const card = document.querySelectorAll(".card");
    VanillaTilt.init(card, {
        glare: true,
        "max-glare": 1,
        gyroscope: true,
        max: 25,
        speed: 400,
    });

    return (
        <div className="container">
            <div
                className="card"
                style={{
                    width: width ?? "200px",
                    height: height ?? "400px",
                }}
            >
                <div className="content">
                    <h2 className={number == 0 ? "hidden" : ""}>{number}</h2>
                    <h3>{title}</h3>
                    <p>{content}</p>
                    <a href={link}>{linkCaption}</a>
                </div>
            </div>
        </div>
    );
}
