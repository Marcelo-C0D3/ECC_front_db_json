const multer = require('multer')
const path   = require('path')

// Define the maximum size for uploading 
// picture i.e. 10 MB. it is optional 
const maxSize = 10 * 1000 * 1000; 

/** Storage Engine */
const storageEngine = multer.diskStorage({
    
    destination: './public/files',
    filename: function(req, file, fn){
        fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname))
    }
});

const upload =  multer({

    storage: storageEngine,
    limits: { fileSize: maxSize },
    // fileFilter: function (req, file, cb){ 
    
    //     // Set the filetypes, it is optional 
    //     var filetypes = /wav/; 
    //     var mimetype = filetypes.test(file.mimetype); 
  
    //     var extname = filetypes.test(path.extname( 
    //                 file.originalname).toLowerCase()); 
        
    //     if (mimetype && extname) { 
    //         return cb(null, true); 
    //     } 
      
    //     cb("Error: File upload only supports the "
    //             + "following filetypes - " + filetypes); 
    //   }  
})


module.exports = upload