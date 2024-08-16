import React, { useEffect } from 'react';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageUrl: string;
  userName: string;
}

const CardCanvas: React.FC<Props> = ({ canvasRef, imageUrl, userName }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          const scaleFactor = Math.min(canvas.width / image.width, canvas.height / image.height);
          const imageWidth = image.width * scaleFactor;
          const imageHeight = image.height * scaleFactor;
          const xOffset = (canvas.width - imageWidth) / 2;
          const yOffset = (canvas.height - imageHeight) / 2;
          const borderRadius = 10;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.moveTo(xOffset + borderRadius, yOffset);
          ctx.arcTo(xOffset + imageWidth, yOffset, xOffset + imageWidth, yOffset + imageHeight, borderRadius);
          ctx.arcTo(xOffset + imageWidth, yOffset + imageHeight, xOffset, yOffset + imageHeight, borderRadius);
          ctx.arcTo(xOffset, yOffset + imageHeight, xOffset, yOffset, borderRadius);
          ctx.arcTo(xOffset, yOffset, xOffset + imageWidth, yOffset, borderRadius);
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(image, xOffset, yOffset, imageWidth, imageHeight);

          ctx.font = `${Math.floor(canvas.width / 20)}px Arial`;
          ctx.textAlign = 'center';
          ctx.fillStyle = 'white';
          ctx.fillText('Thank You', canvas.width / 2, canvas.height * 0.1);
          ctx.fillText(userName, canvas.width / 2, canvas.height * 0.9);
        };
      }
    }
  }, [canvasRef, imageUrl, userName]);

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <div className='flex justify-center'>
        <p className="text-center w-[300px]">Enter your name and click on the download button below to download your card</p>
      </div>
      <canvas ref={canvasRef} width="600" height="750" className="w-full h-auto"></canvas>
    </div>
  );
};

export default CardCanvas;
