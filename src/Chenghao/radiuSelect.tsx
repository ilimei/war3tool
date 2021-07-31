import React, { useCallback, useState } from "react";
import { mousemove } from "./gradient";
import "./radiuSelect.less";

export interface RaiduSelectProps {
    defaultValue?: number;
    onChange?: (value: number)=>void;
}

export const RaiduSelect: React.FC<RaiduSelectProps> = ({ defaultValue, onChange }) => {
    const [value, updateValue] = useState(defaultValue);
    const setValue = useCallback((value)=>{
        updateValue(value);
        onChange && onChange(value);
    }, [onChange])

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
        const centerY = top + height / 2;
        const centerX = left + width / 2;
        mousemove(e, e.pageX, e.pageY, ({ x, y }) => {
            const h = Math.abs(y - centerY);
            const len = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            if (len <= 0) return;
            let deg = Math.asin(h / len) / Math.PI * 180;
            if (x > centerX) {
                deg = 180 - deg;
            }
            if (y > centerY) {
                deg *= -1;
            }
            setValue(deg);
        }, ({ x, y }) => {
            const h = Math.abs(y - centerY);
            const len = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            if (len <= 0) return;
            let deg = Math.asin(h / len) / Math.PI * 180;
            if (x > centerX) {
                deg = 180 - deg;
            }
            if (y > centerY) {
                deg *= -1;
            }
        });
    }, [setValue]);

    return <div className="radiuSelect" onMouseDown={handleMouseDown}>
        <div className="pointer-line" style={{ transform: `rotate(${value}deg)` }}></div>
    </div>
}

export default RaiduSelect;
