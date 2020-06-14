import {Cell, DefaultCell, Row, RowOption, Cursor} from '../interface/core'
export default class Render {
    ctx: CanvasRenderingContext2D;
    $el: HTMLCanvasElement;
    grid: number[];
    cellId: number;
    rowId: number;
    rows: Row[];
    cursor: Cursor;
    constructor(el: HTMLCanvasElement) {
        this.ctx = el.getContext('2d') || new CanvasRenderingContext2D()
        this.$el = el
        this.grid = [0, 0]
        this.cellId = 0;
        this.rowId = 0;
        this.rows = []
        this.cursor = { x: 0, y: 0, row: 0, col: 0 } // 贯标位置
    }
    drawCell(cell: Cell): void {
        const { x, y, w, h, row = 0, col = 0 } = cell
        const ctx = this.ctx;
        if (!cell.id) {
            this.cellId++;
            cell.id = this.cellId
        }
        ctx.rect(x, y, w, h);
        ctx.stroke();
        this.moveCursor(x + w, y + h, row, col + 1);
        this.setCellText(cell);
    }
    normalizedCell(cell: DefaultCell): Cell {
        return Object.assign({
            id: 0,
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            colspan: 1,
            text: '',
            row: 0,
            col: 0
        }, cell)
    }
    setCellText(cell: Cell) {
        const { x, y, w, h, text = '' } = cell
        const ctx = this.ctx;
        ctx.font = "18px bold 黑体";
        // 设置颜色
        ctx.fillStyle = "#ff0000";
        // 设置水平对齐方式
        ctx.textAlign = "center";
        // 设置垂直对齐方式
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + w / 2, y + h / 2);
    }
    drawRow(cells: DefaultCell[], options: RowOption) {
        if (!cells || cells.length === 0) {
            return;
        }
        const { x: cursorX, y: cursorY } = this.cursor;
        const rowId = this.rows.push({
            x: cursorX,
            y: cursorY,
            w: 0,
            h: 0,
            cells: []
        })
        const rowObj = this.rows[rowId - 1]
        let {
            width = 0,
            height = 0,
            top = cursorY,
            left = cursorX,
        } = options;
        let mergedCell: Cell | null = null;
        for (let i = 0; i < cells.length; i++) {
            const cell: Cell = Object.assign({
                id: 0,
                x: left,
                y: top,
                w: width,
                h: height,
                colspan: 1,
                row: rowId, // 行数
                col: i + 1, // 列数
                text: ''
            }, cells[i])
            left += cell.w;
            rowObj.w += cell.w // 所有单元格总宽
            if (cell.colspan > 1) {
                mergedCell = Object.assign({}, cell)
                mergedCell && rowObj.cells.push(mergedCell)
            } else if (cell.colspan === 0 && mergedCell) {
                mergedCell.w += cell.w
                cell.w = 0
                rowObj.cells.push(cell)
            } else if (cell.colspan === 1 && mergedCell) {
                this.drawCell(mergedCell)
                mergedCell = null
            }
            if (!mergedCell) {
                this.drawCell(cell);
                rowObj.cells.push(cell)
            }
            // rowObj.h = cell.h // 优化只赋值一次在最后
        }
        rowObj.h = rowObj.cells[0].h // 任意一个单元格高度
        this.rowId = rowId
        // 将 光标移动 到下 一个行开头
        this.moveCursor(cursorX, this.cursor.y, this.cursor.row + 1, 1)
    }
    redrawCell(cell: Cell): void {
        const ctx = this.ctx;
        const { x, y, w, h } = cell
        ctx.clearRect(x, y, w, h);
        this.drawCell(cell)
    }
    moveCursor(x: number, y: number, row: number, col: number) {
        this.cursor = {
            x,
            y,
            row,
            col
        };
    };

}