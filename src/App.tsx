import React, { useState, useRef } from 'react';
import ImageSelector from './components/ImageSelector';
import CardCanvas from './components/CardCanvas';
import DownloadButton from './components/DownloadButton';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      {!selectedImage && <ImageSelector onSelect={setSelectedImage} />}
      {selectedImage && (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-2"
          />
          <CardCanvas canvasRef={canvasRef} imageUrl={selectedImage} userName={userName} />
          <DownloadButton canvasRef={canvasRef} />
        </>
      )}
    </div>
  );
};

export default App;
