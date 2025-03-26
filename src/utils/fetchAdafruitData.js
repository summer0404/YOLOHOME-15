export const fetchAdafruitData = async (feedKey) => {
    const username = import.meta.env.VITE_ADAFRUIT_USERNAME;
    const aioKey = import.meta.env.VITE_ADAFRUIT_AIO_KEY;
    const baseUrl = import.meta.env.VITE_ADAFRUIT_BASE_URL;

    try {
        const response = await fetch(`${baseUrl}/${username}/feeds/${feedKey}/data/last`, {
            headers: { "X-AIO-Key": aioKey }
        });

        if (!response.ok) throw new Error(`Failed to fetch ${feedKey}`);

        const data = await response.json();
        return data.value; // Return the latest value
    } catch (error) {
        console.error(`Error fetching ${feedKey}:`, error);
        return null; // Return null in case of error
    }
};
