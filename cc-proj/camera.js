let constraints = { video: { facingMode: "user"}, audio: false};
        const cameraView = document.querySelector("#camera--view");
        const cameraOutput1 = document.querySelector("#camera--output");
        //const cameraOutput2 = document.querySelector("#camera--output2");
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
            
            //return new File([u8arr], 'image.png', {type:mime});
            return new Blob([u8arr], {type:mime});
        }

        //촬영 버튼 클릭 리스너
        cameraTrigger.addEventListener("click", function(){
            
            cameraSensor.width = cameraView.videoWidth; //640으로 정해짐
            cameraSensor.height = cameraView.videoHeight;
            cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
            cameraOutput1.src = cameraSensor.toDataURL("image/webp");
            cameraOutput1.classList.add("taken");

            var imageFile = dataURLtoFile(cameraSensor.toDataURL("image/png"));
            console.log(imageFile);

            /*var file;
            if(imageFile.files && imageFile.files.length > 0) {
                file = imageFile.files[0];
            }*/
            const reader = new FileReader();
            reader.onload = function(e) {
                detectObjects(e.target.result);
            };
            reader.readAsArrayBuffer(imageFile);

            //convertURLtoFile(cameraOutput2.src);
            console.log(cameraSensor.height);
        });
    
        // 페이지가 로드되면 함수 실행
        window.addEventListener("load", cameraStart, false);