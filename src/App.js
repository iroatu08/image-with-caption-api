import React, { useState } from 'react';
import axios from 'axios';

const App = () => {

  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const generateImage = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/generate-image?caption=${encodeURIComponent(caption)}`);
      setImageUrl(response.request.responseURL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* on form submission a new image would be generated holding the caption you typed on the Input field */}
      <form onSubmit={generateImage}>
        <label>
          Caption:
          <input type="text" value={caption} onChange={(event) => setCaption(event.target.value)} />
        </label>
        <button type="submit">Generate Image</button>
      </form>
      
      {/* displays the image after submit */}
      {imageUrl && (
        <img src={imageUrl} alt="GeneratedImage" />
      )}
    </div>
  );
}

export default App;
