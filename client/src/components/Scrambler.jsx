const fs = require('fs');
const PNG = require('pngjs').PNG;

const pngFilePath = 'image.png';

fs.createReadStream(pngFilePath)
  .pipe(new PNG())
  .on('parsed', function () {
    const width = this.width;
    const height = this.height;
    const img = new Array(height).fill(null).map(() => new Array(width).fill(0));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        img[y][x] = this.data[idx];
      }
    }

    function arnoldCatMap(image, iterations) {
      const transformationMatrix = [[2, 1], [1, 1]];

      for (let i = 0; i < iterations; i++) {
        const newImage = new Array(height).fill(null).map(() => new Array(width).fill(0));

        for (let x = 0; x < height; x++) {
          for (let y = 0; y < width; y++) {
            const oldPos = [x, y];
            const newPos = [
              (transformationMatrix[0][0] * oldPos[0] + transformationMatrix[0][1] * oldPos[1]) % height,
              (transformationMatrix[1][0] * oldPos[0] + transformationMatrix[1][1] * oldPos[1]) % width
            ];
            newImage[x][y] = image[newPos[0]][newPos[1]];
          }
        }
        image = newImage;
      }
      return image;
    }

    function encrypt(image, key) {
      const encryptedImage = [];
      for (let i = 0; i < image.length; i++) {
        encryptedImage[i] = [];
        for (let j = 0; j < image[i].length; j++) {
          encryptedImage[i][j] = image[i][j] ^ key; 
        }
      }
      return encryptedImage;
    }

    const secretKey = 123456;//example

    const encryptedImg = encrypt(img, secretKey);
    const iterations = 10;
    const ACMimg = arnoldCatMap(encryptedImg, iterations);
  });

  //encryption of message is left 