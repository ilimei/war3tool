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
    flags: number = 0;
    width: number = 0;
    height: number = 0;
    alphaEncoding: number = 0;
    flags2: number = 0;
    offsets: Array<number> = new Array(16).fill(0);
    lengths: Array<number> = new Array(16).fill(0);
    palette: Array<tBGRAPixel> = new Array(256).fill(0).map(() => ({ b: 0, g: 0, r: 0, a: 0 }));
    data: ArrayBuffer;

    constructor(width: number, height: number, buf: ArrayBuffer) {
        this.width = width;
        this.height = height;
        this.data = buf;
    }

    async toUint8Array(name: string) {
        console.info(this.data.byteLength);
        const arr = new Uint8Array(160)
        const view = new DataView(arr.buffer, 0, arr.byteLength);
        setString(view, this.magic, 0);
        view.setUint32(4, this.type, true);
        view.setUint32(8, this.flags, true);
        view.setUint32(12, this.width, true);
        view.setUint32(16, this.height, true);
        view.setUint32(20, 0, true);
        view.setUint32(24, 0, true);
        view.setUint32(28, 170, true);
        view.setUint32(23*4, this.data.byteLength - 10, true);
        view.setUint32(156, 10, true);
        const ret = new Uint8Array(arr.byteLength + this.data.byteLength);
        ret.set(arr);
        ret.set(new Uint8Array(this.data), 160);
        const blob = new Blob([ret], {type : 'application/blp'})
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = name + ".blp";
        link.click();
    }
}
