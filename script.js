let reader;

async function startNFC() {
    try {
        reader = new NDEFReader();
        await reader.scan();
        reader.onreading = event => {
            const output = document.getElementById('output');
            output.innerHTML = ''; // Clear previous content
            for (const record of event.message.records) {
                const recordInfo = document.createElement('div');
                recordInfo.textContent = `Record type: ${record.recordType}, MIME type: ${record.mediaType}, Data: ${record.data}`;
                output.appendChild(recordInfo);
            }
        };
        setError('');
        setOutput('NFC reader initialized.');
    } catch (error) {
        console.error('Error: ' + error);
        setError('Error: ' + error);
        stopNFC();
    }
}

function stopNFC() {
    if (reader) {
        reader.stop();
        reader = null;
        setOutput('NFC reader stopped.');
    }
}

function setOutput(message) {
    document.getElementById('output').innerHTML = message;
}

function setError(message) {
    document.getElementById('error').textContent = message;
}
