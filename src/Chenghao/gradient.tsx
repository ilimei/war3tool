import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, Popover, Tooltip } from "antd";
import React, { useCallback, useState } from "react";
import { ColorChangeHandler, SketchPicker } from "react-color";
import "./gradient.less";


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

export interface ColorStopProps {
    left: number;
    color: string;
    onChange: ColorChangeHandler;
    canDelete: boolean;
    onDel: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
}

export const ColorStop: React.FC<ColorStopProps> = ({ left, color, onChange, canDelete, onDel, onMouseDown }) => {
    return <div className="colorStop" style={{ left: left * 100 + "%" }} onMouseDown={onMouseDown}>
        <Dropdown trigger={['click']} overlayClassName="fitDrop" overlay={
            <>
                {canDelete && <Tooltip title={"删除"}>
                    <div className="del-icon" onClick={onDel}><CloseCircleOutlined /></div>
                </Tooltip>}
                <SketchPicker color={color} onChange={onChange} >132</SketchPicker>
            </>
        } placement="bottomLeft" arrow>
            <div className="colorBox" style={{ background: color }}></div>
        </Dropdown>
    </div>
}

export interface GradientProps {
    value?: Array<{ offset: number, color: string }>,
    onChange?: (stops: Array<{ offset: number, color: string }>) => void;
}

export const Gradient: React.FC<GradientProps> = ({ value, onChange }) => {

    const [stopElement, setStopElement] = useState<HTMLDivElement>(null);

    const [colorStops, updateColorStops] = useState(value || [
        { offset: 0, color: "#fff" },
        { offset: 1, color: "#000" },
    ])

    const setColorStops = useCallback((stops) => {
        updateColorStops(stops);
        onChange && onChange(stops);
    }, [onChange])

    const handleColorChange = useCallback((index, colorResult) => {
        colorStops[index].color = colorResult.hex;
        setColorStops(colorStops.slice(0));
    }, [colorStops]);

    const handleDel = useCallback((index) => {
        colorStops.splice(index, 1);
        setColorStops(colorStops.slice(0));
    }, [colorStops])

    const handleAdd = useCallback((e) => {
        if (e.target.className !== "colorStops") {
            return;
        }
        requestAnimationFrame(() => {
            const { left, width } = e.target.getBoundingClientRect();
            const offset = (e.pageX - left) / width;
            colorStops.push({ offset, color: "#fff" });
            colorStops.sort((v1, v2) => v1.offset - v2.offset);
            setColorStops(colorStops.slice(0));
        });
    }, [colorStops])

    const handleMouseDown = useCallback((index, e: React.MouseEvent) => {
        // @ts-ignore
        if (!e.target.className.includes("colorBox")) return;
        const { width } = stopElement.getBoundingClientRect();
        mousemove(e, colorStops[index].offset * width, 0, ({ x }) => {
            colorStops[index].offset = Math.max(Math.min(x / width, 1), 0);
            colorStops.sort((v1, v2) => v1.offset - v2.offset);
            setColorStops(colorStops.slice(0));
        }, ({ x }) => {
            colorStops[index].offset = Math.max(Math.min(x / width, 1), 0);
            colorStops.sort((v1, v2) => v1.offset - v2.offset);
            setColorStops(colorStops.slice(0));
        });
    }, [colorStops, stopElement]);

    const gradientStr = colorStops.map(v => {
        return `${v.color} ${v.offset * 100}%`
    }).join(",")

    const canDelete = colorStops.length > 2;

    return <div className="gradient">
        <div className="gradient-show" style={{
            background: `linear-gradient(to right, ${gradientStr})`
        }} />
        <div className="colorStops" onClick={handleAdd} ref={setStopElement}>
            {colorStops.map((v, index) => {
                return <ColorStop key={index} left={v.offset}
                    onMouseDown={handleMouseDown.bind(this, index)}
                    color={v.color}
                    canDelete={canDelete}
                    onDel={handleDel.bind(this, index)}
                    onChange={handleColorChange.bind(this, index)} />
            })}
        </div>
    </div>
}

export default Gradient;
