
import { Request, Response } from "express";
import Controller from "../../../Global/interfaces/Controller";
import GetAllUsersService from "./Service";

export default class GetAllUsersController implements Controller {
  private service: GetAllUsersService;
  constructor(service: GetAllUsersService) {
    this.service = service;
  }
  async handle(req: Request, res: Response) {
    try {
      const data = await this.service.execute();
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "error" });
    }
  }
}
