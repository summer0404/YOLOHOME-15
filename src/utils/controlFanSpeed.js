export const controlFanSpeed = async (speed) => {
    const username = import.meta.env.VITE_ADAFRUIT_USERNAME;
    const aioKey = import.meta.env.VITE_ADAFRUIT_AIO_KEY;
    const baseUrl = import.meta.env.VITE_ADAFRUIT_BASE_URL;

    if (speed < 0 || speed > 100) {
        console.error("Speed must be between 0 and 100");
        return null;
    }

    try {
        const response = await fetch(`${baseUrl}/${username}/feeds/bbc-control-fan/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-AIO-Key": aioKey
            },
            body: JSON.stringify({ value: speed }) // Send value between 0-100
        });

        if (!response.ok) throw new Error("Failed to update fan speed");

        const data = await response.json();
        console.log(`Fan speed set to ${speed}%`);
        return data;
    } catch (error) {
        console.error("Error controlling fan speed:", error);
        return null;
    }
};
