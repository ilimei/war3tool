import React, { useEffect, useRef, useState } from "react";
import { BLPImage, decode, getImageData } from "./binReader";

export interface BlpCanvasProps {
    file: File
}

export const BlpCanvas: React.FC<BlpCanvasProps> = ({ file }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    useEffect(() => {
        (async () => {
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext("2d");
                const buf = await file.arrayBuffer();
                const blpImg = decode(buf);
                console.info(blpImg);
                setWidth(blpImg.width);
                setHeight(blpImg.height);
                const imageData = getImageData(blpImg, 0);
                for(let i=0;i<blpImg.mipmaps.length;i++) {
                    console.info(getImageData(blpImg, i));
                }
                const img = await createImageBitmap(imageData);
                ctx.drawImage(img, 0, 0)
            }
        })();
    }, [canvasRef.current, file])
    return <canvas ref={canvasRef} width={width} height={height} />
}

export default BlpCanvas;
