// Initialize the Amazon Cognito credentials provider
AWS.config.region = '';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: ''});

// Function invoked by button click
function speakText(detectedTXT) {
    // Create the JSON parameters for getSynthesizeSpeechUrl
    var speechParams = {
        OutputFormat: "mp3",
        //SampleRate: "16000",
        Text: "",
        TextType: "text",
        VoiceId: "Seoyeon"
    };
    speechParams.Text = detectedTXT;
    // Create the Polly service object and presigner object
    var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    var signer = new AWS.Polly.Presigner(speechParams, polly)

    // Create presigned URL of synthesized speech file
    signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
        if (error) {
            document.getElementById('result').innerHTML = error;
        } else {
            document.getElementById('audioSource').src = url;
            document.getElementById('audioPlayback').load();
            document.getElementById('result').innerHTML = "Speech ready to play.";
        }
    });
}
