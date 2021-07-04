import React, { useState } from "react";
import { Col, Row, Tabs, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { DraggerProps } from "antd/lib/upload";
import ImgCanvas from "./ImgCanvas";

const { Dragger } = Upload;

export interface ToBlpProps {

}

export const ToBlp: React.FC<ToBlpProps> = ({ }) => {

    const [file, setFile] = useState<File>(null);

    const props: DraggerProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        onChange: async (info) => {
            console.info(info.file);
            // @ts-ignore
            setFile(info.file);
            // setSelIndex(0);
            // setFileList(info.fileList.map(v => v.originFileObj));
            // console.info(getImageData(blpImg, 0));
        },
        beforeUpload: () => false,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return <Dragger fileList={[]} {...props}>
        {file ? (
            <>
                <ImgCanvas file={file}/>
            </>
        ) : (
            <>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或者拖拽图片文件进来</p>
            </>
        )}

    </Dragger>
}

export default ToBlp;
