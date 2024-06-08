function inverseArnoldCatMap(image, iterations) {
    const height = image.length;
    const width = image[0].length;
    const transformationMatrix = [[1, -1], [-1, 2]]; 
  
    for (let i = 0; i < iterations; i++) {
      const newImage = new Array(height).fill(null).map(() => new Array(width).fill(0));
  
      for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
          const oldPos = [x, y];
          const newPos = [
            (transformationMatrix[0][0] * oldPos[0] + transformationMatrix[0][1] * oldPos[1]) % height,
            (transformationMatrix[1][0] * oldPos[0] + transformationMatrix[1][1] * oldPos[1]) % width
          ];
          newPos[0] = (newPos[0] + height) % height;
          newPos[1] = (newPos[1] + width) % width;
          newImage[x][y] = image[newPos[0]][newPos[1]];
        }
      }
      image = newImage;
    }
    return image;
}
function decrypt(image, key) {
    const decryptedImage = [];
    for (let i = 0; i < image.length; i++) {
      decryptedImage[i] = [];
      for (let j = 0; j < image[i].length; j++) {
        decryptedImage[i][j] = image[i][j] ^ key;
      }
    }
    return decryptedImage;
}
  const decryptedImg = decrypt(ACMimg, secretKey);
  const iterations = 10;
  const descrambledImg = inverseArnoldCatMap(ACMimg, iterations);

  //need to add to check secret key entered is same as real key or not
  