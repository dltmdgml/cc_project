var BucketName = 'seunghui-photo-bucket';
var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:77f3bdfe-f66c-484e-9a92-6ad706086519';

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

//rekognition객체가 특정 API를 사용하도록 하려면 생성자에 옵션을 전달하여 객체 생성
var rekognition = new AWS.Rekognition();

function processImage() {
	const control = document.getElementById('frame');

	if (control.files.length > 0) {
		const file = control.files[0];

		const reader = new FileReader();
		reader.onload = function(e) {
			detectObjects(e.target.result);
		};
		reader.readAsArrayBuffer(file);
	}
}

function detectObjects(imgData) {
	const params = {
		Image: {
			Bytes: imgData
		},
  };
  
  //rekognition을 사용하여 요청 보내기
	rekognition.detectText(params, function(err, data) {
		if (err) {
			console.log(err, err.stack);
	  } else {
			console.log(data);
			displayTXT(data);
		}
	});
}

var detectedTXT;
function displayTXT(data) {
  for(var i = 0; i < data.TextDetections.length;i++){
    if(data.TextDetections[i].Type === 'LINE')
    {
      detectedTXT = data.TextDetections[i].DetectedText;
    }
  }

  console.log(detectedTXT);
  detectedTXT = data.TextDetections.map((obj) => obj.DetectedText).join('<br>');
  document.getElementById('output').textContent = detectedTXT; //추출한 text 출력
}
