import React from "react";
import ReactDOM from "react-dom";
import MenuLayout from "./layout/MenuLayout";
import loadCMP from "./loadCMP/loadCMP";


ReactDOM.render(<MenuLayout configs={[
    {
        title: "颜色工具",
        path: '/colorTool',
        component: loadCMP(() => import("./colorEditor/ColorEditor"))
    },
    {
        title: "blp查看",
        path: '/blpView',
        component: loadCMP(() => import("./blpView/BlpView"))
    },
    {
        title: "转blp",
        path: '/ToBlp',
        component: loadCMP(() => import("./ToBlp"))
    },
    {
        title: "称号模型生成",
        path: '/chenghao',
        component: loadCMP(() => import("./Chenghao"))
    }
]} />, document.getElementById('root'));
