import React, { useCallback, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "./style.less";
import { Button, Dropdown, Form, Input, message, Select, Slider, Switch, Upload } from "antd";
import { ColorChangeHandler, SketchPicker } from "react-color";
import { RcFile } from "antd/lib/upload";
import { encode } from "../toblp/jpegasm";
import JSZip from "jszip";
import { BLP2Header } from "../ToBlp/blp";
import FileImage from '!!file-loader!./genStore.mdx';
import { parse } from "./parse";
import { generate } from "./generate";

// require("./genStore.mdx");
console.info(FileImage);




function getContextData(ctx: CanvasRenderingContext2D, wSize: number, hSize: number): Uint8ClampedArray {
    const imageData = ctx.getImageData(0, 0, wSize, hSize);
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

var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var img = document.createElement('img');
img.src = deleteIcon;

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
});

function deleteObject(eventData, transform) {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
}

export interface ColorPickerProps {
    onChange: ColorChangeHandler;
    defaultColor: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onChange, defaultColor }) => {
    const [color, setColor] = useState(defaultColor);
    const change = useCallback((result, event) => {
        onChange(result, event);
        setColor(result.hex);
    }, [onChange]);
    return <Dropdown trigger={['click']} overlayClassName="fitDrop" overlay={<SketchPicker color={color} onChange={change} />} placement="bottomLeft" arrow>
        <Input addonAfter={<div style={{
            background: color,
            width: 18,
            height: 18,
        }} />} value={color} />
    </Dropdown>
}

export interface UpdateBtnProps {
    onAddFile: (file: RcFile) => void;
}

export const UpdateBtn: React.FC<UpdateBtnProps> = ({ onAddFile }) => {
    const props = {
        name: 'file',
        className: "uploadBtn",
        accept: ".jpg,.png,.gif",
        showUploadList: false,
        beforeUpload: (file: RcFile) => {
            onAddFile(file);
            return false;
        },
    };
    return <Upload {...props}>
        <Button type="primary">导入背景</Button>
    </Upload>
}

export interface ChenghaoProps {

}

const FONTS = [
    "黑体",
    "仿宋",
    "楷体",
    "标楷体",
    "华文仿宋",
    "华文楷体",
    "宋体",
    "微软雅黑",
    "Arial",
    "Tahoma",
    "Verdana",
    "Times New Roman",
    "Courier New",
];

