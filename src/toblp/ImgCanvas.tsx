import { Button, message, Select, Switch } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BLP2Header } from './blp';
import { encode } from "./jpegasm";
import Resizer from "./resizer";

export interface ImgCanvasProps {
    file: File
}

export const ImgCanvas: React.FC<ImgCanvasProps> = ({ file }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const distCanvasRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [size, setSize] = useState(64)
    const [disable, setDisable] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const [img, setImg] = useState(null);

    const handleDisableChange = useCallback((checked: boolean) => {
        setDisable(checked)
    }, []);

    const handleClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            const imageData = ctx.getImageData(0, 0, size, size);
            console.info(imageData);
            const modify = new Uint8ClampedArray(imageData.data.length)
            for (let i = 0, j = 0; i < modify.length; i += 4) {
                modify[j++] = imageData.data[i + 2];
                modify[j++] = imageData.data[i + 1];
                modify[j++] = imageData.data[i];
                modify[j++] = imageData.data[i + 3];
            }
            encode(modify.buffer, {
                width: imageData.width,
                height: imageData.height,
                quality: 80
            }, async (err: string, encoded: ArrayBuffer) => {
                if (err) {
                    message.error(err);
                } else {
                    new BLP2Header(size, size, new Uint8ClampedArray(encoded)).toUint8Array(file.name);
                }
            });
        }
    }, [canvasRef.current, width, height, size, file]);

    useEffect(() => {
        (async () => {
            if (canvasRef.current && file) {
                const ctx = canvasRef.current.getContext("2d");
                const reader = new FileReader();
                reader.readAsDataURL(file);//转化成base64数据类型
                reader.onload = function () {
                    const img = new Image()
                    img.src = this.result as string;
                    img.onload = () => {
                        ctx.clearRect(0, 0, width, height);
                        ctx.drawImage(img, 0, 0)
                        setWidth(img.width);
                        setHeight(img.height);
                        setPos({ top: 0, left: 0, width: img.width, height: img.height });
                        setImg(img);
                    }
                }
            }
        })();
    }, [canvasRef.current, file])

    useEffect(() => {
        if (img && distCanvasRef.current && pos.width > 0 && pos.height > 0) {
            const ctx = distCanvasRef.current.getContext("2d");
            ctx.drawImage(img, pos.left, pos.top, pos.width, pos.height, 0, 0, size, size)
            if (disable) {
                ctx.fillStyle = 'rgba(0,0,0,0.4)';
                ctx.fillRect(0, 0, size, size);
            }
        }
    }, [
        distCanvasRef.current, pos, img, size, disable
    ])


    const handleSizeChange = useCallback((value: number) => {
        setSize(value);
    }, [])

    const stopEvent = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
    }, []);

    return <>
        <div style={{ height: 40, lineHeight: '40px' }} onClick={stopEvent}><Button onClick={handleClick}>保存成blp</Button></div>
        <div style={{ height: 40, lineHeight: '40px' }} onClick={stopEvent}>
            <Select value={size} onChange={handleSizeChange}>
                <Select.Option value={256}>256*256</Select.Option>
                <Select.Option value={128}>128*128</Select.Option>
                <Select.Option value={64}>64*64</Select.Option>
                <Select.Option value={32}>32*32</Select.Option>
            </Select>
        </div>
        <div style={{ height: 40, lineHeight: '40px' }} onClick={stopEvent}>
            绘制禁用<Switch checked={disable} onChange={handleDisableChange} />
        </div>
        <div style={{ position: 'relative', width: width, height: height }}>
            <canvas ref={canvasRef} width={width} height={height} />
            <Resizer top={pos.top} left={pos.left} width={pos.width} height={pos.height} onPos={(left, top, width, height) => {
                console.info('left, top, width, height', left, top, width, height)
                setPos({ left, top, width, height })
            }} />
        </div>
        <div>
            <canvas ref={distCanvasRef} width={size} height={size} />
        </div>
    </>
}

export default ImgCanvas;
