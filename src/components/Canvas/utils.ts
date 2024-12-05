import { TCanvasSizeOptions } from 'fabric';
import { Canvas as FabricCanvas } from 'fabric';

const initCanvas = (el?: string | HTMLCanvasElement, options?: TCanvasSizeOptions) => {
  const canvas = new FabricCanvas(el, {
    backgroundColor: '#fff',
    height: 600,
    width: 1000,
    isDrawingMode: false,
    ...options,
  });

  return canvas;
};
