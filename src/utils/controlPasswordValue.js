export const controlPasswordValue = async (password) => {
    const username = import.meta.env.VITE_ADAFRUIT_USERNAME;
    const aioKey = import.meta.env.VITE_ADAFRUIT_AIO_KEY;
    const baseUrl = import.meta.env.VITE_ADAFRUIT_BASE_URL;

    // if (speed < 0 || speed > 100) {
    //     console.error("Speed must be between 0 and 100");
    //     return null;
    // }

    try {
        const response = await fetch(`${baseUrl}/${username}/feeds/bbc-password/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-AIO-Key": aioKey
            },
            body: JSON.stringify({ value: password })
        });

        if (!response.ok) throw new Error("Failed to update password value");

        const data = await response.json();
        console.log(`Password value set to ${password}%`);
        return data;
    } catch (error) {
        console.error("Error controlling password value:", error);
        return null;
    }
};
