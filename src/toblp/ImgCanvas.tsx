import { Button } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BLP2Header } from './blp';
var jpeg = require('jpeg-js');

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
            const data = imageData.data.map((v, index) => {
                if (index % 4 === 0) {
                    return imageData.data[index + 2];
                }
                if (index % 4 === 2) {
                    return imageData.data[index - 2];
                }
                return v;
            })
            console.info(data);
            const jpegData = jpeg.encode({ data: new Uint8ClampedArray(data), width: imageData.width, height: imageData.height }, 80);
            console.info(jpegData);
            const img = await new BLP2Header(256, 256, jpegData.data).toUint8Array();
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 256, 256)
            // canvasRef.current.toBlob(async function (blob) {
            //     const buff = await blob.arrayBuffer();
            //     const img = await new BLP2Header(256, 256, buff).toUint8Array();
            //     const ctx = canvasRef.current.getContext("2d");
            //     ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 256, 256)
            // }, "image/jpeg", 1);
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
                        console.dir(img);
                        setWidth(img.width);
                        setHeight(img.height);
                        console.info(img.height);
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
