import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What's the domain name? ", (domainName) => {
  rl.question("What's the useCase name? ", (useCaseName) => {
    const useCasesPath = "./useCases";
    const domainPath = path.join(useCasesPath, domainName);
    const useCasePath = path.join(useCasesPath, domainName, useCaseName);
    // Crie a pasta ./useCases se não existir
    if (!fs.existsSync(useCasesPath)) {
      fs.mkdirSync(useCasesPath);
    }

    // Crie a pasta ./useCases/domainName se não existir
    if (!fs.existsSync(domainPath)) {
      fs.mkdirSync(domainPath);
    }
    fs.mkdirSync(useCasePath);

    // Crie os arquivos dentro da pasta do domainName
    fs.writeFileSync(
      path.join(useCasePath, "Controller.ts"),
      `
import { Request, Response } from "express";
import Controller from "../../../Global/interfaces/Controller";
import ${capitalizeFirstLetter(useCaseName)}Service from "./Service";

export default class ${capitalizeFirstLetter(
        useCaseName
      )}Controller implements Controller {
  private service: ${capitalizeFirstLetter(useCaseName)}Service;
  constructor(service: ${capitalizeFirstLetter(useCaseName)}Service) {
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
`
    );
    fs.writeFileSync(
      path.join(useCasePath, "Service.ts"),
      `
    import { RepositoryInterface } from "./Repositories";
    import Service from "../../../Global/interfaces/Service";
    
    export default class ${capitalizeFirstLetter(
      useCaseName
    )}Service implements Service {
      private repository: RepositoryInterface;
      constructor(repository: RepositoryInterface) {
        this.repository = repository;
      }
      async execute() {
        return true;
      }
    }
    `
    );
    fs.writeFileSync(
      path.join(useCasePath, "DTOs.ts"),
      `
      export class DTO {
        constructor(public id: string){}
        
      }
      `
    );
    fs.writeFileSync(
      path.join(useCasePath, "Repositories.ts"),
      `
      import { DataSource } from "typeorm";
      import { Repository } from "../../../data/db";
      //import { ENTITY } from "../../../entities/";
      import { DTO } from "./DTOs";
      
      export interface RepositoryInterface {
        findAll: () => Promise<DTO[]>;
      }
      @Repository
      export class EntityRepository implements RepositoryInterface {
        private connection: DataSource;
        async findAll(): Promise<DTO[]> {
          return [new DTO("MockID")];
        }
      }
      
    `
    );
    fs.writeFileSync(
      path.join(useCasePath, "index.ts"),
      `
    import Controller from "./Controller";
    import Service from "./Service";
    import { EntityRepository } from "./Repositories";
    
    const repository = new EntityRepository();
    
    const service = new Service(repository);
    const controller = new Controller(service);
    
    export default controller.handle.bind(controller);
    `
    );
    fs.writeFileSync(
      path.join(useCasePath, "useCase.test.ts"),
      `
import { randomUUID } from "crypto";
import { DTO } from "./DTOs";
import { EntityRepository } from "./Repositories";
import Service from "./Service";

let repository: EntityRepository;
let service: Service;
const mock: DTO[] = [
];
describe("New Test Description", () => {
  beforeEach(async () => {
    repository = new EntityRepository();
    service = new Service(repository);
    jest
      .spyOn(repository, "findAll")
      .mockImplementation(async () => mock);
  });
  it("Should get the same object as mock", async () => {
    const serviceResponse = await service.execute();
    expect(serviceResponse).toBe(mock);
  });
});
`
    );
    rl.close();
  });
});
function capitalizeFirstLetter(word: string): string {
  if (!word) {
    return word;
  }

  // Transforma apenas a primeira letra em maiúscula
  return word.charAt(0).toUpperCase() + word.slice(1);
}
