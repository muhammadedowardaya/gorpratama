export default function Checkbox({
    name,
    value,
    handleChange,
    labelValue,
    id,
    classForLabel,
}) {
    return (
        <>
            <input
                type="checkbox"
                name={name}
                value={value}
                className="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                onChange={(e) => handleChange(e)}
                id={id}
            />
            <label htmlFor={id} className={classForLabel}>
                {labelValue}
            </label>
        </>
    );
}
