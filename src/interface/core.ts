export interface Cell {
    id: number; // 编号
    x: number;
    y: number;
    w: number;
    h: number;
    colspan: number;
    text: string;
    row: number;
    col: number;
}
// 缺省的单元格配置
export interface DefaultCell {
    id?: number;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    colspan?: number;
    text?: string;
    row?: number;
    col?: number;
}
export interface Row {
    cells: Cell[];
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface  Cursor  {
    x: number;
    y: number;
    row: number;
    col: number;
}
export interface RowOption {
    width?: number;
    height?: number;
    top?: number;
    left?: number;
}
export interface EventParam {
    event: string,
    node: Cell,
    e: MouseEvent
}
export interface Listener {
    event: string; // 事件名称
    cb: (event: EventParam) => void; // 回调函数
}
export type BasicEvent = 'click' | 'mouseover' | 'mouseout' // 基本事件