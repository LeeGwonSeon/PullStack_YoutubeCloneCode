import { cache } from "pug/lib";
import Video from "../models/Video";
/*
console.log("start")
Video.find({}, (error, videos) => {
    if(error){
        return res.render("server-error")
    }
    return res.render("home", { pageTitle: "Home", videos});
}); 
console.log("finished")
*/
export const home = async(req, res) => { 
    const videos = await Video.find({}).sort({createdAt: "desc"});
    return res.render("home", {pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.render("404" ,{ pageTitle: "Video not found."});
        }
        return res.render("watch", { pageTitle: video.title , video });
    };
export const getEdit = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.render("404" ,{ pageTitle: "Video not found."});
        }
    return res.render("edit", {pageTitle:`Edit: ${video.title}`, video });
};
export const postEdit = async(req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({ _id: id});
    if(!video) {
        return res.render("404" ,{ pageTitle: "Video not found."});
        }
        await Video.findOneAndUpdate(id, {
            title, description, hashtags:Video.formatHashtags(hashtags)
        });
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle:"Upload Video"});
};

export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    console.log(title, description, hashtags);
    try{
        await Video.create({
            title,
            description,
            hashtags:Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    }catch(error){
        return res.render("upload", {
            pageTitle:"Upload Video",
            errorMessage: error._message,
        });
    }
    
};

export const deleteVideo = async(req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    // delete video
    return res.redirect("/");
}

export const search = (req, res) => {
    const { keyword } = req.query;
    if(keyword) {
        // search
    }
    return res.render("search", {pageTitle:"Search"});
}