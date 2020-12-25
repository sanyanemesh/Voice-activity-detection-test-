  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContext();

  function startUserMedia(stream) {
    var source = audioContext.createMediaStreamSource(stream);
    const video = document.querySelector('video');
    const videoTracks = stream.getVideoTracks();
    
    console.log(`Using video device: ${videoTracks[0].label}`);
    window.stream = stream; 
    video.srcObject = stream;
    var options = {
     source: source,
     voice_stop: function() {document.querySelector('span').classList.remove('green')}, 
     voice_start: function() {document.querySelector('span').classList.add('green')}
    }; 
    
    var vad = new VAD(options);
  }

  navigator.getUserMedia = navigator.getUserMedia;
  navigator.getUserMedia({audio: true, video: true}, startUserMedia, function(e) {
        console.log("No live audio input in this browser: " + e);
  });
  