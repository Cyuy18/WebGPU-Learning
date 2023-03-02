import { format } from "path";
import { isJsxAttribute } from "typescript";

export class Trianglemesh{//避免在main.ts中的代码量过大
    buffer: GPUBuffer
    bufferlayout: GPUVertexBufferLayout//从shader中提取属性让gpu理解
    constructor(device:GPUDevice){

        const vertices: Float32Array=new Float32Array(
            [                     //x y,z,r g b
            0.0,  0.5,  0.5, 0.5, 0.0,0.0,
            0.0, -0.5, -0.5, 0.0, 1.0,0.0,
            0.0,  0.5, -0.5, 1.0, 1.0,0.0

            ]   
        )
        //用device去分配buffer
        const usage: GPUBufferUsageFlags = GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST;
        const descriptor:GPUBufferDescriptor = {
            size:1024,
            usage:usage,
            mappedAtCreation:true//有些内存是属于cpu的，通过ts可以直接访问，而有些内存是设备本地的，这些高速内存不能被ts访问，为了把这些buffer送到本地的内存，我们要先把buffer送到cpu可以访问的内存，再通过cpu送到GPU中不可以访问的内存。

        }
        this.buffer=device.createBuffer(descriptor);
        //需要复制buffer的内存
        new Float32Array(this.buffer.getMappedRange()).set(vertices);//返回一个带有gpubuffer信息的数组buffer,可以被写入
        this.buffer.unmap();
        this.bufferlayout={
            arrayStride:24,//从一个顶点到下一个顶点的字节数，一共5个32比特的数据，所以是20字节。
            attributes:[
                {//postion
                    shaderLocation:0,
                    format:"float32x3",
                    offset:0//在shader中position的位置为0,从第0个比特开始读
                },
                {//color
                    shaderLocation:1,
                    format:"float32x2",
                    offset:3*4//position一共有8个字节，要读取color的字节，要从第八位开始读。
                }
            ]
        }

    }

}