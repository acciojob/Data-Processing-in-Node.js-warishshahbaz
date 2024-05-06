// Implement the processData function in app.js:

const fs = require("fs");
const { Transform } = require("stream");

function processData(inputFilePath, outputFilePath) {
  // Create a readable stream from the input file
  const readableStream = fs.createReadStream(inputFilePath);

  // Create a writable stream to the output file
  const writableStream = fs.createWriteStream(outputFilePath);

  // Create a transform stream for processing data
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      // Process the data here, for example, converting to uppercase
      const processedChunk = chunk.toString().toUpperCase();
      this.push(processedChunk); // Push the processed data to the next stream
      callback(); // Notify that processing of this chunk is complete
    },
  });

  // Pipe the readable stream to the transform stream, then to the writable stream
  readableStream.pipe(transformStream).pipe(writableStream);

  // Optional: Handle errors
  readableStream.on("error", (error) => console.error("Read error:", error));
  writableStream.on("error", (error) => console.error("Write error:", error));
}

processData("input.txt", "output.txt");
