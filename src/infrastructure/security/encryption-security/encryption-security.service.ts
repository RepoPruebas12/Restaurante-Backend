import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IEncryptionSecurity } from 'src/domain/interfaces/security/encryption.security';

@Injectable()
export class EncryptionSecurityService implements IEncryptionSecurity {
    async encrypt(password: string, salt: number = 10): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}
