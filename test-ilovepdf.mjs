import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';

const secretKey = 'secret_key_bd0ed201040572489195732e1cf328d8_wR57zf3ccd7d7f29433be1fbf906854d49234';
// Trying to use secret key as both to see what happens, or empty string
const publicKey = 'project_public_id_...'; // I don't have this.

console.log("Testing ILovePDF connection...");

try {
    // Attempt 1: Using secret key for both? (Likely to fail)
    console.log("Attempting with secret key as public key...");
    const instance = new ILovePDFApi(secretKey, secretKey);
    const task = instance.newTask('officepdf');
    console.log("Task created successfully? (This doesn't mean auth worked yet)");

    task.start()
        .then(() => console.log("Task started successfully!"))
        .catch(err => {
            console.error("Task start failed:");
            console.error(err);
        });

} catch (e) {
    console.error("Initialization error:", e);
}
