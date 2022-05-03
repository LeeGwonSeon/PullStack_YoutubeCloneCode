import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
// actionBtn명으로 된 데이터를 upload.pug에서 actionBtn명으로 지정된 상태의 데이터를 가져옴
// actionBtn명을 변경할 경우 upload.pug에서도 같은 명으로 변경해야함 (안할 시 Null 상태의 에러 발생)
const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};


//ffmpeg 에러발생 2022년 4월 29일 오전 11시경
// 에러가 날 수 있는 상황 패키지 버전, 노드 문제 및 
//webpack test/\js$ <- 오타문제
//사이트를 동시에 열고 녹화를 하면 에러가 발생

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);

  actionBtn.innerText = "Transcoding...";

  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({ corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js', log: true });
  await ffmpeg.load();

    
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb);

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type:"video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"});

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);

    actionBtn.disabled = false;
    actionBtn.innerText = "Record Again";
    actionBtn.addEventListener("click", handleStart);    
};

  const handleStart = () => {
    actionBtn.innerText = "Recording";
    actionBtn.disabled = true;
    actionBtn.removeEventListener("click", handleStart);
    recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable = (event) => {
      videoFile = URL.createObjectURL(event.data);
      video.srcObject = null;
      video.src = videoFile;
      video.loop = true;
      video.play();
      actionBtn.innerText = "Download";
      actionBtn.disabled = false;
      actionBtn.addEventListener("click", handleDownload);
    };
    recorder.start();
    setTimeout(() => {
      recorder.stop();
    }, 5000);
  };
  
  const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 1024,
        height: 576,
      },
    });
    video.srcObject = stream;
    video.play();
  };
  init();
  actionBtn.addEventListener("click", handleStart);
  
  

  