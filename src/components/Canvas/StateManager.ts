import { Canvas, CanvasEvents } from 'fabric';

// https://juejin.cn/post/7385487628457639999#heading-1
class CanvasStateManager {
  protected canvas: Canvas;
  // protected editor: IEditor;
  private undoStack: string[] = [];
  private redoStack: string[] = [];
  /**是否在恢复 */
  private isRestoring: boolean = false;
  /** 用于忽略下一次操作的保存*/
  private ignoreNextSave: boolean = false;
  private hasListener: boolean = true;
  private readonly maxUndoStackSize: number = 30; // 最大撤销堆栈大小

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    // this.editor = editor;
    this.saveCustomState();
  }
  initHistoryListener = async () => {
    this.canvas.on({
      'object:added': this.saveStateIfNotRestoring,
      'object:modified': this.saveStateIfNotRestoring,
      'object:removed': this.saveStateIfNotRestoring,
    });
  };

  offHistoryListener = () => {
    this.canvas.off('object:added', this.saveStateIfNotRestoring);
    this.canvas.off('object:modified', this.saveStateIfNotRestoring);
    this.canvas.off('object:removed', this.saveStateIfNotRestoring);
  };

  ignoreNextStateSave = () => {
    this.ignoreNextSave = true;
  };

  // 如果需要保存才保存，不需要保存则跳过 ignoreNextSave=true
  private saveStateIfNotRestoring = () => {
    if (!this.ignoreNextSave && this.hasListener) {
      this.saveCustomState();
    }
    this.ignoreNextSave = false; // 重置标志
  };

  saveCustomState = () => {
    // 获取当前画布的 JSON 描述
    const canvasState = this.canvas.toDatalessJSON();
    const currentStateString = JSON.stringify(canvasState);

    // 判断当前状态和撤销堆栈中最后一个状态是否相同
    if (this.undoStack.length > 0) {
      const lastUndoStateString = this.undoStack[this.undoStack.length - 1];
      if (currentStateString === lastUndoStateString) {
        // 如果当前状态和最后一个撤销状态相同，则不保存
        console.log('Current canvas state is identical to the last saved state. Skipping save.');
        return;
      }
    }

    // 将画布状态保存到撤销堆栈
    this.undoStack.push(currentStateString);

    // 输出保存信息
    console.log('saveCustomState', this.undoStack, this.redoStack);

    // 限制撤销堆栈的大小以节省内存
    if (this.undoStack.length > this.maxUndoStackSize) {
      this.undoStack.shift(); // 移除最旧的状态
    }
  };
}

export default CanvasStateManager;
