import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, maxlength: 80 },
    fileUrl: {type: String, required: true},
    thumbUrl: {type: String, required: true},
    //description에서 minLength가 20으로 되어 있어서 길이가 짤습니다 에러 발생. video, thumb 배열을 만들었을 때 에러 발생
    description: {type: String, required: true, trim: true, minlength: 2 },
    createdAt: {type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: {type: Number, default: 0, required: true },
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment"},
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

// 나중에 해결해야할 부분 정규식 urlPath  regex 연구
videoSchema.static("changePathFormula", (urlPath) => {
    return urlPath.replace(/\\/g, "/");
    });

videoSchema.static('formatHashtags', function(hashtags){
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});


const Video = mongoose.model("Video", videoSchema); 
export default Video;