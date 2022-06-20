const {errorResponse, successResponse} = require("../helpers/response");
const cloudinary = require("../utils/cloudinary");

const uploadPicture = (req, res, next) => {
    const {file = null} = req;
    if(file){
        try {
            const uploadedResponse = cloudinary.uploader.upload(file, {
                upload_preset: "mf_default"
            });
            return successResponse(res, 200, uploadedResponse);
            
        } catch (error) {
            errorResponse(res, 500, error);
            
        }
    }
};

module.exports = { uploadPicture };
