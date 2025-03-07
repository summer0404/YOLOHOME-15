export default function AIService() {
return (
    <div className="flex flex-col mb-[30px] mt-[50px]">
        <h3 className="text-black text-[18px] font-semibold mb-[20px]">AI Service</h3>
        <div className="flex mt-2 items-center justify-around">
            <button className="bg-button-primary cursor-pointer hover:bg-button-primary/90 text-white py-4 px-12 rounded-[24px] font-medium">
                FACE ID
            </button>
            <button className="bg-button-secondary cursor-pointer hover:bg-button-secondary/90 text-white py-4 px-12 rounded-[24px] font-medium">
                VOICE
            </button>
        </div>
    </div>
);
}
