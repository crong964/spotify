"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class CmdController {
    constructor() {
    }
    PostCommand(req, res) {
        const cmd = req.body.cmd;
        (0, child_process_1.exec)(cmd, (error, stdout, stderr) => {
            res.json({
                err: stderr != null,
                data: stdout.trim().split("\n")
            });
        });
    }
}
const cmdController = new CmdController();
exports.default = cmdController;
