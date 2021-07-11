import { Col, message, Row, Switch } from "antd";
import React, { useCallback, useRef, useState } from "react";
import "./style.less";

function toHex(rgb: { r: number, g: number, b: number }): string {
    return `#${rgb.r.toString(16).padStart(2, '0') + rgb.g.toString(16).padStart(2, '0') + rgb.b.toString(16).padStart(2, '0')}`;
}

function parseRGBStr(str: string): string {
    // RGB(31, 224, 95)
    console.info("parseRGBStr", str, str.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/));
    if (/rgb\((\d+),\s*(\d+),\s*(\d+)\)/.test(str)) {
        const [, r, g, b] = str.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        return parseInt(r, 10).toString(16).padStart(2, '0') + parseInt(g, 10).toString(16).padStart(2, '0') + parseInt(b, 10).toString(16).padStart(2, '0');
    }
    return str;
}

export interface ColorEditorProps {

}

export const ColorEditor: React.FC<ColorEditorProps> = (props) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [war3Txt, setWar3Txt] = useState("渐变的文字");
    const [trans, setTrans] = useState(false);

    const [normalColor, setNormalColor] = useState({
        r: 255,
        g: 255,
        b: 255
    });
    const [startColor, setStartColor] = useState({
        r: 255,
        g: 0,
        b: 0
    });
    const [stopColor, setStopColor] = useState({
        r: 255,
        g: 255,
        b: 0
    });

    const handleTransChange = useCallback((checked) => {
        setTrans(checked);
    }, [])

    function toResult() {
        if (editorRef.current) {
            var result = JSON.stringify(editorRef.current.innerHTML
                .replace(/<div>/g, '\n')
                .replace(/<br>/g, '\n')
                .replace(/<\/div>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/<\/span>/g, '|r')
                .replace(/<\/font>/g, '|r')
                .replace(/<font color="#([a-f\d]+)">/g, (t, $1) => `|cff${$1.toUpperCase()}`)
                .replace(/<span\s*style="color: ([\S\s]+?);">/g, (t, $1) => `|cff${parseRGBStr($1).toUpperCase()}`)
                .replace(/\|r\|c/g, "\|c"));
            setWar3Txt(result.slice(1, result.length - 1))
        }
    }

    const txtChange = useCallback((e) => {
        toResult();
        console.info('0-0000000');
    }, [editorRef.current]);

    const colorChange = useCallback((setFn, e) => {
        const color = e.target.value;
        setFn({
            r: parseInt(color.slice(1).slice(0, 2), 16),
            g: parseInt(color.slice(1).slice(2, 4), 16),
            b: parseInt(color.slice(1).slice(4, 6), 16)
        })
    }, []);

    const handleCopy = useCallback(() => {
        const cpTxt =  trans ? war3Txt : war3Txt.replace(/\\n/g,"\n")
        const copy = function (e) {
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData('text/plain', cpTxt);
                // @ts-expect-error
            } else if (window.clipboardData) {
                // @ts-expect-error
                window.clipboardData.setData('Text', cpTxt);
            }
            message.success("复制成功")
        }
        window.addEventListener('copy', copy);
        document.execCommand('copy');
        window.removeEventListener('copy', copy);
    }, [war3Txt, trans]);

    const handleNormalColor = useCallback(() => {
        document.execCommand('foreColor', false,
            `rgb(${normalColor.r},${normalColor.g},${normalColor.b})`); // with rgba
        toResult();
    }, [normalColor, editorRef.current]);

    const handleFlowColor = useCallback(() => {
        const sel = document.getSelection();
        const rng = sel.getRangeAt(0);
        const text = rng.toString();
        const txtArr = text.split(/\s*/);
        if (txtArr.length > 1) {
            document.execCommand('delete'); // with rgba
            let dhr = {
                r: (stopColor.r - startColor.r) / (txtArr.length - 1),
                g: (stopColor.g - startColor.g) / (txtArr.length - 1),
                b: (stopColor.b - startColor.b) / (txtArr.length - 1),
            }
            document.execCommand('insertHTML', false, txtArr.map((v, index) => {
                let rgb = {
                    r: startColor.r + dhr.r * index,
                    g: (startColor.g + dhr.g * index) | 0,
                    b: (startColor.b + dhr.b * index) | 0,
                }
                return `<font color="#${rgb.r.toString(16).padStart(2, '0') + rgb.g.toString(16).padStart(2, '0') + rgb.b.toString(16).padStart(2, '0')}">${v}</font>`
            }).join(""));
        } else if (txtArr.length === 1) {
            document.execCommand('foreColor', false,
                `rgb(${startColor.r},${startColor.g},${startColor.b})`); // with rgba
        }
        toResult();
    }, [startColor, stopColor]);


    return <>
        <h1>war3文字颜色</h1>
        <div className="textEditor" contentEditable ref={editorRef} onInput={txtChange}>渐变的文字</div>
        <div className="noselect">
            color: <input onChange={colorChange.bind(this, setNormalColor)} type="color" value={toHex(normalColor)} />
            <button onClick={handleNormalColor}>确定</button>
        </div>
        <div className="noselect">
            start:<input onChange={colorChange.bind(this, setStartColor)} type="color" value={toHex(startColor)} />
            end:<input onChange={colorChange.bind(this, setStopColor)} type="color" value={toHex(stopColor)} />
            <button id="flow" onClick={handleFlowColor}>确定</button>
        </div>
        <Row>
            <Col span={16}>
            是否转译换行 <Switch checked={trans} onChange={handleTransChange} />
            </Col>
        </Row>
        <div className="result">
            <pre>{trans ? war3Txt : war3Txt.replace(/\\n/g,"\n")}</pre>
        </div>
        <button onClick={handleCopy}>一键复制</button>
    </>
}

export default ColorEditor;
