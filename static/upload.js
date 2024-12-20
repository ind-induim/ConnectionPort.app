document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const textInput = document.getElementById('text-input').value;
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    const formData = new FormData();
    if (textInput.trim()) formData.append('text', textInput.trim());
    if (file) formData.append('file', file);

    try {
        const response = await fetch('https://connectionport-server.onrender.com/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            showResponse(`Shared successfully! Code: ${result.code}`, 'success');
        } else {
            showResponse(`Error: ${result.error || 'Share failed.'}`, 'error');
        }
    } catch (error) {
        showResponse(`Error: ${error.message}`, 'error');
    }
});

function showResponse(message, type) {
    const responseBox = document.getElementById('response');
    responseBox.textContent = message;
    responseBox.style.color = type === 'success' ? 'green' : 'red';
}
