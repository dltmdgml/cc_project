// index.js
/*const button1 = document.getElementById('button1');
button1.addEventListener('click', () => {
  const input1 = document.getElementById('files');
  putFile(input1.files[0]);
})*/

var camera = document.getElementById('camera');
var frame = document.getElementById('frame');

camera.addEventListener('change', function(e) {
  //var file = e.target.files[0];
  var file = camera.files[0];
  //frame.src = URL.createObjectURL(file);
  const reader = new FileReader();
		reader.onload = function(e) {
			detectObjects(e.target.result);
		};
		reader.readAsArrayBuffer(file);
  //detectObjects(frame.src);
});

var text = document.getElementById('textEntry');
text.value = document.getElementById('output').textContent;

/*const button2 = document.getElementById('button2');
button2.addEventListener('click', () => {
  const input2 = document.getElementById('text').innerHTML;
  TextToMP3(input2)
})*/