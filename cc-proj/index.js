// index.js
/*const button1 = document.getElementById('button1');
button1.addEventListener('click', () => {
  const input1 = document.getElementById('files');
  putFile(input1.files[0]);
})*/

var camera = document.getElementById('camera');
var frame = document.getElementById('frame');

camera.addEventListener('change', function(e) {
  var file = e.target.files[0];
  frame.src = URL.createObjectURL(file);
  detectObjects(file);
});

/*const button2 = document.getElementById('button2');
button2.addEventListener('click', () => {
  const input2 = document.getElementById('text').innerHTML;
  TextToMP3(input2)
})*/