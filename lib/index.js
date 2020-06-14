!function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=o(r(1)),i=o(r(2));e.default={Render:n.default,EventEmitter:i.default}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t){this.ctx=t.getContext("2d")||new CanvasRenderingContext2D,this.$el=t,this.grid=[0,0],this.cellId=0,this.rowId=0,this.rows=[],this.cursor={x:0,y:0,row:0,col:0}}return t.prototype.drawCell=function(t){var e=t.x,r=t.y,o=t.w,n=t.h,i=t.row,l=void 0===i?0:i,s=t.col,c=void 0===s?0:s,u=this.ctx;t.id||(this.cellId++,t.id=this.cellId),u.rect(e,r,o,n),u.stroke(),this.moveCursor(e+o,r+n,l,c+1),this.setCellText(t)},t.prototype.normalizedCell=function(t){return Object.assign({id:0,x:0,y:0,w:0,h:0,colspan:1,text:"",row:0,col:0},t)},t.prototype.setCellText=function(t){var e=t.x,r=t.y,o=t.w,n=t.h,i=t.text,l=void 0===i?"":i,s=this.ctx;s.font="18px bold 黑体",s.fillStyle="#ff0000",s.textAlign="center",s.textBaseline="middle",s.fillText(l,e+o/2,r+n/2)},t.prototype.redrawRow=function(t){if(t.cells&&0!==t.cells.length){var e=t.cells;this.clearRow(t);for(var r=0;r<e.length;r++)this.redrawCell(e[r],!1)}},t.prototype.clearRow=function(t){"number"==typeof t&&(t=this.rows[t-1]),this.ctx.clearRect(t.x,t.y,t.w,t.h)},t.prototype.drawRow=function(t,e){if(void 0===e&&(e={}),t&&0!==t.length){for(var r=this.cursor,o=r.x,n=r.y,i=this.rows.push({x:o,y:n,w:0,h:0,cells:[]}),l=this.rows[i-1],s=e.width,c=void 0===s?0:s,u=e.height,f=void 0===u?0:u,a=e.top,d=void 0===a?n:a,h=e.left,p=void 0===h?o:h,v=null,w=0;w<t.length;w++){var y=Object.assign({id:0,x:p,y:d,w:c,h:f,colspan:1,row:i,col:w+1,text:""},t[w]);p+=y.w,l.w+=y.w,y.colspan>1?(v=Object.assign({},y))&&l.cells.push(v):0===y.colspan&&v?(v.w+=y.w,y.w=0,l.cells.push(y)):1===y.colspan&&v&&(this.drawCell(v),v=null),v||(this.drawCell(y),l.cells.push(y))}l.h=l.cells[0].h,this.rowId=i,this.moveCursor(o,this.cursor.y,this.cursor.row+1,1)}},t.prototype.redrawCell=function(t,e){void 0===e&&(e=!0);var r=this.ctx,o=t.x,n=t.y,i=t.w,l=t.h;e&&r.clearRect(o,n,i,l),this.drawCell(t)},t.prototype.moveCursor=function(t,e,r,o){this.cursor={x:t,y:e,row:r,col:o}},t}();e.default=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t){this.listeners=[];this.bindClick(t),this.bindMouseOver(t)}return t.prototype.searchCell=function(t,e,r){for(var o=t.rows,n=0;n<o.length;n++){var i=o[n];if(e>i.x&&e<i.x+i.w&&r>i.y&&r<i.y+i.h)return this.searchCellInRow(i.cells,e)}},t.prototype.searchCellInRow=function(t,e){for(var r=0;r<t.length;r++){var o=t[r];if(e>o.x&&e<o.x+o.w)return o}},t.prototype.on=function(t,e){this.listeners.push({event:t,cb:e})},t.prototype.emit=function(t,e){for(var r=0;r<this.listeners.length;r++)this.listeners[r].event===t&&this.listeners[r].cb(e)},t.prototype.bindClick=function(t){this.bindEvent("click",t)},t.prototype.bindMouseOver=function(t){this.bindEvent("mouseover",t)},t.prototype.bindEvent=function(t,e){var r=this;e.$el.addEventListener(t,(function(o){var n=o.offsetX,i=o.offsetY,l=e.grid,s=n-l[1],c=i-l[0],u=r.searchCell(e,s,c);u&&r.emit(t,{node:u,e:o})}))},t}();e.default=o}]);