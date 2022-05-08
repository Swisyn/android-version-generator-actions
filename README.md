[<img src="https://img.shields.io/github/v/release/Swisyn/android-version-generator-actions">](https://img.shields.io/github/v/release/Swisyn/android-version-generator-actions)

# android-version-generator-actions v1.5
Override your android version name and version code through github actions

## Features
* Override version code to bump version through github actions
* Override version name

## Input Parameters
`gradlePath` **Required**, File path to the **Path to the build.gradle or build.gradle.kts file** so that it knows where to find the file that contains the versionCode and versionName attributes.

`versionCode` **Optional**, Version code to override

`versionName` **Optional**, Version name to override

## Output Parameters
`generated_version` Output of combined version for eg: 1.0.0 (100)

`current_version_name` Output of the existing versionName

`current_version_code` Output of the existing versionCode

`generated_version_name` Output of the new versionName

`generated_version_code` Output of the new versionCod

## Example
```
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Setup JDK 11
        uses: actions/setup-java@v2
        with:
          distribution: 'adopt'
          java-version: '11'
          check-latest: true
          cache: 'gradle'
      - name: Bump version
        uses: Swisyn/android-version-generator-actions@v1.5
        with:
          gradlePath: app/build.gradle # or app/build.gradle.kts 
          versionCode: ${{github.run_number}}
          versionName: 1.0.0
```
