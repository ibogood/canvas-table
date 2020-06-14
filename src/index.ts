import Render from './core/render'
import EventEmitter from './core/event-emitter'
const el:HTMLElement | HTMLCanvasElement | null  = document.getElementById('canvas')
if (!(el instanceof HTMLCanvasElement)) {
    throw new  Error('canvas不存在·')
}
const canvas = new Render(el)
canvas.drawRow(
    [
        { w: 100, text: "id" },
        { w: 100, text: "name" },
        { w: 100, text: "sexy" },
        { w: 100, text: "age" },
    ],
    {
        height: 60,
    }
);
canvas.drawRow(
    [
        { w: 100, text: "id" },
        { w: 100, text: "name" },
        { w: 100, text: "sexy" },
        { w: 100, text: "age" },
    ],
    {
        height: 60,
    }
);
canvas.drawRow(
    [
        { w: 100, text: "id", colspan: 3 },
        { w: 100, text: "name", colspan: 0 },
        { w: 100, text: "sexy", colspan: 0 },
        { w: 100, text: "age" },
    ],
    {
        height: 60,
    }
);
const eventEmitter  = new EventEmitter(canvas)
eventEmitter.on('click', function(event) {
    console.log('event', event)
})
