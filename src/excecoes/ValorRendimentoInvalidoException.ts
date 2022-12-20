export default class ValorRendimentoInvalidoException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}