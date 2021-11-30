var BucketName = '';
var bucketRegion = '';
var IdentityPoolId = '';

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: BucketName}
});
  
var rekognition = new AWS.Rekognition();

function detectObjects(imgData) {
    const params = {
        Image: {
            Bytes: imgData
        },
    };

    // 텍스트 추출
    rekognition.detectText(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log(data);
            var detectedTXT = ArraytoText(data);
            speakText(detectedTXT, 'en'); // 음성 변환
            document.getElementById("transText").textContent = detectedTXT; // 번역할 텍스트 저장
            detectedTXT = ""; // 초기화
        }
    });
}

// Array를 text로 변환
function ArraytoText(data) {
    var result = "";
    for(var i = 0; i < data.TextDetections.length;i++){
        if(data.TextDetections[i].Type === 'LINE')
        {
            result += data.TextDetections[i].DetectedText + " ";
        }
    }
    console.log(result);
    return result;
}
