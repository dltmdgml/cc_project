AWS.config.region = '';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: ''});

// 음성 변환
function speakText(detectedTXT, code) {
    const voices = {
        'en': 'Joanna',
        'ko': 'Seoyeon'
    }
  
    var voice = voices[code];

    var speechParams = {
        OutputFormat: "mp3",
        //SampleRate: "16000",
        Text: detectedTXT,
        TextType: "text",
        VoiceId: voice
    };

    var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    var signer = new AWS.Polly.Presigner(speechParams, polly)

    // 음성 변환된 URL 추출
    signer.getSynthesizeSpeechUrl(speechParams, function(err, url) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            document.getElementById('audioSource').src = url;
            document.getElementById('audioPlayback').load();
        }
    });
}