import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async(event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    let text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === ""){
        return;
    }
    await fetch(`/api/videos/${videoId}/comment`,{
        method: "POST",
        body: JSON.stringify({text}),
    });
    textarea.value = "";
};

if(form){
    form.addEventListener("submit", handleSubmit);
}