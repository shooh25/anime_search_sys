import React, { useState } from 'react'

const ImageInput: React.FC = () => {
  const [base64Image, setBase64Image] = useState<string | null>(null); // setting image URL

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        return;
      }
      setBase64Image(result);
    };
  };

  return (
    <div>
      <h2 className='font-bold text-xl'>画像検索</h2>
      <input
        type="file"
        accept='image/png, image/jpeg'
        onChange={handleInputFile}
      />
      <div className='w-full aspect-video'>
        {base64Image && <img src={base64Image} className='w-full h-full object-cover' />}
      </div>
      <div className='w-full flex justify-center'>
        <button disabled={!base64Image}>Run with image</button>
      </div>
    </div>
  )
}

export default ImageInput