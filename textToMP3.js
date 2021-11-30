AWS.config.region = '';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: ''});

function speakText(detectedTXT, code) {
    const voices = {
        'en': 'Joanna',
        'ko': 'Seoyeon'
    }
  
    const voice = voices[code]

    var speechParams = {
        OutputFormat: "mp3",
        //SampleRate: "16000",
        Text: detectedTXT,
        TextType: "text",
        VoiceId: voice
    };

    var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    var signer = new AWS.Polly.Presigner(speechParams, polly)

    signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
        if (error) {
            console.log(err, err.stack);
        } else {
            document.getElementById('audioSource').src = url;
            document.getElementById('audioPlayback').load();
        }
    });
}
