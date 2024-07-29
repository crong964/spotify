import { exec, ExecException } from "child_process";
import { Request, Response } from "express";
class CmdController {
    constructor() {

    }
    PostCommand(req: Request, res: Response) {
        const cmd = req.body.cmd
        exec(cmd, (error: ExecException | null, stdout: string, stderr: string) => {

            res.json({
                err: stderr != null,
                data: stdout.trim().split("\n")
            })
        })

    }
}

const cmdController = new CmdController()

export default cmdController