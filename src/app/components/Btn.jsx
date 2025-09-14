export default function Btn ({ className, value, onClick }) {
    return (
        <button
        className={`bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-lg text-lg ${className}`}
        onClick={onClick}
        >
        {value}
        </button>
    )
}