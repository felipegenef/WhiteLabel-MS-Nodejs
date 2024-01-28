import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import * as admin from "firebase-admin";
let db: DataSource | undefined;

async function createCache<DataSource>() {
  if (!db) {
    console.log({ level: "info", message: "New Connection Created" });
    db = await AppDataSource.initialize();
    return db;
  }
  console.log({ level: "info", message: "Using existing connection" });
  return db;
}

// Decorator para um método específico que  antes de executar garante que exista o cache de conexão
export function EnsureConnected(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    await createCache();
    return originalMethod.apply(this, args);
  };

  return descriptor;
}
// Decorator que pega todos os métodos da classe e antes de executar garante que exista o cache de conexão
export function Repository(target: any): any {
  const originalMethods = Object.getOwnPropertyNames(target.prototype);
  for (const methodName of originalMethods) {
    if (
      methodName !== "constructor" &&
      typeof target.prototype[methodName] === "function"
    ) {
      const originalMethod = target.prototype[methodName];
      target.prototype[methodName] = async function (...args: any[]) {
        await createCache(); // Chama a função de inicialização de conexão
        target.prototype["connection"] = db; //injeta conexão
        return originalMethod.apply(this, args);
      };
    }
  }
}
export default createCache;
