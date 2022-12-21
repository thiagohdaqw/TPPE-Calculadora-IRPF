export default class ValorPensaoInvalidoException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}