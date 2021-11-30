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

    rekognition.detectText(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
    } else {
            console.log(data);
            displayTXT(data);
        }
    });
}

var detectedTXT = "";
function displayTXT(data) {
    for(var i = 0; i < data.TextDetections.length;i++){
        if(data.TextDetections[i].Type === 'LINE')
        {
        detectedTXT +=data.TextDetections[i].DetectedText + " ";
        }
    }

    console.log(detectedTXT);
    speakText(detectedTXT, 'en');
    document.getElementById("transText").textContent = detectedTXT;
    detectedTXT = ""; //초기화
}
