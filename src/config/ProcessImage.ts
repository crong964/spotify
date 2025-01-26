import ffmpeg from "fluent-ffmpeg"
class ProcessImage {
    constructor() {

    }
    Command(inputpath: string, outputpath: string, format: string, options: string[]) {
        return new Promise((res, rej) => {
            ffmpeg(inputpath)
                .addOptions(options)
                .outputFormat(format)
                .saveToFile(outputpath)
                .on('end', (stdout, stderr) => {
                    res(true)
                })
                .on('error', (error) => {
                    res(false)
                    console.log(__filename, error);
                });
        })
    }
    async ConvertImgToWebp(inputpath: string, outputpath: string) {
        let check = await this.Command(inputpath, outputpath, "webp", ["-q", "1"])
        return check ? outputpath : null
    }
}

let processImage = new ProcessImage()

export default processImage