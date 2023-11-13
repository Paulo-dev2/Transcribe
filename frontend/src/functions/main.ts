export const formateDataToSTR = (transcription: any) => {
  let srt = '';
  let index = 1;

  for (const timeRange in transcription) {
    if (transcription.hasOwnProperty(timeRange)) {
      const text = transcription[timeRange];

      srt += index + '\n'; // Número da legenda
      srt += timeRange.replace(/\./g, ',') + '\n'; // Formata o tempo (substitui ponto por vírgula)
      srt += text + '\n\n'; // Texto da legenda

      index++;
    }
  }

  return srt;
}

export const formatSRT = (srtData: any) => {
  const str: any = formateDataToSTR(srtData);
  const subtitles = [];
  const lines = str.split('\n');

  let subtitle: any = {};
  for (const line of lines) {
    const trimmedLine = line.trim(); // Remove espaços em branco no início e no final

    if (!isNaN(trimmedLine)) { // Verifica se a linha é o número da legenda
      if (subtitle.startTime && subtitle.text) {
        subtitles.push(subtitle); // Adiciona a legenda anterior ao array
      }
      subtitle = {}; // Inicializa um novo objeto de legenda
    } else if (trimmedLine.includes('-->')) { // Se a linha contiver '-->', é uma linha de tempo
      const [startTime, endTime] = trimmedLine.split(' --> ');
      subtitle.startTime = parseSRTTime(startTime); // Converte o tempo de início para segundos
      subtitle.endTime = parseSRTTime(endTime); // Converte o tempo de término para segundos
    } else if (trimmedLine) { // Caso contrário, é o texto da legenda
      if (!subtitle.text) {
        subtitle.text = trimmedLine;
      } else {
        subtitle.text += ' ' + trimmedLine; // Para lidar com quebras de linha no texto
      }
    }
  }

  if (subtitle.startTime && subtitle.text) {
    subtitles.push(subtitle); // Adiciona a última legenda ao array
  }
  return subtitles;
}


const parseSRTTime = (timeStr: any) => {
  const timeParts = timeStr.split(':'); // Divide a string do tempo em partes (horas, minutos, segundos)
  const hours = parseInt(timeParts[0], 10); // Converte as horas para número inteiro
  const minutes = parseInt(timeParts[1], 10); // Converte os minutos para número inteiro
  const seconds = parseFloat(timeParts[2].replace(',', '.')); // Converte os segundos para número decimal e substitui vírgula por ponto

  return hours * 3600 + minutes * 60 + seconds; // Retorna o tempo total em segundos
}



export const downloadTranscription = (transcription: any) => {
  const srt = formateDataToSTR(transcription); // Formata a transcrição em formato SRT
  const blob = new Blob([srt], { type: 'text/plain' }); // Cria um objeto Blob com o texto SRT
  const url = window.URL.createObjectURL(blob); // Cria uma URL temporária para o Blob
  const a = document.createElement('a'); // Cria um elemento <a> (link)
  a.style.display = 'none';
  a.href = url;
  a.download = 'transcription.srt'; // Define o nome do arquivo para download
  document.body.appendChild(a); // Adiciona o elemento <a> ao corpo do documento
  a.click(); // Simula um clique no link para iniciar o download
  window.URL.revokeObjectURL(url); // Libera a URL do Blob
  document.body.removeChild(a); // Remove o elemento <a> após o download
}


export const urlIsValid = (url: string) => {
  const tester = /^(https?|ftp):\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/; // Expressão regular para verificar URLs
  return tester.test(url); // Retorna true se a URL for válida, caso contrário, retorna false
}
