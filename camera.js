let constraints = { video: { facingMode: "environment" }, audio: false}
const cameraView = document.querySelector("#camera--view");
const cameraOutput1 = document.querySelector("#camera--output");
const cameraSensor = document.querySelector("#camera--sensor");
const cameraTrigger = document.querySelector("#camera--trigger");

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

function dataURLtoFile(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], {type:mime});
}

cameraTrigger.addEventListener("click", function(){    
    cameraSensor.width = cameraView.videoWidth; //640
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput1.src = cameraSensor.toDataURL("image/webp");
    cameraOutput1.classList.add("taken");

    var imageFile = dataURLtoFile(cameraSensor.toDataURL("image/png"));
    console.log(imageFile);

    const reader = new FileReader();
    reader.onload = function(e) {
        detectObjects(e.target.result);
    };
    reader.readAsArrayBuffer(imageFile);
});

window.addEventListener("load", cameraStart, false);