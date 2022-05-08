const core = require('@actions/core');
const fs = require('fs');

const versionCodeRegexPattern = /(versionCode(?:\s|=)*)(.*)/;
const versionNameRegexPattern = /(versionName(?:\s|=)*)(.*)/;

try {
    const gradlePath = core.getInput('gradlePath');
    let newVersionCode = core.getInput('versionCode');
    let newVersionName = core.getInput('versionName');

    console.log(`Gradle Path : ${gradlePath}\nVersion Code : ${newVersionCode}\nVersion Name : ${newVersionName}`);

    fs.readFile(gradlePath, 'utf8', function (err, data) {
        let newGradleFileContent = data;
        let currentVersionName = findVersion(newGradleFileContent, versionNameRegexPattern)
        let currentVersionCode = findVersion(newGradleFileContent, versionCodeRegexPattern)

        console.log(`Current versionName = ${currentVersionName}, currentVersionCode = ${currentVersionCode} `)

        if (newVersionCode.length > 0) {
            newGradleFileContent = newGradleFileContent.replace(versionCodeRegexPattern, `$1${newVersionCode}`);
            currentVersionCode = newVersionCode
        } else {
            newVersionCode = currentVersionCode
        }

        if (newVersionName.length > 0) {
            newGradleFileContent = newGradleFileContent.replace(versionNameRegexPattern, `$1\"${newVersionName}\"`);
            currentVersionName = newVersionName
        } else {
            newVersionName = currentVersionName.replace(/"/g,"")
        }

        fs.writeFile(gradlePath, newGradleFileContent, function (err) {
            if (err) throw err;

            console.log(`##### Current version details #####\nVersion name: ${currentVersionName}\nVersion code: ${currentVersionCode}\n`)
            console.log(`##### New version details #####\nVersion name:${newVersionName}\nVersion code: ${newVersionCode}\n`)
           
            core.setOutput("generated_version", `${newVersionName} (${newVersionCode})`.trim());
            
            core.setOutput("current_version_name", currentVersionName.trim());
            core.setOutput("current_version_code", currentVersionCode);
            
            core.setOutput("generated_version_name", newVersionName.trim());
            core.setOutput("generated_version_code", newVersionCode.trim());
        });
    });
} catch (error) {
    core.setFailed(error.message);
}

function findVersion(content, pattern) {
    const result = pattern.exec(content);
    return result[result.length - 1]
}
