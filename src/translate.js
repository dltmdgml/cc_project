const translation = document.querySelector("#translation");
const translate = new AWS.Translate({region: "us-east-1"});

function Translate(text){
    const translateParams = {
        SourceLanguageCode: 'en',
        TargetLanguageCode: 'ko',
        Text: text
    }

    // 영한 텍스트 번역
    translate.translateText(translateParams, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log(data.TranslatedText);
            speakText(data.TranslatedText, 'ko');
        }
    });
}

// 번역 버튼 클릭 시 실행
translation.addEventListener("click", function (){
    var transText = document.getElementById("transText");
    if(!transText.textContent) {
        speakText("번역할 내용이 없습니다. 사진촬영을 먼저 해주세요.", 'ko');
    }
    else{
        Translate(transText.textContent);
    }
});