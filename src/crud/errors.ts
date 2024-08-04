export class CustomError extends Error {
    static UNEXPECTED_ERROR = 'Um erro inesperado aconteceu.'
    static USER_NAME_ALREADY_EXISTS = 'Nome já existe.'
    static BAD_PASSWORD = "Senha deve ter pelo menos 8 caracteres."
    static USER_NOT_FOUND = 'Usuário não encontrado.'
    static WRONG_PASSWORD = 'Senha incorreta.'
    static BAD_TOKEN = 'Token inválido.'
    static INSTITUTION_NOT_FOUND = 'Instituição de referência não encontrada.'
}
