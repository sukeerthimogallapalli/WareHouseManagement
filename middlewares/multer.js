const multer = require('multer');
const Puid = require('puid');
const puid = new Puid();
const path = require('path');

const uuidv4 = require('uuid/v4');
// const accepted_extensions = ['jpg', 'png', 'gif', 'jpeg', 'pdf', 'csv'];

const fileTypeConfigs = [
  {
    type: '0test',
    extensions: ['.png', '.jpg', '.jpeg', '.mp4'],
    sizeLimit: '1 MB',  // for display purpose. please ensure sizeLimitBytes and sizeLimit is in sync
    sizeLimitBytes: 1024000,
  },
  {
    type: 'pdf',
    extensions: ['.pdf'],
    sizeLimit: '1 MB',
    sizeLimitBytes: 1024000 //'1mb' 480678
  },
  {
    type: 'img',
    extensions: ['.jpg', '.png', '.jpeg'],
    sizeLimit: '1 MB',
    sizeLimitBytes: 1024000
  },
  {
    type: 'doc',
    extensions: ['.pdf', '.jpg', '.png', '.jpeg'],
    sizeLimit: '5 MB',
    sizeLimitBytes: 5024000
  },
  {
    type: 'csv',
    extensions: ['.csv'],
    sizeLimit: '5 MB',
    sizeLimitBytes: 5124000
  },
];


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + puid.generate() + uuidv4() + Date.now() + "." + file.mimetype.split('/')[1])
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {

    const fileTypeConfig = fileTypeConfigs.find(e => e.type === req.params.fileType);

    if (!req.context) req.context = {};
    req.context.fileTypeConfig = fileTypeConfig;

    let ext = path.extname(file.originalname);
    console.log("------------", file.mimetype);

    if (!fileTypeConfig || !fileTypeConfig.extensions.some(e => e === ext.toLowerCase())) {
      return callback(new Error(`Please upload a ${
        fileTypeConfig.extensions.join('').split('.').join(', ').replace(', ','').toUpperCase()
        } file not exceeding ${fileTypeConfig.sizeLimit}.`));
    } else {
      callback(null, true);
    }
  }
});

//middlewares to restrict file type
upload.pdfType = (req, res, next) => { req.params.fileType = 'pdf'; next(); };
upload.imgType = (req, res, next) => { req.params.fileType = 'img'; next(); };
upload.docType = (req, res, next) => { req.params.fileType = 'doc'; next(); };
upload.csvType = (req, res, next) => { req.params.fileType = 'csv'; next(); };

upload.checkSize = (req, res, next) => {

  console.log('-file---->>>');
  console.log(req.file);
  console.log(req.context.fileTypeConfig);

  if (req.file.size > req.context.fileTypeConfig.sizeLimitBytes) {
    res.body = {
      'meta': Object.assign({},
        req.context.fileTypeConfig,
        { extensions: req.context.fileTypeConfig.extensions.join('').split('.').join(', ').replace(', ','').toUpperCase() })
    };
    next(new Error('FILE_TOO_LARGE_FOR_TYPE'))
  } else {
    next();
  }
};

module.exports = upload;