export const Chenghao: React.FC<ChenghaoProps> = (props) => {
    const [ref, setRef] = useState<HTMLCanvasElement>(null)
    const [canvas, setCanvas] = useState<fabric.Canvas>(null);
    const [text, setText] = useState<fabric.Text>(null);
    const [gradien, setGradien] = useState<fabric.Gradient>(null);
    const [texturePath, setTexturePath] = useState("textures\\chenghao_shop.blp");

    useEffect(() => {
        if (ref) {
            console.info('---------useEffect----------', ref);
            setCanvas(new fabric.Canvas(ref));
        }
    }, [ref]);

    useEffect(() => {
        if (!canvas) return;
        const gradien = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'percentage', // or 'percentage'
            coords: { x1: 0, y1: 0, x2: 0, y2: 1 },
            colorStops: [
                { offset: 0, color: "#14DEC3" },
                { offset: 1, color: "#F5F8BA" }
            ]
        })
        var rect = new fabric.Textbox('称号商店', {
            charSpacing: 240,
            fontFamily: '微软雅黑',
            fontWeight: 'bold',
            fill: gradien,
            strokeWidth: 2,
            stroke: "#000",
            top: 40,
            left: 60,
        });

        setGradien(gradien);
        setText(rect);
        canvas.add(rect);
        console.info(canvas);
    }, [canvas]);

    const updateTexturePath = useCallback((e) => {
        setTexturePath(e.target.value);
    }, []);

    const textContentChange = useCallback((e) => {
        text.set("text", e.target.value);
        text.set("dirty", true);
        canvas.requestRenderAll();
    }, [canvas, text]);

    const fontChange = useCallback((value) => {
        text.set("fontFamily", value);
        text.set("dirty", true);
        canvas.requestRenderAll();
    }, [text]);

    const fontWeightChange = useCallback((value) => {
        text.set("fontWeight", value ? "bold" : "normal");
        text.set("dirty", true);
        canvas.requestRenderAll();
    }, [text]);

    const charSpaceChange = useCallback((value) => {
        text.set("charSpacing", value * 10);
        text.set("dirty", true);
        canvas.requestRenderAll();
    }, [text])

    const strokeWidthChange = useCallback((value) => {
        text.set("strokeWidth", value);
        text.set("dirty", true);
        canvas.requestRenderAll();
    }, [text]);

    const strokeColorChange = useCallback((value) => {
        text.set("stroke", value.hex);
        text.set("dirty", true);
        canvas.requestRenderAll();
    }, [text]);

    const gradienStartColorChange = useCallback((value) => {
        gradien.colorStops[0].color = value.hex;
        text.set("dirty", true);
        canvas.requestRenderAll();
    }, [text, gradien]);

    const gradienEndColorChange = useCallback((value) => {
        gradien.colorStops[1].color = value.hex;
        text.set("dirty", true);
        canvas.requestRenderAll();
    }, [text, gradien]);


    const handleAddFile = useCallback((file: RcFile) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            fabric.Image.fromURL(reader.result as string, img => {
                canvas.add(img);
                canvas.bringToFront(text);
            })
        }
        reader.readAsDataURL(file);
    }, [canvas, text]);

    const exportModal = useCallback(async () => {
        canvas.discardActiveObject();
        canvas.renderAll();
        const modify = getContextData(canvas.contextContainer, 512, 128);
        const jpegArray = await encodeJpeg(modify.buffer, {
            width: 512,
            height: 128,
            quality: 80
        });
        const sizes = [[256, 64], [128, 32], [64, 16], [32, 8], [16, 4], [8, 2], [4, 1], [2, 1], [1, 1]]
        const miniArray = [];
        await Promise.all(sizes.map(async ([x, y]) => {
            const cas = document.createElement('canvas');
            cas.width = x;
            cas.height = y;
            const ctx = cas.getContext('2d');
            ctx.drawImage(canvas.lowerCanvasEl, 0, 0, 512, 128, 0, 0, x, y);
            const modify = getContextData(ctx, x, y);
            miniArray.push(await encodeJpeg(modify.buffer, {
                width: x,
                height: y,
                quality: 80
            }));
        }));
        const blob = await new BLP2Header(512, 128, jpegArray, miniArray).toBlob();
        const buf = await (await fetch(FileImage)).arrayBuffer();
        const model = parse(buf);
        model.Textures[0].Image = texturePath;
        const modelBuf = generate(model);
        var zip = new JSZip();
        zip.file(texturePath, blob);
        zip.file("shop.mdx", new Blob([modelBuf]));
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(content);
                link.download = "example.zip";
                link.click();
            });
    }, [canvas]);


    return <div className="layout-box">
        <div className="leftPannel">
            <Form.Item label="称号名称">
                <Input placeholder="请输入称号名称" defaultValue="称号商店" onChange={textContentChange} />
            </Form.Item>
            <Form.Item label="贴图路径">
                <Input placeholder="请输入贴图路径" defaultValue={texturePath} onChange={updateTexturePath} />
            </Form.Item>
            <Form.Item label="字体">
                <Select onChange={fontChange} defaultValue="微软雅黑">
                    {FONTS.map(v => <Select.Option key={v} value={v}>{v}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item label="加粗">
                <Switch defaultChecked onChange={fontWeightChange} />
            </Form.Item>
            <Form.Item label="字符间距">
                <Slider defaultValue={24} onChange={charSpaceChange} />
            </Form.Item>
            <Form.Item label="边框">
                <Slider defaultValue={2} onChange={strokeWidthChange} />
            </Form.Item>
            <Form.Item label="边框颜色">
                <ColorPicker defaultColor="#000" onChange={strokeColorChange} />
            </Form.Item>
            <Form.Item label="渐变开始颜色">
                <ColorPicker defaultColor="#14DEC3" onChange={gradienStartColorChange} />
            </Form.Item>
            <Form.Item label="渐变结束颜色">
                <ColorPicker defaultColor="#F5F8BA" onChange={gradienEndColorChange} />
            </Form.Item>
            <UpdateBtn onAddFile={handleAddFile} /> &nbsp;
            <Button type="primary" onClick={exportModal}>导出称号模型</Button>
        </div>
        <div className="rightPanel">
            <div className="chenghao">
                <canvas width="512" height="128" ref={setRef} />
            </div>
        </div>
    </div>
}

export default Chenghao;
