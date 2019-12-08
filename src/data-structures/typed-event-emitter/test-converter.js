const fs = require('fs');
const path = require('path');

const sourceDir = `${__dirname}/__tests__`;
const targetDir = `${__dirname}/__tests__2`;

fs.readdir(sourceDir, async (err, sourceFiles) => {
  console.log(`Retrieved ${sourceFiles.length} sourceFiles`);

  const saves = await Promise.all(sourceFiles
    .filter(sourceFile => sourceFile.endsWith('.js'))
    .map(sourceFile => new Promise((res, rej) => {

      const targetFile = `typed-event-emitter.${path.basename(sourceFile.substr('test-event-emitter-'.length, sourceFile.length), '.js')}.test.ts`;

      fs
        .createReadStream(`${sourceDir}/${sourceFile}`)
        .pipe(fs.createWriteStream(`${targetDir}/${targetFile}`))
        .once('close', res);
    }))
  );

  console.log('Completed...');
});
