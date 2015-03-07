var path = require('path'),
    fs = require('fs'),
    rootPath = path.normalize(__dirname + '/../../');

var ip = '127.0.0.1',
    port = 3310,
    connection_string = 'mongodb://127.0.0.1:27017/twitterStore',
    dataDirRoot = rootPath;

//Init storage folder if not created
(function initStorageFolderStructure() {
    fs.readdir(dataDirRoot + 'storage',function(error, files){
        if(error){
            console.log('Does not exist: ',dataDirRoot+ '/storage');
            fs.mkdir(dataDirRoot + 'storage',function(error, files){
                if(error){
                    console.log('Cannot create folder: ', dataDirRoot + '/storage');
                }else{
                    console.log('Folder created ', dataDirRoot + '/storage');
                }
            });
        }
    });
})();

module.exports = {
    rootPath: rootPath,
    port: port,
    ip: ip,
    db: connection_string,
    storageDir: dataDirRoot,
    baseUrl : 'http://' + ip + ':' + port,
    session : {
        secret: 'tw1tt3rStor3',
        resave: true,
        saveUninitialized: true
    },
    twitter: {
        callbackURL: 'http://' + ip + ':' + port + '/auth/twitter/callback',
        consumerSecret: 'bDyhIG19O6wt6JvjnJBEOGljQlFooh1qL3f1TxCSPnkgwjubp2',
        consumerKey: 'X7Ztkb72RkjOGjie0uDgKJo8g'
    }
};