import React, { useCallback, useRef, useState } from 'react';
import { Canvas as FabricCanvas, FabricText, PencilBrush, TPointerEvent, TPointerEventInfo } from 'fabric';
import { useUpdate } from 'ahooks';
import { IconEdit } from '@douyinfe/semi-icons';
import IconArrow from '@src/assets/imgs/icon_arrow.svg';
import { useGlobal } from '@src/context';

const Toolbar: React.FC = () => {
  const {
    state: { canvas },
  } = useGlobal();
  const refresh = useUpdate();

  const isDrawingMode = canvas?.isDrawingMode;

  return (
    <div className="flex gap-3 item-center p-4 py-2 rounded-lg absolute bottom-4 left-1/2 -translate-x-1/2 border border-gray-300 bg-white">
      <div style={{ lineHeight: 0 }} className="p-1 rounded-md cursor-pointer hover:bg-gray-200">
        {isDrawingMode ? (
          <IconArrow
            onClick={() => {
              canvas.set('isDrawingMode', false);
              refresh();
            }}
          ></IconArrow>
        ) : (
          <IconEdit
            onClick={() => {
              canvas.set('isDrawingMode', true);
              const freeDrawingBrush = new PencilBrush(canvas);
              freeDrawingBrush.color = '#000000';
              freeDrawingBrush.width = 4;
              canvas.set('freeDrawingBrush', freeDrawingBrush);
              refresh();
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Toolbar;
