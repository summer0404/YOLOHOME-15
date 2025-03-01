export default function AddButton({onClick}) {
    return (
        <div className="mt-4">
        <button 
        className="bg-[#030391] cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[12px]"
        onClick={onClick}>
        +
        </button>
        </div>
    );
}