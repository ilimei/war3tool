import { Button, Col, Input, message, Row, Select, Switch } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BLP2Header } from './blp';
import { encode } from "./jpegasm";
import Resizer from "./resizer";

export interface ImgCanvasProps {
    file: File
}

function getContextData(ctx: CanvasRenderingContext2D, size: number): Uint8ClampedArray {
    const imageData = ctx.getImageData(0, 0, size, size);
    const modify = new Uint8ClampedArray(imageData.data.length)
    for (let i = 0, j = 0; i < modify.length; i += 4) {
        modify[j++] = imageData.data[i + 2];
        modify[j++] = imageData.data[i + 1];
        modify[j++] = imageData.data[i];
        modify[j++] = imageData.data[i + 3];
    }
    return modify;
}

function encodeJpeg(buf: ArrayBuffer, options: {
    width: number;
    height: number;
    quality: number;
}): Promise<Uint8ClampedArray> {
    return new Promise((resolve, reject) => {
        encode(buf, options, async (err: string, encoded: ArrayBuffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(new Uint8ClampedArray(encoded))
            }
        });
    });
}

export const ImgCanvas: React.FC<ImgCanvasProps> = ({ file }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const distCanvasRef = useRef<HTMLCanvasElement>(null);
    const disCanvasRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [size, setSize] = useState(64)
    const [disable, setDisable] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const [img, setImg] = useState(null);
    const [fileName, setFileName] = useState(file.name);

    const handleDisableChange = useCallback((checked: boolean) => {
        setDisable(checked)
    }, []);

    const handleClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (distCanvasRef.current) {
            const ctx = distCanvasRef.current.getContext('2d');
            let miniArray: Uint8ClampedArray[] = [];
            if (size > 32) {
                const cas = document.createElement('canvas');
                cas.width = 32;
                cas.height = 32;
                const ctx = cas.getContext('2d');
                ctx.drawImage(distCanvasRef.current, 0, 0, size, size, 0, 0, 32, 32);
                const modify = getContextData(ctx, 32);
                miniArray.push(await encodeJpeg(modify.buffer, {
                    width: 32,
                    height: 32,
                    quality: 80
                }));
            }
            const modify = getContextData(ctx, size);
            const jpegArray = await encodeJpeg(modify.buffer, {
                width: size,
                height: size,
                quality: 80
            });
            new BLP2Header(size, size, jpegArray, miniArray).toUint8Array(fileName);
        }
        if (disable && disCanvasRef.current) {
            const ctx = disCanvasRef.current.getContext('2d');
            let miniArray: Uint8ClampedArray[] = [];
            if (size > 32) {
                const cas = document.createElement('canvas');
                cas.width = 32;
                cas.height = 32;
                const ctx = cas.getContext('2d');
                ctx.drawImage(disCanvasRef.current, 0, 0, size, size, 0, 0, 32, 32);
                const modify = getContextData(ctx, 32);
                miniArray.push(await encodeJpeg(modify.buffer, {
                    width: 32,
                    height: 32,
                    quality: 80
                }));
            }
            const modify = getContextData(ctx, size);
            const jpegArray = await encodeJpeg(modify.buffer, {
                width: size,
                height: size,
                quality: 80
            });
            new BLP2Header(size, size, jpegArray, miniArray).toUint8Array("dis" + fileName);
        }
    }, [distCanvasRef.current, disCanvasRef.current, disable, width, height, size, fileName]);

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
                        setFileName(file.name);
                    }
                }
            }
        })();
    }, [canvasRef.current, file])

    useEffect(() => {
        if (img && distCanvasRef.current && pos.width > 0 && pos.height > 0) {
            const ctx = distCanvasRef.current.getContext("2d");
            ctx.drawImage(img, pos.left, pos.top, pos.width, pos.height, 0, 0, size, size)
        }
        if (disable && img && disCanvasRef.current && pos.width > 0 && pos.height > 0) {
            const ctx = disCanvasRef.current.getContext("2d");
            ctx.drawImage(img, pos.left, pos.top, pos.width, pos.height, 0, 0, size, size);
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(0, 0, size, size);
        }
    }, [
        distCanvasRef.current, disCanvasRef.current, pos, img, size, disable
    ])

    useEffect(() => {
        const keyEvent = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    setPos({
                        ...pos,
                        top: pos.top + 1
                    })
                    break;
                case 'ArrowUp':
                    setPos({
                        ...pos,
                        top: pos.top - 1
                    });
                    break;
                case 'ArrowRight':
                    setPos({
                        ...pos,
                        left: pos.left + 1
                    })
                    break;
                case 'ArrowLeft':
                    setPos({
                        ...pos,
                        left: pos.left - 1
                    });
                    break;
                default: break;
            }
        };
        window.addEventListener("keyup", keyEvent);
        return () => window.removeEventListener('keyup', keyEvent);
    }, [pos])

    const handleFileNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    }, [])

    const handleSizeChange = useCallback((value: number) => {
        setSize(value);
    }, [])

    const stopEvent = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
    }, []);

    return <>
        <div style={{ textAlign: 'left', width: 450, display: 'inline-block' }}>
            <div style={{ height: 40, lineHeight: '40px' }} onClick={stopEvent}>
                <Row>
                    <Col span={8}>导出文件名</Col>
                    <Col span={16}><Input value={fileName} onChange={handleFileNameChange} /></Col>
                </Row>
            </div>
            <div style={{ height: 40, lineHeight: '40px' }} onClick={stopEvent}>
                <Row>
                    <Col span={8}>图标大小</Col>
                    <Col span={16}>
                        <Select value={size} onChange={handleSizeChange}>
                            <Select.Option value={256}>256*256</Select.Option>
                            <Select.Option value={128}>128*128</Select.Option>
                            <Select.Option value={64}>64*64</Select.Option>
                            <Select.Option value={32}>32*32</Select.Option>
                        </Select>
                    </Col>
                </Row>
            </div>
            <div style={{ height: 40, lineHeight: '40px' }} onClick={stopEvent}>
                <Row>
                    <Col span={8}>绘制禁用</Col>
                    <Col span={16}>
                        <Switch checked={disable} onChange={handleDisableChange} />
                    </Col>
                </Row>
            </div>
            <div style={{ height: 40, lineHeight: '40px' }} onClick={stopEvent}><Button type="primary" onClick={handleClick}>保存成blp</Button></div>
        </div>
        <div style={{ position: 'relative', width: width, height: height, left: '50%', transform: 'translateX(-50%)', margin: '4px 0'}}>
            <canvas ref={canvasRef} width={width} height={height} />
            <Resizer top={pos.top} left={pos.left} width={pos.width} height={pos.height} onPos={(left, top, width, height) => {
                console.info('left, top, width, height', left, top, width, height)
                setPos({ left, top, width, height })
            }} />
        </div>
        <div>
            <canvas ref={distCanvasRef} width={size} height={size} />&nbsp;
            {disable && <canvas ref={disCanvasRef} width={size} height={size} />}
        </div>
    </>
}

export default ImgCanvas;
