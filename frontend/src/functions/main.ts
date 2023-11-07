export const generateTextFile = (transcription: any) => {
    const text = Object.keys(transcription)
        .map(time => `${time}\n${transcription[time]}`)
        .join('\n\n')

    return new Blob([text], { type: 'text/plain' })
}

export const downloadTranscription = (transcription: any) => {
    const blob = generateTextFile(transcription);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'transcription.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

export const urlIsValid = (url: string) => {
    const tester = /^(https?|ftp):\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/
    return tester.test(url)
}