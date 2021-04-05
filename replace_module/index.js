const fs = require("fs");

const replace = () => {
  const srcDirPath = "./json_src";
  const resultDirPath = "./json_result";
  if (!fs.existsSync(resultDirPath)) {
    fs.mkdirSync(resultDirPath);
  }
  fs.readdir(srcDirPath, (err, fileNames) => {
    if (err) {
      process.exit(0);
    }
    fileNames.forEach((fileName) => {
      fs.readFile(srcDirPath + fileName, (err, data) => {
        if (err) {
          process.exit(0);
        }
        const result = JSON.parse(data).map((obj) => ({
          ...obj,
          text: obj.text.replace(/\(USER_NAME\)/g, obj.name),
        }));
        fs.writeFileSync(resultDirPath + fileName, JSON.stringify(result));
      });
    });
  });
};

replace();
