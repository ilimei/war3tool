import React, { useState } from "react";
import { Col, Row, Tabs, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { DraggerProps } from "antd/lib/upload";
import BlpCanvas from "./BlpCanvas";
import cls from "classnames";
import List from "react-virtualized/dist/es/List";
import "./style.less";

const { Dragger } = Upload;

export interface BlpViewProps {

}

export const BlpView: React.FC<BlpViewProps> = ({ }) => {

    const [fileList, setFileList] = useState<File[]>([]);
    const [selIndex, setSelIndex] = useState(0);

    const props: DraggerProps = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        onChange: async (info) => {
            setSelIndex(0);
            setFileList(info.fileList.map(v => v.originFileObj));
            // console.info(getImageData(blpImg, 0));
        },
        beforeUpload: () => false,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    function _noRowsRenderer() {
        return <div style={{ height: 40 }}>No rows</div>;
    }

    function _rowRenderer({ index, key, style }) {
        return <div className={cls('blp-item', {
            isSelect: index === selIndex,
        })} key={key} style={style} onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setSelIndex(index);
        }}>
            {fileList[index].name}
        </div>
    }

    return <Dragger fileList={[]} {...props}>
        {fileList.length > 0 ? (<>
            <Row onClick={e => (e.stopPropagation(), e.preventDefault())}>
                <Col span={4} >
                    <List
                        height={400}
                        overscanRowCount={20}
                        noRowsRenderer={_noRowsRenderer}
                        rowCount={fileList.length}
                        rowHeight={
                            40
                        }
                        rowRenderer={_rowRenderer}
                        width={300}
                    />
                </Col>
                <Col span={20}>
                    <BlpCanvas file={fileList[selIndex]} />
                </Col>
            </Row>
        </>) : (
            <>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或者拖拽blp文件进来</p>
                <p className="ant-upload-hint">
                    支持拖拽多个文件进入
                </p>
            </>
        )}
    </Dragger>;
}

export default BlpView;
