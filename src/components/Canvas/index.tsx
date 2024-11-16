import React, { useCallback, useRef } from 'react';
import { Canvas as FabricCanvas, FabricText, TPointerEvent, TPointerEventInfo } from 'fabric';
import { useMount } from 'ahooks';
import Toolbar from './Toolbar';
import { useGlobal } from '@src/context';
import SideBar from '../SideBar';
const CanvasWrapper: React.FC = () => {
  const { dispatch } = useGlobal();
  const Canvas = useRef<HTMLCanvasElement>();
  const CanvasContext = useRef<FabricCanvas>();
  const isMove = useRef(false);
  const moveForm = useRef({});

  const onMove = useCallback(
    (e: TPointerEventInfo<TPointerEvent>) => {
      const moveTo = e.viewportPoint;

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
  useMount(() => {
    const canvas = new FabricCanvas(Canvas.current, {
      backgroundColor: '#fff',
      height: 600,
      width: 1000,
      isDrawingMode: false,
    });
    dispatch({
      type: 'initCanvas',
      payload: {
        canvas,
      },
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

    // canvas.on('mouse:down', (e) => {
    //   isMove.current = true;
    //   moveForm.current = {
    //     ...e.viewportPoint,
    //     viewportTransform: [...CanvasContext.current?.viewportTransform!],
    //   };

    //   canvas.on('mouse:move', onMove);

    //   canvas.on('mouse:up', onMoveEnd);
    // });

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
  });

  return (
    <>
      <canvas id="canvas" ref={Canvas}></canvas>
      <Toolbar></Toolbar>
      <SideBar />
    </>
  );
};
export default CanvasWrapper;
