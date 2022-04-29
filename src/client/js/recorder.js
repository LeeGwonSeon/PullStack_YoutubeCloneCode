import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;


//ffmpeg 에러발생 2022년 4월 29일 오전 11시경
// 에러가 날 수 있는 상황 패키지 버전, 노드 문제 및 
//webpack test/\js$ <- 오타문제
const handleDownload = async () => {
    const ffmpeg = createFFmpeg({ corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js', log: true });
    await ffmpeg.load();

    
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
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