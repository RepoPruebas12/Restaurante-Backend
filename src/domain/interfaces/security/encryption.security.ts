
export const IEncryptionSecurity = Symbol('IEncryptionSecurity')
export interface IEncryptionSecurity {
    encrypt(password: string, salt?: number): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}