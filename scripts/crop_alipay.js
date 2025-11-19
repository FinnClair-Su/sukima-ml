const { Jimp } = require('jimp');
const path = require('path');

async function cropImage() {
    const imgPath = path.resolve(__dirname, '../static/img/alipay_receiveMoney.png');

    try {
        const image = await Jimp.read(imgPath);
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        console.log(`Original size: ${width}x${height}`);

        const targetHeight = 964;

        if (height <= targetHeight) {
            console.log("Image is already short enough.");
            return;
        }

        // Crop from top-left (0,0)
        image.crop({ x: 0, y: 0, w: width, h: targetHeight });

        await image.write(imgPath);
        console.log(`Successfully cropped image to ${width}x${targetHeight}`);

    } catch (err) {
        console.error("Error processing image:", err);
    }
}

cropImage();
