export default class NomeEmBrancoException extends Error {
  constructor(msg: string) {
      super(msg);
  }
}