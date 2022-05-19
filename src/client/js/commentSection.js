const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === ""){
        return;
    }
    fetch(`/api/videos/${videoId}/comment`,{
        method: "POST",
        body: JSON.stringify({ text }),
    });
};

if(form){
    form.addEventListener("submit", handleSubmit);
}