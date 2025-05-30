import { predict, predictVoice } from "../../api/services/predict";
import { useState } from "react";

export default function AIService() {
    const [loadingFace, setLoadingFace] = useState(false);
    const [loadingVoice, setLoadingVoice] = useState(false);
    const [recording, setRecording] = useState(false);

    const handlePredict = async () => {
        try {
            setLoadingFace(true);
            const result = await predict();
            alert(`Face prediction result: ${result?.message}`);
            console.log(result);
        } catch (error) {
            console.error('Prediction error:', error);
        } finally {
            setLoadingFace(false);
        }
    };

    const handleVoice = async () => {
        try {
            setLoadingVoice(true);
            if (!recording) {
                await predictVoice("listen");
                setRecording(true);
            } else {
                const result = await predictVoice("stop_listen");
                alert(`Voice recognition result: ${result?.message}`);
                setRecording(false);
            }
        } catch (error) {
            console.error('Voice recognition error:', error);
        } finally {
            setLoadingVoice(false);
        }
    };

    return (
        <div className="flex flex-col mb-[30px] mt-[50px]">
            <h3 className="text-black text-[18px] font-semibold mb-[20px]">AI Service</h3>
            <div className="flex mt-2 items-center justify-around">
                <button
                    onClick={handlePredict}
                    disabled={loadingFace}
                    className="bg-button-primary cursor-pointer hover:bg-button-primary/90 text-white py-4 px-12 rounded-[24px] font-medium"
                >
                    {loadingFace ? 'Processing...' : 'FACE ID'}
                </button>
                <button
                    onClick={handleVoice}
                    disabled={loadingVoice}
                    className="bg-button-secondary cursor-pointer hover:bg-button-secondary/90 text-white py-4 px-12 rounded-[24px] font-medium"
                >
                    {loadingVoice ? (recording ? 'Stopping...' : 'Starting...') : (recording ? 'STOP VOICE' : 'VOICE')}
                </button>
            </div>
        </div>
    );
}