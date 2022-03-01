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
            newGradleFileContent = newGradleFileContent.replace(versionCodeRegexPattern, `$1${versionCode}`);
        }

        if (newVersionName.length > 0) {
            newGradleFileContent = newGradleFileContent.replace(versionNameRegexPattern, `$1\"${versionName}\"`);
        }

        fs.writeFile(gradlePath, newGradleFileContent, function (err) {
            if (err) throw err;

            if (newVersionCode.length > 0) {
                console.log(`Successfully changed the version code to ${newVersionCode}`)
            }

            if (newVersionName.length > 0) {
                console.log(`Successfully changed the version name to ${newVersionName}`)
            }
            console.log(`Generated version: ${newVersionName} (${newVersionCode})`)
            console.log(`Current version: ${currentVersionName} (${currentVersionCode})`)

            core.setOutput("generated_version", `${newVersionName} (${newVersionCode})`);
            core.setOutput("generated_version_name", newVersionName);
            core.setOutput("generated_version_code", newVersionCode);
        });
    });
} catch (error) {
    core.setFailed(error.message);
}

function findVersion(content, pattern) {
    let m;
    let result;
    while ((m = pattern.exec(content)) !== null) {
        if (m.index === pattern.lastIndex) {
            pattern.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            result = match
        });
    }
    return result;
}