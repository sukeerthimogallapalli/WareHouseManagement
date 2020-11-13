'use strict';

const multerS3 = require('multer-s3');
const multer = require('multer');
const AWS = require('aws-sdk');
const Puid = require('puid');
const puid = new Puid();
const path = require('path');

const fileExtensionWhitelist = ['.png', '.jpg', '.jpeg', '.bmp', '.pdf'];

const fileTypeConfigs = [{
        type: '0test',
        extensions: ['.png', '.jpg', '.jpeg', '.mp4'],
        sizeLimit: '100 MB', // for display purpose. please ensure sizeLimitBytes and sizeLimit is in sync
        sizeLimitBytes: 102400000,
        public:true
    },
    {
        type: 'ProfilePic',
        extensions: ['.jpg', '.png', '.jpeg'],
        sizeLimit: '1 MB',
        sizeLimitBytes: 1024000, //'1mb' 480678,
        public:true
    },
    {
        type: 'photoId',
        extensions: ['.jpg', '.png', '.jpeg'],
        sizeLimit: '1 MB',
        sizeLimitBytes: 1024000 ,//'1mb' 480678
        public:false
    },
    {
        type: 'bannerImage',
        extensions: ['.jpg', '.png', '.jpeg'],
        sizeLimit: '1 MB',
        sizeLimitBytes: 1024000 ,//'1mb' 480678
        public:false
    },{
        type: 'categoryIcon',
        extensions: ['.jpg', '.png', '.jpeg','.svg'],
        sizeLimit: '1 MB',
        sizeLimitBytes: 1024000 ,//'1mb' 480678
        public:true
    }
];

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_PUBLIC_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function(req, file, cb) {
            let meta = { mimetype: file.mimetype };
            if (req.User && req.User.identifier) // might help identify files from malicious users
                meta.user = req.User.identifier; // req.headers['user'] also possible
            cb(null, meta);
        },
        key: function(req, file, cb) {
            cb(null, `${req.params.fileType}-${puid.generate() + path.extname(file.originalname)}`)
        }
    }),
    fileFilter: function(req, file, callback) {
console.log('........')
        const fileTypeConfig = fileTypeConfigs.find(e => e.type === req.params.fileType);
        if(!fileTypeConfig){
            return callback(new Error(`Please upload a valid file type`))
        }
        if (!req.context) req.context = {};
        req.context.fileTypeConfig = fileTypeConfig;

        let ext = path.extname(file.originalname);
        console.log("------------", file.mimetype,fileTypeConfig);

        if (!fileTypeConfig || !fileTypeConfig.extensions.some(e => e === ext.toLowerCase())) {
            return callback(new Error(`Please upload a ${
        fileTypeConfig.extensions.join('').split('.').join(', ').replace(', ','').toUpperCase()
        } file not exceeding ${fileTypeConfig.sizeLimit}.`));
        } else {
            callback(null, true);
        }
    }
});

module.exports ={
    upload,fileTypeConfigs
} ;