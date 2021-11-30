const translation = document.querySelector("#translation");
const translate = new AWS.Translate({region: "us-east-1"});

function Translate(text){
    const translateParams = {
        SourceLanguageCode: 'en',
        TargetLanguageCode: 'ko',
        Text: text
    }

    translate.translateText(translateParams, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            speakText(data.TranslatedText, 'ko');
        }
    });
}

translation.addEventListener("click", function (){
    var transText = document.getElementById("transText");
    Translate(transText.textContent);
});