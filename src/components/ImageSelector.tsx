import React, { useEffect, useState } from 'react';
// import Img1 from '../assets/img1.jpg';
// import Img2 from '../assets/img2.jpg';
// import Img3 from '../assets/img3.jpg';
// import Img4 from '../assets/img4.jpg';

const ImageSelector: React.FC<{ onSelect: (url: string) => void }> = ({ onSelect }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
        const apiKey = process.env.UNSPLASH_API_KEY;
      const response = await Promise.all(
        Array.from({ length: 4 }, async () => {
          const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`);
          const data = await res.json();
          return `${data.urls.raw}&w=300&h=300&fit=crop`;
        })
      );
      setImages(response);
    };
    fetchImages();
  }, []);

//   Use the randomimages array instead of the images array in the map function if you want to use the local images and also incase if the unsplash api limit is reached or if you don't want have API key
// to use the local images, uncomment the import statements at the top of the file and also uncomment the randomimages array below

//   const randomimages = [
//     Img1,
//     Img2,
//     Img3,
//     Img4
//   ]

  return (
    <div>
        <div className='flex flex-col items-center'>
        <h4 className="text-xl font-bold min-[370px]:text-2xl">Thank You Card Generator</h4>
            <h3 className="text-xl font-bold">Welcome</h3>
            <h5 className="text-base min-[370px]:text-lg">Select an Image</h5>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-[300px] h-[300px] bg-cover md:w-[500px] md:h-[400px]">
        {images.map((url, index) => (
            <img key={index} src={url} alt={`Random ${index}`} onClick={() => onSelect(url)} className="cursor-pointer rounded-md"/>
        ))}
        </div>
    </div>
  );
};

export default ImageSelector;
