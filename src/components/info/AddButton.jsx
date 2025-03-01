export default function AddButton({onClick}) {
    return (
        <div className="mt-4">
        <button 
        className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}>
        +
        </button>
        </div>
    );
}