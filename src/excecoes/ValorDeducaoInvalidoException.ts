export default class ValorDeducaoInvalidoException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}