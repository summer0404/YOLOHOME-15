export const controlAdafruitDevice = async (feedKey, value) => {
    const username = import.meta.env.VITE_ADAFRUIT_USERNAME;
    const aioKey = import.meta.env.VITE_ADAFRUIT_AIO_KEY;
    const baseUrl = import.meta.env.VITE_ADAFRUIT_BASE_URL;

    try {
        const response = await fetch(`${baseUrl}/${username}/feeds/${feedKey}/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-AIO-Key": aioKey
            },
            body: JSON.stringify({ value })
        });

        if (!response.ok) throw new Error(`Failed to send data to ${feedKey}`);

        const data = await response.json();
        console.log(`Device ${feedKey} set to ${value}`);
        return data;
    } catch (error) {
        console.error(`Error controlling ${feedKey}:`, error);
        return null;
    }
};
