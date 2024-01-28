export default interface Service {
  execute: (...data: any) => Promise<any>;
}
