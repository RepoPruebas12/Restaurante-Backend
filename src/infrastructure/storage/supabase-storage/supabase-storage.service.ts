import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { EntidadArchivoRequestDto } from 'src/api/dto/supabase/request/EntidadArchivoRequest.dto';
import { IStorageSupabase } from 'src/domain/interfaces/storage/supabase.storage';

@Injectable()
export class SupabaseStorageService implements IStorageSupabase {

    private supabase: SupabaseClient;

    constructor(private configService: ConfigService) {
        const supabaseUrl = this.configService.get<string>(
            'SUPABASE_URL',
        ) as string;
        const supabaseKey = this.configService.get<string>(
            'SUPABASE_KEY',
        ) as string;

        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    async Remove(entidad: EntidadArchivoRequestDto): Promise<void> {
        try {
            const { error } = await this.supabase.storage
                .from(entidad.contenedor)
                .remove([entidad.archivo]);

            if (error) {
                throw new BadRequestException('Error al eliminar el archivo del storage: ' + error.message)
            }
        } catch (error: any) {
            throw new BadRequestException('Error al eliminar el archivo del storage: ' + error.message)
        }

    }

    async Download(entidad: EntidadArchivoRequestDto): Promise<Buffer> {
        try {
            const { data, error } = await this.supabase.storage
                .from(entidad.contenedor)
                .download(entidad.archivo);

            if (error) {
                throw new BadRequestException('Error al descargar el archivo del storage: ' + error.message)
            }

            const arrayBuffer = await data.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return buffer;
        } catch (error: any) {
            throw new BadRequestException('Error al descargar el archivo del storage: ' + error.message)
        }
    }

    async Upload(entidad: EntidadArchivoRequestDto): Promise<string> {
        try {
            let base64Data = entidad.base64;
            if (base64Data.includes('base64')) {
                base64Data = base64Data.substring(
                    base64Data.indexOf('base64') + 'base64'.length + 1,
                );
            }
            const fileBuffer = Buffer.from(base64Data, 'base64');
            const { data, error } = await this.supabase.storage
                .from(entidad.contenedor)
                .upload(entidad.archivo, fileBuffer, {
                    contentType: this.getContentType(entidad.archivo),
                    upsert: false,
                });
            if (error) {
                throw new BadRequestException(`Error al subir archivo: ${error.message}`)
            }
            const { data: urlData } = this.supabase.storage
                .from(entidad.contenedor)
                .getPublicUrl(entidad.archivo);
            return urlData.publicUrl;
        } catch (error) {
            throw new BadRequestException(error)
        }

    }


    getContentType(filename: string): string {
        const ext = filename.split('.').pop()?.toLowerCase() as string;
        const contentTypes: { [key: string]: string } = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
            pdf: 'application/pdf',
            doc: 'application/msword',
            docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            xls: 'application/vnd.ms-excel',
            xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };

        return contentTypes[ext] || 'application/octet-stream';
    }
}
