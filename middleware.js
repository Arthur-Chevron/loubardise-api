const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
}

const MAX_SIZE = 1024 * 20000

const fileFilter = function(eq, file, cb){
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
  // le fichier est de bon type ?
  if(!allowedTypes.includes(file.mimetype)){
    const error = new Error('Mauvais type de fichier')
    error.code = "LIMIT_FILE_TYPE"
    return cb(error, false)
  }

  cb(null, true)
}

const upload = multer({
   fileFilter,
   limits: {
     fileSize: MAX_SIZE
  }
})

module.exports = upload
