export const generateTextFile = (transcription: any) => {
    let srt = '';
    let index = 1;
        for (const timeRange in transcription) {
            if (transcription.hasOwnProperty(timeRange)) {
                const text = transcription[timeRange];

                srt += index + '\n';
                srt += timeRange.replace(/\./g, ',') + '\n'; // Substituir ponto por vírgula no tempo
                srt += text + '\n\n';

                index++;
            }
        }

    return new Blob([srt], { type: 'text/plain' })
}

export const downloadTranscription = (transcription: any) => {
    const blob = generateTextFile(transcription);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'transcription.srt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

export const urlIsValid = (url: string) => {
    const tester = /^(https?|ftp):\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/
    return tester.test(url)
}