export default class ValorContribuicaoInvalidoException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}