(self.webpackChunkwar3tool=self.webpackChunkwar3tool||[]).push([[598],{50598:(e,n,t)=>{"use strict";t.r(n),t.d(n,{BlpView:()=>C,default:()=>E}),t(30467);var r,a,o=t(55673),i=(t(58136),t(5789)),c=(t(1131),t(28465)),s=t(67294),l=t(43347),u=t(96065);function f(e,n){return e.getUint32(4*n,!0)}function h(e,n,t){var r=8/n;return e[Math.floor(t*n/8)]>>r-t%r-1&(1<<n)-1}function p(e){var n=new DataView(e),t={type:r.BLP1,width:0,height:0,content:a.JPEG,alphaBits:0,mipmaps:[],data:e},o=function(e,n){return String.fromCharCode(e.getUint8(0),e.getUint8(1),e.getUint8(2),e.getUint8(3))}(n);if("BLP0"===o||"BLP2"===o)throw new Error("BLP0/BLP2 not supported");if("BLP1"!==o)throw new Error("Not a blp image");if(t.content=f(n,1),t.content!==a.JPEG&&t.content!==a.Direct)throw new Error("Unknown BLP content");t.alphaBits=f(n,2),t.width=f(n,3),t.height=f(n,4),console.info("5",f(n,5)),console.info("6",f(n,6));for(var i=0;i<16;++i){var c={offset:f(n,7+i),size:f(n,23+i)};if(!(c.size>0))break;t.mipmaps.push(c)}return t}function m(e,n){var t=new DataView(e.data),r=new Uint8Array(e.data),o=e.mipmaps[n];if(e.content===a.JPEG){var i=f(t,39),c=new Uint8Array(i+o.size);return console.info("jpeg header size",i),c.set(r.subarray(160,160+i)),c.set(r.subarray(o.offset,o.offset+o.size),i),u(c)}for(var s=new Uint8Array(e.data,156,1024),l=e.width/(1<<n),p=e.height/(1<<n),m=l*p,d=new Uint8Array(e.data,o.offset+m,Math.ceil(m*e.alphaBits/8)),v=function(e,n){return"undefined"!=typeof ImageData?new ImageData(e,n):{width:e,height:n,data:new Uint8ClampedArray(e*n*4)}}(l,p),b=255/((1<<e.alphaBits)-1),w=0;w<m;++w){var g=4*t.getUint8(o.offset+w);v.data[4*w]=s[g+2],v.data[4*w+1]=s[g+1],v.data[4*w+2]=s[g],e.alphaBits>0?v.data[4*w+3]=h(d,e.alphaBits,w)*b:v.data[4*w+3]=255}return v}function d(e,n,t,r,a,o,i){try{var c=e[o](i),s=c.value}catch(e){return void t(e)}c.done?n(s):Promise.resolve(s).then(r,a)}function v(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,a,o=[],i=!0,c=!1;try{for(t=t.call(e);!(i=(r=t.next()).done)&&(o.push(r.value),!n||o.length!==n);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==t.return||t.return()}finally{if(c)throw a}}return o}}(e,n)||function(e,n){if(e){if("string"==typeof e)return b(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?b(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}!function(e){e[e.BLP0=0]="BLP0",e[e.BLP1=1]="BLP1",e[e.BLP2=2]="BLP2"}(r||(r={})),function(e){e[e.JPEG=0]="JPEG",e[e.Direct=1]="Direct"}(a||(a={}));const w=function(e){var n=e.file,t=(0,s.useRef)(null),r=v((0,s.useState)(0),2),a=r[0],o=r[1],i=v((0,s.useState)(0),2),c=i[0],l=i[1];return(0,s.useEffect)((function(){var e;(e=regeneratorRuntime.mark((function e(){var r,a,i,c,s,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.current){e.next=15;break}return r=t.current.getContext("2d"),e.next=4,n.arrayBuffer();case 4:for(a=e.sent,i=p(a),console.info(i),o(i.width),l(i.height),c=m(i,0),s=0;s<i.mipmaps.length;s++)console.info(m(i,s));return e.next=13,createImageBitmap(c);case 13:u=e.sent,r.drawImage(u,0,0);case 15:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function i(e){d(o,r,a,i,c,"next",e)}function c(e){d(o,r,a,i,c,"throw",e)}i(void 0)}))})()}),[t.current,n]),s.createElement("canvas",{ref:t,width:a,height:c})};var g=t(94184),y=t.n(g),k=t(26443);function P(){return(P=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function D(e,n,t,r,a,o,i){try{var c=e[o](i),s=c.value}catch(e){return void t(e)}c.done?n(s):Promise.resolve(s).then(r,a)}function L(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,a,o=[],i=!0,c=!1;try{for(t=t.call(e);!(i=(r=t.next()).done)&&(o.push(r.value),!n||o.length!==n);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==t.return||t.return()}finally{if(c)throw a}}return o}}(e,n)||function(e,n){if(e){if("string"==typeof e)return x(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?x(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var A=c.Z.Dragger,C=function(e){!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e);var n,t,r=L((0,s.useState)([]),2),a=r[0],c=r[1],u=L((0,s.useState)(0),2),f=u[0],h=u[1],p={name:"file",multiple:!0,showUploadList:!1,onChange:(n=regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:h(0),c(n.fileList.map((function(e){return e.originFileObj})));case 2:case"end":return e.stop()}}),e)})),t=function(){var e=this,t=arguments;return new Promise((function(r,a){var o=n.apply(e,t);function i(e){D(o,r,a,i,c,"next",e)}function c(e){D(o,r,a,i,c,"throw",e)}i(void 0)}))},function(e){return t.apply(this,arguments)}),beforeUpload:function(){return!1},onDrop:function(e){console.log("Dropped files",e.dataTransfer.files)}};return(0,s.useEffect)((function(){var e=function(e){switch(e.key){case"ArrowDown":h(Math.min(f+1,a.length-1));break;case"ArrowUp":h(Math.max(f-1,0))}};return window.addEventListener("keyup",e),function(){return window.removeEventListener("keyup",e)}}),[a,f]),s.createElement(A,P({fileList:[]},p),a.length>0?s.createElement(s.Fragment,null,s.createElement(o.Z,{onClick:function(e){return e.stopPropagation(),e.preventDefault()}},s.createElement(i.Z,{span:10,style:{width:300}},s.createElement(k.ZP,{height:400,overscanRowCount:20,noRowsRenderer:function(){return s.createElement("div",{style:{height:40}},"No rows")},rowCount:a.length,rowHeight:40,rowRenderer:function(e){var n=e.index,t=e.key,r=e.style;return s.createElement("div",{className:y()("blp-item",{isSelect:n===f}),key:t,style:r,onClick:function(e){e.stopPropagation(),e.preventDefault(),h(n)}},a[n].name)},scrollToIndex:f,width:300})),s.createElement(i.Z,{span:10},s.createElement(w,{file:a[f]})))):s.createElement(s.Fragment,null,s.createElement("p",{className:"ant-upload-drag-icon"},s.createElement(l.Z,null)),s.createElement("p",{className:"ant-upload-text"},"点击或者拖拽blp文件进来"),s.createElement("p",{className:"ant-upload-hint"},"支持拖拽多个文件进入")))};const E=C},96065:e=>{var n=function(){"use strict";var e=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),n=4017,t=799,r=3406,a=2276,o=1567,i=3784,c=5793,s=2896;function l(){}function u(e,n){for(var t,r,a=0,o=[],i=16;i>0&&!e[i-1];)i--;o.push({children:[],index:0});var c,s=o[0];for(t=0;t<i;t++){for(r=0;r<e[t];r++){for((s=o.pop()).children[s.index]=n[a];s.index>0;)s=o.pop();for(s.index++,o.push(s);o.length<=t;)o.push(c={children:[],index:0}),s.children[s.index]=c.children,s=c;a++}t+1<i&&(o.push(c={children:[],index:0}),s.children[s.index]=c.children,s=c)}return o[0].children}function f(e,n,t){return 64*((e.blocksPerLine+1)*n+t)}function h(n,t,r,a,o,i,c,s,l){r.precision,r.samplesPerLine,r.scanLines;var u=r.mcusPerLine,h=r.progressive,p=(r.maxH,r.maxV,t),m=0,d=0;function v(){if(d>0)return d--,m>>d&1;if(255==(m=n[t++])){var e=n[t++];if(e)throw"unexpected marker: "+(m<<8|e).toString(16)}return d=7,m>>>7}function b(e){for(var n,t=e;null!==(n=v());){if("number"==typeof(t=t[n]))return t;if("object"!=typeof t)throw"invalid huffman sequence"}return null}function w(e){for(var n=0;e>0;){var t=v();if(null===t)return;n=n<<1|t,e--}return n}function g(e){var n=w(e);return n>=1<<e-1?n:n+(-1<<e)+1}var y,k=0,P=0;function D(e,n,t,r,a){var o=t%u;n(e,f(e,(t/u|0)*e.v+r,o*e.h+a))}function L(e,n,t){n(e,f(e,t/e.blocksPerLine|0,t%e.blocksPerLine))}var x,A,C,E,B,U,I=a.length;U=h?0===i?0===s?function(e,n){var t=b(e.huffmanTableDC),r=0===t?0:g(t)<<l;e.blockData[n]=e.pred+=r}:function(e,n){e.blockData[n]|=v()<<l}:0===s?function(n,t){if(k>0)k--;else for(var r=i,a=c;r<=a;){var o=b(n.huffmanTableAC),s=15&o,u=o>>4;if(0!==s){var f=e[r+=u];n.blockData[t+f]=g(s)*(1<<l),r++}else{if(u<15){k=w(u)+(1<<u)-1;break}r+=16}}}:function(n,t){for(var r=i,a=c,o=0;r<=a;){var s=e[r];switch(P){case 0:var u=b(n.huffmanTableAC),f=15&u;if(o=u>>4,0===f)o<15?(k=w(o)+(1<<o),P=4):(o=16,P=1);else{if(1!==f)throw"invalid ACn encoding";y=g(f),P=o?2:3}continue;case 1:case 2:n.blockData[t+s]?n.blockData[t+s]+=v()<<l:0==--o&&(P=2==P?3:0);break;case 3:n.blockData[t+s]?n.blockData[t+s]+=v()<<l:(n.blockData[t+s]=y<<l,P=0);break;case 4:n.blockData[t+s]&&(n.blockData[t+s]+=v()<<l)}r++}4===P&&0==--k&&(P=0)}:function(n,t){var r=b(n.huffmanTableDC),a=0===r?0:g(r);n.blockData[t]=n.pred+=a;for(var o=1;o<64;){var i=b(n.huffmanTableAC),c=15&i,s=i>>4;if(0!==c){var l=e[o+=s];n.blockData[t+l]=g(c),o++}else{if(s<15)break;o+=16}}};var S,T,M,j,R=0;for(T=1==I?a[0].blocksPerLine*a[0].blocksPerColumn:u*r.mcusPerColumn,o||(o=T);R<T;){for(A=0;A<I;A++)a[A].pred=0;if(k=0,1==I)for(x=a[0],B=0;B<o;B++)L(x,U,R),R++;else for(B=0;B<o;B++){for(A=0;A<I;A++)for(M=(x=a[A]).h,j=x.v,C=0;C<j;C++)for(E=0;E<M;E++)D(x,U,R,C,E);R++}if(d=0,(S=n[t]<<8|n[t+1])<=65280)throw"marker was not found";if(!(S>=65488&&S<=65495))break;t+=2}return t-p}function p(e,l,u){var f,h,p,m,d,v,b,w,g,y,k=e.quantizationTable;for(y=0;y<64;y++)u[y]=e.blockData[l+y]*k[y];for(y=0;y<8;++y){var P=8*y;0!=u[1+P]||0!=u[2+P]||0!=u[3+P]||0!=u[4+P]||0!=u[5+P]||0!=u[6+P]||0!=u[7+P]?(f=c*u[0+P]+128>>8,h=c*u[4+P]+128>>8,p=u[2+P],m=u[6+P],d=s*(u[1+P]-u[7+P])+128>>8,w=s*(u[1+P]+u[7+P])+128>>8,v=u[3+P]<<4,b=u[5+P]<<4,g=f-h+1>>1,f=f+h+1>>1,h=g,g=p*i+m*o+128>>8,p=p*o-m*i+128>>8,m=g,g=d-b+1>>1,d=d+b+1>>1,b=g,g=w+v+1>>1,v=w-v+1>>1,w=g,g=f-m+1>>1,f=f+m+1>>1,m=g,g=h-p+1>>1,h=h+p+1>>1,p=g,g=d*a+w*r+2048>>12,d=d*r-w*a+2048>>12,w=g,g=v*t+b*n+2048>>12,v=v*n-b*t+2048>>12,b=g,u[0+P]=f+w,u[7+P]=f-w,u[1+P]=h+b,u[6+P]=h-b,u[2+P]=p+v,u[5+P]=p-v,u[3+P]=m+d,u[4+P]=m-d):(g=c*u[0+P]+512>>10,u[0+P]=g,u[1+P]=g,u[2+P]=g,u[3+P]=g,u[4+P]=g,u[5+P]=g,u[6+P]=g,u[7+P]=g)}for(y=0;y<8;++y){var D=y;0!=u[8+D]||0!=u[16+D]||0!=u[24+D]||0!=u[32+D]||0!=u[40+D]||0!=u[48+D]||0!=u[56+D]?(f=c*u[0+D]+2048>>12,h=c*u[32+D]+2048>>12,p=u[16+D],m=u[48+D],d=s*(u[8+D]-u[56+D])+2048>>12,w=s*(u[8+D]+u[56+D])+2048>>12,v=u[24+D],b=u[40+D],g=f-h+1>>1,f=f+h+1>>1,h=g,g=p*i+m*o+2048>>12,p=p*o-m*i+2048>>12,m=g,g=d-b+1>>1,d=d+b+1>>1,b=g,g=w+v+1>>1,v=w-v+1>>1,w=g,g=f-m+1>>1,f=f+m+1>>1,m=g,g=h-p+1>>1,h=h+p+1>>1,p=g,g=d*a+w*r+2048>>12,d=d*r-w*a+2048>>12,w=g,g=v*t+b*n+2048>>12,v=v*n-b*t+2048>>12,b=g,u[0+D]=f+w,u[56+D]=f-w,u[8+D]=h+b,u[48+D]=h-b,u[16+D]=p+v,u[40+D]=p-v,u[24+D]=m+d,u[32+D]=m-d):(g=c*u[y+0]+8192>>14,u[0+D]=g,u[8+D]=g,u[16+D]=g,u[24+D]=g,u[32+D]=g,u[40+D]=g,u[48+D]=g,u[56+D]=g)}for(y=0;y<64;++y){var L=l+y,x=u[y];x=x<=-2056?0:x>=2024?255:x+2056>>4,e.blockData[L]=x}}function m(e,n){for(var t=n.blocksPerLine,r=n.blocksPerColumn,a=new Int32Array(64),o=0;o<r;o++)for(var i=0;i<t;i++)p(n,f(n,o,i),a);return n.blockData}function d(e){return e<=0?0:e>=255?255:0|e}return l.prototype={load:function(e){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=function(){var e=new Uint8Array(n.response||n.mozResponseArrayBuffer);this.parse(e),this.onload&&this.onload()}.bind(this),n.send(null)},loadFromBuffer:function(e){this.parse(e),this.onload&&this.onload()},parse:function(n){function t(){var e=n[s]<<8|n[s+1];return s+=2,e}function r(e){for(var n=Math.ceil(e.samplesPerLine/8/e.maxH),t=Math.ceil(e.scanLines/8/e.maxV),r=0;r<e.components.length;r++){F=e.components[r];var a=Math.ceil(Math.ceil(e.samplesPerLine/8)*F.h/e.maxH),o=Math.ceil(Math.ceil(e.scanLines/8)*F.v/e.maxV),i=n*F.h,c=t*F.v*64*(i+1);F.blockData=new Int16Array(c),F.blocksPerLine=a,F.blocksPerColumn=o}e.mcusPerLine=n,e.mcusPerColumn=t}var a,o,i,c,s=0,l=(n.length,null),f=null,p=[],d=[],v=[],b=t();if(65496!=b)throw"SOI not found";for(b=t();65497!=b;){var w;switch(console.info("fileMarker",b.toString(16)),b){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var g=(i=void 0,c=void 0,i=t(),c=n.subarray(s,s+i-2),s+=c.length,c);65504===b&&74===g[0]&&70===g[1]&&73===g[2]&&70===g[3]&&0===g[4]&&(l={version:{major:g[5],minor:g[6]},densityUnits:g[7],xDensity:g[8]<<8|g[9],yDensity:g[10]<<8|g[11],thumbWidth:g[12],thumbHeight:g[13],thumbData:g.subarray(14,14+3*g[12]*g[13])}),65518===b&&(console.info(g),65===g[0]&&100===g[1]&&111===g[2]&&98===g[3]&&101===g[4]&&0===g[5]&&(f={version:g[6],flags0:g[7]<<8|g[8],flags1:g[9]<<8|g[10],transformCode:g[11]}));break;case 65499:for(var y=t()+s-2;s<y;){var k=n[s++],P=new Int32Array(64);if(k>>4==0)for(w=0;w<64;w++)P[e[w]]=n[s++];else{if(k>>4!=1)throw"DQT: invalid table spec";for(w=0;w<64;w++)P[e[w]]=t()}p[15&k]=P}console.info(p);break;case 65472:case 65473:case 65474:if(console.info("offset",s,b.toString(16)),a)throw"Only single frame JPEGs supported";t(),(a={}).extended=65473===b,a.progressive=65474===b,a.precision=n[s++],a.scanLines=t(),a.samplesPerLine=t(),a.components=[],a.componentIds={};var D,L=n[s++],x=0,A=0;for(Z=0;Z<L;Z++){D=n[s];var C=n[s+1]>>4,E=15&n[s+1];x<C&&(x=C),A<E&&(A=E);var B=n[s+2],U=a.components.push({h:C,v:E,quantizationTable:p[B]});a.componentIds[D]=U-1,s+=3}a.maxH=x,a.maxV=A,console.info(a),r(a);break;case 65476:var I=t();for(Z=2;Z<I;){var S=n[s++],T=new Uint8Array(16),M=0;for(w=0;w<16;w++,s++)M+=T[w]=n[s];var j=new Uint8Array(M);for(w=0;w<M;w++,s++)j[w]=n[s];Z+=17+M,(S>>4==0?v:d)[15&S]=u(T,j)}break;case 65501:t(),o=t();break;case 65498:t();var R=n[s++],O=[];for(Z=0;Z<R;Z++){var z=a.componentIds[n[s++]];F=a.components[z];var G=n[s++];F.huffmanTableDC=v[G>>4],F.huffmanTableAC=d[15&G],O.push(F)}var H=n[s++],V=n[s++],J=n[s++],N=h(n,s,a,O,o,H,V,J>>4,15&J);s+=N;break;default:if(255==n[s-3]&&n[s-2]>=192&&n[s-2]<=254){s-=3;break}throw"unknown JPEG marker "+b.toString(16)}b=t()}this.width=a.samplesPerLine,this.height=a.scanLines,this.jfif=l,this.adobe=f,this.components=[];for(var Z=0;Z<a.components.length;Z++){var F=a.components[Z];this.components.push({output:m(0,F),scaleX:F.h/a.maxH,scaleY:F.v/a.maxV,blocksPerLine:F.blocksPerLine,blocksPerColumn:F.blocksPerColumn})}},getData:function(e,n,t){var r,a,o,i,c,s,l=this.width/n,u=this.height/t,h=0,p=this.components.length,m=e.data,d=new Uint8Array((this.components[0].blocksPerLine<<3)*this.components[0].blocksPerColumn*8);for(s=0;s<p;s++){for(var v,b,w,g=(r=this.components[s<3?2-s:s]).blocksPerLine,y=r.blocksPerColumn,k=g<<3,P=0,D=0;D<y;D++)for(var L=D<<3,x=0;x<g;x++){var A=f(r,D,x),C=(h=0,x<<3);for(v=0;v<8;v++)for(P=(L+v)*k,b=0;b<8;b++)d[P+C+b]=r.output[A+h++]}for(a=r.scaleX*l,o=r.scaleY*u,h=s,c=0;c<t;c++)for(i=0;i<n;i++)w=(0|c*o)*k+(0|i*a),m[h]=d[w],h+=p}return m},copyToImageData:function(e){var n,t,r,a,o,i,c,s,l=e.width,u=e.height,f=l*u*4,h=e.data,p=this.getData(l,u),m=0,v=0;switch(this.components.length){case 1:for(;v<f;)r=p[m++],h[v++]=r,h[v++]=r,h[v++]=r,h[v++]=255;break;case 3:for(;v<f;)i=p[m++],c=p[m++],s=p[m++],h[v++]=i,h[v++]=c,h[v++]=s,h[v++]=255;break;case 4:for(;v<f;)a=p[m++],o=p[m++],r=p[m++],i=d((n=255-p[m++])-a*(t=n/255)),c=d(n-o*t),s=d(n-r*t),h[v++]=i,h[v++]=c,h[v++]=s,h[v++]=255;break;default:throw"Unsupported color mode"}}},l}();e.exports=function(e){const t=new n;var r;return t.loadFromBuffer(e),r="undefined"!=typeof ImageData?new ImageData(t.width,t.height):{width:t.width,height:t.height,data:new Uint8ClampedArray(t.width*t.height*4)},t.getData(r,t.width,t.height),r}}}]);