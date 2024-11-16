import React from 'react';
import './index.scss';
import CanvasWrapper from '@src/components/Canvas';
const Home: React.FC = () => {
  return (
    <div className="h-[100vh] bg-stone-100 flex justify-center items-center">
      <CanvasWrapper></CanvasWrapper>
    </div>
  );
};
export default Home;
