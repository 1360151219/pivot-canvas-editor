import React, { useCallback, useEffect, useRef } from 'react';
import './index.scss';
import { Canvas as FabricCanvas, FabricText, StaticCanvasEvents, TPointerEvent, TPointerEventInfo } from 'fabric';
const Home: React.FC = () => {
  const Canvas = useRef<HTMLCanvasElement>();
  const CanvasContext = useRef<FabricCanvas>();
  const isMove = useRef(false);
  const moveForm = useRef({});

  const onMove = useCallback(
    (e: TPointerEventInfo<TPointerEvent>) => {
      const moveTo = e.viewportPoint;
      console.log('====', moveForm.current.viewportTransform);

      if (isMove.current) {
        CanvasContext.current.viewportTransform[4] =
          moveForm.current.viewportTransform[4] + moveTo.x - moveForm.current.x;
        CanvasContext.current.viewportTransform[5] =
          moveForm.current.viewportTransform[5] + moveTo.y - moveForm.current.y;

        CanvasContext.current.renderAll();
      }
    },
    [CanvasContext.current]
  );

  const onMoveEnd = useCallback(
    (e: TPointerEventInfo<TPointerEvent>) => {
      const moveTo = e.viewportPoint;
      if (isMove.current) {
        CanvasContext.current.viewportTransform[4] =
          moveForm.current.viewportTransform[4] + moveTo.x - moveForm.current.x;
        CanvasContext.current.viewportTransform[5] =
          moveForm.current.viewportTransform[5] + moveTo.y - moveForm.current.y;
        CanvasContext.current.renderAll();
      }
      isMove.current = false;
      CanvasContext.current.off('mouse:move', onMove);
      CanvasContext.current.off('mouse:move', onMoveEnd);
    },
    [CanvasContext.current]
  );
  useEffect(() => {
    const canvas = new FabricCanvas(Canvas.current, {
      backgroundColor: '#fff',
      // backgroundImage
    });
    CanvasContext.current = canvas;
    const text = new FabricText('Fabric.JS', {
      cornerStrokeColor: 'blue',
      cornerColor: 'lightblue',
      cornerStyle: 'circle',
      padding: 10,
      transparentCorners: false,
      cornerDashArray: [2, 2],
      borderColor: 'orange',
      borderDashArray: [3, 1, 3],
      borderScaleFactor: 2,
    });
    canvas.add(text);
    canvas.centerObject(text);
    canvas.setActiveObject(text);

    canvas.on('mouse:down', (e) => {
      isMove.current = true;
      console.log('===mouse down', e);
      moveForm.current = {
        ...e.viewportPoint,
        viewportTransform: [...CanvasContext.current?.viewportTransform!],
      };

      canvas.on('mouse:move', onMove);

      canvas.on('mouse:up', onMoveEnd);
    });

    canvas.on('mouse:wheel', (e) => {
      const { wheelDelta } = (e.e as any) ?? {};
      const zoom = CanvasContext.current?.getZoom();
      if (!zoom) {
        return;
      }
      if (wheelDelta > 0) {
        CanvasContext.current?.zoomToPoint(e.viewportPoint, zoom + 0.01);
      } else {
        CanvasContext.current?.zoomToPoint(e.viewportPoint, zoom - 0.01);
      }
    });
  }, []);

  return (
    <div style={{ height: '100vh' }} className="container">
      <canvas id="canvas" ref={Canvas} height={'800'} width={800}></canvas>
    </div>
  );
};
export default Home;
