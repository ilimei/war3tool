// struct tBLP1Header
// {
//     uint8_t     magic[4];       // Always 'BLP1'
//     uint32_t    type;           // 0: JPEG, 1: palette
//     uint32_t    flags;          // 8: Alpha
//     uint32_t    width;          // In pixels, power-of-two
//     uint32_t    height;
//     uint32_t    alphaEncoding;  // 3, 4: Alpha list, 5: Alpha from palette
//     uint32_t    flags2;         // Unused
//     uint32_t    offsets[16];
//     uint32_t    lengths[16];
// };
function setString(view: DataView, str: string, offset: number) {
    for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
    }
}

interface tBGRAPixel {
    b: number;
    g: number;
    r: number;
    a: number;
}

export class BLP2Header {
    magic: string = 'BLP1';
    type: number = 0;
    flags: number = 8;
    width: number = 0;
    height: number = 0;
    alphaEncoding: number = 0;
    flags2: number = 0;
    offsets: Array<number> = new Array(16).fill(0);
    lengths: Array<number> = new Array(16).fill(0);
    palette: Array<tBGRAPixel> = new Array(256).fill(0).map(() => ({ b: 0, g: 0, r: 0, a: 0 }));
    data: ArrayBuffer;
    miniBuf: ArrayBuffer[];

    constructor(width: number, height: number, buf: ArrayBuffer, miniBuf?: ArrayBuffer[]) {
        this.width = width;
        this.height = height;
        this.data = buf;
        this.miniBuf = miniBuf;
    }

    private toImgToUnit8Array(datas: ArrayBuffer[]) {
        const headerSize = 76;
        let size = 160 + headerSize + datas.reduce((ret, cur) => ret + (cur.byteLength - headerSize), 0);
        const arr = new Uint8Array(size)
        const view = new DataView(arr.buffer, 0, arr.byteLength);
        setString(view, this.magic, 0); // Always 'BLP1'
        view.setUint32(4, this.type, true); // 0: JPEG, 1: palette
        view.setUint32(8, this.flags, true); // 8: Alpha
        view.setUint32(12, this.width, true); // In pixels, power-of-two
        view.setUint32(16, this.height, true);
        view.setUint32(20, 4, true); // 3, 4: Alpha list, 5: Alpha from palette
        view.setUint32(24, 1, true); // Unused
        view.setUint32(39 * 4, headerSize, true); // 写入jpeg header 大小

        // offsets
        let prev = 160 + headerSize;
        datas.forEach((v, index) => {
            if (index === 0) {
                arr.set(new Uint8Array(v.slice(0, headerSize)), 160) // 写入jpeg header 数据
            }
            view.setUint32(28 + index * 4, prev, true); // offset
            const data = new Uint8Array(v.slice(headerSize));
            arr.set(data, prev) // 写入jpeg 数据
            prev += data.length;
        })
        // size
        datas.forEach((v, index) => {
            view.setUint32(23 * 4 + index * 4, v.byteLength - headerSize, true); // size
        })
        return arr;
    }

    async toUint8Array(name: string) {
        const ret = this.toImgToUnit8Array([
            this.data,
            ...this.miniBuf
        ].filter(v => v))
        const blob = new Blob([ret], { type: 'application/blp' })
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = name + ".blp";
        link.click();
    }
}
