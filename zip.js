const fs = require("fs");
const zip = require("node-native-zip");

const archive = new zip();

archive.addFiles([ 
    { name: "tw-tcg-bot Setup 0.1.0.exe", path: "./dist_electron/tw-tcg-bot Setup 0.1.0.exe" },
], function (err) {
    if (err) return console.log("err while adding files", err);
    const buff = archive.toBuffer();
    fs.writeFile("./bot.zip", buff, function () {
        console.log("Finished");
    });
});