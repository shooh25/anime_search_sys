import React, { useState } from 'react'

const ImageInput: React.FC = () => {
  const [base64Images, setBase64Images] = useState<string | null>(null); // setting image URL

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
      setBase64Images(result);
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
        {base64Images && <img src={base64Images} className='w-full h-full object-cover' />}
      </div>
    </div>
  )
}

export default ImageInput