import React, { useCallback, useEffect, useRef, useState } from "react";

import './resizer.less';

export interface ResizerProps {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    onPos?: (left: number, top: number, width: number, height: number) => void;
}

export interface Pos {
    x: number;
    y: number;
}

export function mousemove(e: { pageX: number; pageY: number; }, startX: number, startY: number, onDrag: (pos: Pos) => void, onDragEnd: (pos: Pos) => void) {
    const { pageX, pageY } = e;
    const onMouseMove = function (e: MouseEvent) {
        onDrag({ x: startX + (e.pageX - pageX), y: startY + (e.pageY - pageY) });
    }
    const onMouseUp = function (e: MouseEvent) {
        onDragEnd({ x: startX + (e.pageX - pageX), y: startY + (e.pageY - pageY) });
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}


export const Resizer: React.FC<ResizerProps> = ({ top, left, width, height, onPos }) => {
    const [cur, setCursor] = useState('default');
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const div = e.target as HTMLDivElement;
        const { x, y, width, height } = div.getBoundingClientRect();
        const dx = Math.abs(x - e.pageX);
        const dy = Math.abs(y - e.pageY);
        const dwx = Math.abs(x + width - e.pageX);
        const dhy = Math.abs(y + height - e.pageY);
        let cursorPos = '';
        const size = 8;
        if (dy <= size) {
            cursorPos += 'n';
        } else if (dhy <= size) {
            cursorPos += 's';
        }
        if (dx <= size) {
            cursorPos += 'w';
        } else if (dwx <= size) {
            cursorPos += 'e';
        }
        if (!cursorPos) {
            cursorPos = 'move';
        } else {
            cursorPos += '-resize';
        }
        setCursor(cursorPos);
    }, []);
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        mousemove(e, 0, 0, ({ x, y }) => {
            switch (cur) {
                case 'move':
                    onPos(left + x, top + y, width, height);
                    break;
                case 'n-resize':
                    onPos(left, top + y, width, height - y);
                    break;
                case 's-resize':
                    onPos(left, top, width, height + y);
                    break;
                case 'e-resize':
                    onPos(left, top, width + x, height);
                    break;
                case 'w-resize':
                    onPos(left + x, top, width - x, height);
                    break;
                case 'ne-resize':
                    onPos(left, top + y, width + x, height - y);
                    break;
                case 'sw-resize':
                    onPos(left + x, top, width - x, height + y);
                    break;
                case 'se-resize':
                    onPos(left, top, width + x, height + y);
                    break;
                case 'nw-resize':
                    onPos(left + x, top + y, width - x, height - y);
                    break;
            }
        }, () => { })
    }, [cur]);

    return <div className="resizer" onClick={e=>e.stopPropagation()} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} style={{
        position: "absolute",
        cursor: cur,
        top, left, width, height
    }}>
        <div className="resizer-box resizer-topLeft" />
        <div className="resizer-box resizer-topRight" />
        <div className="resizer-box resizer-bottomLeft" />
        <div className="resizer-box resizer-bottomRight" />
    </div>
}

Resizer.defaultProps = {
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    onPos: () => { },
}

export default Resizer;
