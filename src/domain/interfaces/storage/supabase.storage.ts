import { EntidadArchivoRequestDto } from "src/api/dto/supabase/request/EntidadArchivoRequest.dto"

export const IStorageSupabase = Symbol('IStorageSupabase')
export interface IStorageSupabase {
    Remove(entidad: EntidadArchivoRequestDto): Promise<void>
    Download(entidad: EntidadArchivoRequestDto): Promise<Buffer>
    Upload(entidad: EntidadArchivoRequestDto): Promise<string>
}