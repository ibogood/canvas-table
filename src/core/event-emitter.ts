import { Cell, Listener, EventParam, BasicEvent } from '../interface/core'
import Render from './render'
export default class EventEmitter {
    listeners: Listener[];
    constructor(renderEngine: Render) {
        this.listeners = []
        const self = this
        this.bindClick(renderEngine)
        this.bindMouseOver(renderEngine)
    }
    searchCell(renderEngine: Render, px: number, py: number): Cell | void {
        const rows = renderEngine.rows
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i]
            const inRange = px > row.x && px < (row.x + row.w)
                && py > row.y && py < (row.y + row.h)
            if (inRange) {
                return this.searchCellInRow(row.cells, px)
            }
        }

    }
    searchCellInRow(cells: Cell[], px: number) {
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i]
            if (px > cell.x && px < (cell.x + cell.w)) {
                return cell
            }
        }
    }
    on(event: string, cb: (event: EventParam) => void) {
        this.listeners.push({
            event,
            cb
        })
    }
    emit(event: string, params: any) {
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].event === event) {
                this.listeners[i].cb(params)
            }
        }
    }
    bindClick(renderEngine: Render) {
        this.bindEvent('click', renderEngine)
    }
    bindMouseOver(renderEngine: Render) {
        this.bindEvent('mouseover', renderEngine)
    }
    bindEvent(event: BasicEvent, renderEngine: Render ) {
        const self = this
        renderEngine.$el.addEventListener(event, function (e: MouseEvent): void {
            const { offsetX, offsetY } = e
            const grid = renderEngine.grid
            // 去掉grid间距
            const px = offsetX - grid[1]
            const py = offsetY - grid[0]
            const cell: Cell | void = self.searchCell(renderEngine, px, py)
            if (cell) {
                self.emit(event, {
                    node: cell,
                    e: e
                })
            }
        })
    }
}