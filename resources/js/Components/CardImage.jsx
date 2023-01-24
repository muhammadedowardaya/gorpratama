import "../../css/cardImage.css";
import VanillaTilt from "vanilla-tilt";

export default function CardImage({
    number = 0,
    title,
    content,
    link,
    linkCaption = "Button",
    urlImage,
    altImage,
    sizeImage,
    copyright,
}) {
    const card = document.querySelectorAll(".card");
    VanillaTilt.init(card, {
        glare: true,
        "max-glare": 1,
        max: 25,
        speed: 400,
        gyroscope: true,
    });

    return (
        <div className="container">
            <div
                className="card"
                style={{
                    width: sizeImage ?? "200px",
                }}
            >
                <div className="content">
                    <h2 className={number == 0 ? "hidden" : ""}>{number}</h2>
                    <h3>{title}</h3>
                    <figure className="flex flex-col">
                        <img src={urlImage} alt={altImage} />
                        <figcaption
                            style={{
                                fontSize: "8px",
                                opacity: 0.5,
                            }}
                        >
                            {copyright}
                        </figcaption>
                    </figure>
                    <p>{content}</p>
                    <a href={link} className={link != "" ? "" : "hidden"}>
                        {linkCaption}
                    </a>
                </div>
            </div>
        </div>
    );
}
