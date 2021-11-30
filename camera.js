let constraints = { video: { facingMode: "environment" }, audio: false}
const cameraView = document.querySelector("#camera--view"),
      cameraOutput1 = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger");

function cameraStart(){
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream){
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error){
        console.error("카메라에 문제가 있습니다.", error);
    })
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    var result = new Blob([u8arr], {type:mime});
    console.log(result);
    return result;
}

// 사진 촬영 버튼 클릭 시 실행
cameraTrigger.addEventListener("click", function(){
    // canvas 이미지 캡처    
    cameraSensor.width = cameraView.videoWidth; //640
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);

    // DataURL 생성 후 웹 페이지에 보여줌
    cameraOutput1.src = cameraSensor.toDataURL("image/webp");
    cameraOutput1.classList.add("taken");

    // DataURL 생성 후 Blob형식으로 변환
    var imageBlob = dataURLtoBlob(cameraSensor.toDataURL("image/png"));

    // 텍스트 추출 실행
    const reader = new FileReader();
    reader.onload = function(e) {
        detectObjects(e.target.result);
    };
    reader.readAsArrayBuffer(imageBlob);
});

// 페이지 로드 시 카메라 실행
window.addEventListener("load", cameraStart, false);