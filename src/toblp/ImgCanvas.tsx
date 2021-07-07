import { Button, message } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BLP2Header } from './blp';
import { encode } from "./jpegasm";

export interface ImgCanvasProps {
    file: File
}

export const ImgCanvas: React.FC<ImgCanvasProps> = ({ file }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            const imageData = ctx.getImageData(0, 0, 256, 256);
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
                if(err) {
                    message.error(err);
                } else {
                    new BLP2Header(256, 256, new Uint8ClampedArray(encoded)).toUint8Array();
                }
            });
        }
    }, [canvasRef.current, width, height]);

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
                        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 256, 256)
                        setWidth(img.width);
                        setHeight(img.height);
                    }
                }
            }
        })();
    }, [canvasRef.current, file])
    return <>
        <Button onClick={handleClick}>保存成blp</Button>
        <canvas ref={canvasRef} width={256} height={256} />
    </>
}

export default ImgCanvas;
