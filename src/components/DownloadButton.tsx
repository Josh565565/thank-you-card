import React from 'react';

const DownloadButton: React.FC<{ canvasRef: React.RefObject<HTMLCanvasElement> }> = ({ canvasRef }) => {
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'thank-you-card.png';
        link.click();
      }, 100);
    }
    
  };

  return (
    <button onClick={downloadImage} className="bg-blue-500 text-white px-4 py-2 rounded">
      Download Image
    </button>
  );
};

export default DownloadButton;
