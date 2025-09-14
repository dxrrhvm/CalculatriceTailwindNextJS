export default function Btn({ className, value, onClick }) {
    return (
        <button
            className={`py-4 rounded-lg text-lg w-full transition duration-10 ease-in-out ${className}`}
            onClick={onClick}
        >
            {value}
        </button>
    )
}
