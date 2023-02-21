import express from 'express';
import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();


import cors from 'cors'


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}))

app.use(express.static('public'));


// Endpoint to generate an image with a customizable caption
app.get('/generate-image', async (req, res) => {
    try {
      const caption = req.query.caption || 'Your Caption Here'; // Get the caption from query parameter or set default value
      const imageUrl = `https://picsum.photos/800/600`; // URL to retrieve a random image from Picsum
  
      // Download the image from Picsum
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

  // Use Sharp to add the caption to the image
const image = sharp(response.data)
.resize({ width: 800, height: 600 }) // Resize the image to 800x600
.composite([
  {
    input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <rect x="0" y="250" width="800" height="100" fill="#000" opacity="0.5"/>
      <text x="400" y="305" fill="#fff" font-size="30" text-anchor="middle">${caption}</text>
    </svg>`),
    blend: 'over',
  },
])
.jpeg();


      // Save the image to a file
      const filename = `image-${Date.now()}.jpg`;
      await image.toFile(`public/images/${filename}`);
  
      // Send the generated image file to the client
      res.sendFile(`public/images/${filename}`, { root: __dirname });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while generating the image.');
    }
  });






app.listen(8080, () => {
  console.log('API listening on port 8080');
});