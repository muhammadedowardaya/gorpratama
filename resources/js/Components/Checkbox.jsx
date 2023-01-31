export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
            onChange={(e) => handleChange(e)}
        />
    );
}
