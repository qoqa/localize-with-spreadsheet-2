const fs = require('fs')
const EOL = require('./Constants').EOL

const FileWriter = function() {
}

FileWriter.prototype.write = function(filePath, encoding, lines, transformer, options) {
  let fileContent = ''
 
  const valueToInsert = this.getTransformedLines(lines, transformer)

  let output = transformer.insert(fileContent, valueToInsert, options)
  
  // Ensure file ends with a newline
  if (output && !output.endsWith(EOL)) {
    output += EOL
  }

  writeFileAndCreateDirectoriesSync(filePath, output, 'utf8')
}

//https://gist.github.com/jrajav/4140206
const writeFileAndCreateDirectoriesSync = function(filepath, content, encoding) {
  const mkpath = require('mkpath')
  const path = require('path')

  const dirname = path.dirname(filepath)
  mkpath.sync(dirname)

  fs.writeFileSync(filepath, content, encoding)
}

//

const FakeWriter = function() {

}

FileWriter.prototype.getTransformedLines = function(lines, transformer) {
  let valueToInsert = ''
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (!line.isEmpty()) {
      if (line.isComment()) {
        const transformed = transformer.transformComment(line.getComment())

        if (transformed !== null) {
          valueToInsert += transformed

          if (i !== lines.length - 1) {
            valueToInsert += EOL
          }
        }
      } else {
        valueToInsert += transformer.transformKeyValue(line.getKey(), line.getValue(), line.getRemark())

        if (i !== lines.length - 1) {
          valueToInsert += EOL
        }
      }
    }
  }

  return valueToInsert
}

FakeWriter.prototype.write = function(filePath, lines, transformer) {

}

module.exports = { File: FileWriter, Fake: FakeWriter }
