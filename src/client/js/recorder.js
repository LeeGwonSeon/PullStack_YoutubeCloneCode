import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;


//ffmpeg 에러발생 2022년 4월 29일 오전 11시경
// 에러가 날 수 있는 상황 패키지 버전, 노드 문제 및 
//webpack test/\js$ <- 오타문제
//사이트를 동시에 열고 녹화를 하면 에러가 발생
const handleDownload = async () => {
    const ffmpeg = createFFmpeg({ corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js', log: true });
    await ffmpeg.load();

    
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
  await ffmpeg.run("-i", "recording.webm", "-ss", "00:00:01", "-frames:v", "1", "thumbnail.jpg");

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

  const mp4Blob = new Blob([mp4File.buffer], { type:"video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"});

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "MyRecording.mp4";
    document.body.appendChild(a);
    a.click();

    const thumbA = document.createElement("a");
    thumbA.href = thumbUrl;
    thumbA.download = "MyThumbnail.jpg";
    document.body.appendChild(thumbA);
    thumbA.click();

    ffmpeg.FS("unlink", "recording.webm");
    ffmpeg.FS("unlink", "output.mp4");
    ffmpeg.FS("unlink", "thumbnail.jpg");

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);
};

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
  };
  const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable = (event) => {
      videoFile = URL.createObjectURL(event.data);
      video.srcObject = null;
      video.src = videoFile;
      video.loop = true;
      video.play();
    };
    recorder.start();
  };
  const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    video.srcObject = stream;
    video.play();
  };
  init();
  startBtn.addEventListener("click", handleStart);