export default function AIService() {
return (
    <div className="mt-4 flex flex-col mb-12">
        <h3 className="text-black text-2xl mb-4">AI Service</h3>
        <div className="flex mt-2 items-center justify-around">
            <button className="bg-button-primary text-white py-4 px-12 rounded-[24px] font-medium">
                FACE ID
            </button>
            <button className="bg-button-secondary text-white py-4 px-12 rounded-[24px] font-medium">
                VOICE
            </button>
        </div>
    </div>
);
}
