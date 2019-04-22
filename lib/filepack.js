const fs = require('fs');
const path = require('path');
const eol = require('os').EOL;

exports.filepack = function (configFile) {

    if (configFile == undefined) {
        configFile = 'filepack.config.json';
    }

    if (fs.existsSync(configFile) == false) {
        throw `Configuration file '${configFile}' not found`;
    }

    let configContent = fs.readFileSync(configFile);
    let config = JSON.parse(configContent);

    var date = new Date();
    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var baseHeader = [
        'Created by filepack',
        'Date: ' + date.toLocaleDateString('en-US', dateOptions)
    ]

    if (fs.existsSync(config.output.path) == false) {
        fs.mkdirSync(config.output.path);
    }

    var startTime = new Date();

    for (var entry in config.entry) {
        console.log('packing into ' + entry);

        var operationContent = createHeader(baseHeader);

        var entryFiles = config.entry[entry];
        var index = 1;

        for (var fileName of entryFiles) {

            console.log(`[${index++}/${entryFiles.length}] ${fileName}`);

            operationContent += createHeader([
                'File: ' + fileName
            ]);

            operationContent += fs.readFileSync(fileName);
            operationContent += eol + eol;
        }

        console.log('completed ' + entry + '\n');

        fs.writeFileSync(path.join(config.output.path, entry) , operationContent);
    }

    console.log('filepack completed ' + (((new Date()) - startTime) / 1000) + 's');
}

function createHeader(headerLines) {
    var header = '/*' + eol;
    header += headerLines.join(eol);
    header += eol + '*/' + eol + eol;
    return header;
}
