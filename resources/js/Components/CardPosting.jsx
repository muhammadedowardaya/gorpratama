import "../../css/cardPosting.css";

export default function CardPosting({
    category = "",
    image,
    heading = "Ini adalah heading",
    children,
    className,
}) {
    return (
        <div className={`card-posting ${className}`}>
            <div
                className="card-posting-image"
                style={{
                    backgroundImage: `url(${image})`,
                }}
            >
                {/* <img src={image} alt="" /> */}
            </div>
            <div className={`category ${category == "" ? "hidden" : ""}`}>
                {category}
            </div>
            <div className="heading">{heading}</div>
            {children}
        </div>
    );
}
