import { exec, execFile, spawn, execSync } from "child_process"
import path, { join } from "path"
import ffmpeg from "fluent-ffmpeg"
import "dotenv/config"
const production = process.env.MODE == "production"
const mp4fragment = production ? join(process.cwd(), "/dist/tool/mp4fragment") : join(process.cwd(), "/src/tool/mp4fragment.exe")
const mp4split = production ? join(process.cwd(), "/dist/tool/mp4split") : join(process.cwd(), "/src/tool/mp4split.exe")

class ProcessVideo {

    constructor() {

    }
    private Command(params: string): Promise<{ err: boolean, ok: string }> {
        return new Promise((tc, l) => {
            exec(params, (errs, sout, sin) => {

                tc({ err: errs != null, ok: errs?.message || "" })
            })
        })
    }
    async Mp4Fragment(input: string, out: string) {
        let s = await this.Command(`${mp4fragment} --fragment-duration 5000 ${input} ${out}`)
        console.log(s.ok);
        return s
    }

    async Mp4Split(input: string, out: string) {
        console.log(mp4split);
        
        let s = await this.Command(`${mp4split} --init-segment ${out}.init --audio --media-segment ${out}-%llu.%llu.m4s ${input}`)
        console.log(s.ok);
        
        return s
    }
    FileType(path: string): Promise<{ err: string, data: string }> {
        return new Promise((res, rej) => {
            ffmpeg(path).ffprobe((err, data) => {
                res({ err: err, data: data.format.format_name || "" })
            })
        })

    }
    ConvertMp3ToMp4(input: string, output: string): Promise<boolean> {
        return new Promise((res, rej) => {
            ffmpeg(input)
                .addOptions("-map", "0:0", "-c:a", "aac", "-c:v:0", "copy")
                .outputFormat("mp4")
                .saveToFile(output)
                .on('end', (stdout, stderr) => {
                    res(true)
                })
                .on('error', (error) => {
                    res(false)
                    console.log(__filename, error);

                });
        })

    }
}

const processvideo = new ProcessVideo

export default processvideo

