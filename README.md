# android-version-generator-actions v1
Override your android version name and version code through github actions

## Features
* Override version code to bump version through github actions
* Override version name

## Parameters
`gradlePath`
**Required**, File path to the **Path to the build.gradle or build.gradle.kts file** so that it knows where to find the file that contains the versionCode and versionName attributes.

`versionCode`
**Optional**, Version code to override

`versionName`
**Optional**, Version name to override

## Example
```
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: set up JDK 1.8
        uses: actions/setup-java@v1
        with:
          java-version: 1.8
      - name: Bump version
        uses: Swisyn/android-version-generator-actions@v1
        with:
          gradlePath: app/build.gradle # or app/build.gradle.kts 
          versionCode: ${{github.run_number}}
          versionName: 1.0.0
```
