// Function to encrypt the image
async function encryptImage(imageData) {
    try {
        // Generate a random AES-GCM key
        encryptionKey = await crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );

        // Convert image data to array buffer
        const imageBuffer = await imageData.arrayBuffer();

        // Generate a random initialization vector
        const iv = crypto.getRandomValues(new Uint8Array(12));

        // Encrypt the image data
        encryptedData = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            encryptionKey,
            imageBuffer
        );

        console.log("Image encrypted successfully");
        return { encryptedData, iv };
    } catch (error) {
        console.error("Error encrypting image:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

// Handle encrypt button click
encryptButton.addEventListener('click', async () => {
    try {
        const file = imageInput.files[0];
        if (file) {
            const result = await encryptImage(file);
            encryptedData = result.encryptedData;
            const iv = result.iv;

            // Convert encrypted data to base64 for display
            const encryptedBase64 = arrayBufferToBase64(encryptedData);
            const ivBase64 = arrayBufferToBase64(iv);

            // Display encrypted image as base64
            encryptedImage.src = `data:image/png;base64,${encryptedBase64}`;
            encryptedImage.style.display = 'block';
            decryptButton.disabled = false;
        }
    } catch (error) {
        // Handle error
    }
});
