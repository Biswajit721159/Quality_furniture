let {v2}=require('cloudinary');
let fs=require('fs')
const cloudinary=v2;

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try 
    {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response;
        
    } catch (error) {
       fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}


// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
// { public_id: "olympic_flag" }, 
// function(error, result) {console.log(result); });


module.exports={uploadOnCloudinary}