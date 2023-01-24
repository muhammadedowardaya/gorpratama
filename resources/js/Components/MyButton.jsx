export default function MyButton({
    value,
    type = "button",
    button,
    padding = "8px 20px",
    onClick,
    className,
}) {
    const create = "#3C79F5";
    const edit = "#21E1E1";
    const trash = "#F65A83";
    const update = "#FED049";
    const defaultColor = "#2B3A55";

    function pickColor(value) {
        if (value == "create") {
            return create;
        } else if (value == "update") {
            return update;
        } else if (value == "delete") {
            return trash;
        } else if (value == "edit") {
            return edit;
        } else {
            return defaultColor;
        }
    }
    return (
        <button
            style={{
                backgroundColor: pickColor(button),
                color: "#fff",
                backdropFilter: 'blur("20px")',
                padding: padding,
            }}
            onClick={onClick}
            className={className}
        >
            {value}
        </button>
    );
}
