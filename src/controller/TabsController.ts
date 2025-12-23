import { Request, Response } from "express";
import { tabService } from "../services";
class TabsController {
  static tab = tabService;

  async GetAll(req: Request, res: Response) {
    let ls = await TabsController.tab.GetAll();
    res.json({
      ls,
    });
  }
}

const tabsController = new TabsController();
export default tabsController;
