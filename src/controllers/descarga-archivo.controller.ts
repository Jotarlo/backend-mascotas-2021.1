import {inject} from '@loopback/core';
import {
  get,

  HttpErrors, oas,
  param,
  Response,
  RestBindings
} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {Keys as llaves} from '../config/keys';

const readdir = promisify(fs.readdir);

/**
 * A controller to handle file downloads using multipart/form-data media type
 */
export class DescargaArchivoController {

  constructor(
  ) { }

  /**
   *
   * @param type
   * @param id
   */
  @get('/files/{type}', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listFiles(
    @param.path.number('type') type: number,) {
    const rutaCarpeta = this.GetFolderPathByType(type);
    const archivos = await readdir(rutaCarpeta);
    return archivos;
  }

  /**
   *
   * @param type
   * @param recordId
   * @param response
   */
  @get('/files/{type}/{filename}')
  @oas.response.file()
  async downloadFile(
    @param.path.number('type') type: number,
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const rutaCarpeta = this.GetFolderPathByType(type);
    const archivo = this.ValidateFileName(rutaCarpeta, filename);
    //console.log("folder: " + folder)
    //console.log("fname: " + fileName)
    response.download(archivo, rutaCarpeta);
    return response;
  }

  /**
   * Get the folder when files are uploaded by type
   * @param type
   */
  private GetFolderPathByType(type: number) {
    let filePath = '';
    switch (type) {
      // mascota
      case 1:
        filePath = path.join(__dirname, llaves.carpetaImagenMascotas);
        break;

      case 2:
        filePath = path.join(__dirname, llaves.carpetaImagenPersonas);
    }
    return filePath;
  }


  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  private ValidateFileName(archivo: string, folder: string) {
    const resolved = path.resolve(archivo, folder);
    if (resolved.startsWith(archivo)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors[400](`La ruta del archivo es inválida: ${folder}`);
  }

}

