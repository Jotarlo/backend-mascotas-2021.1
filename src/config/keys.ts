export namespace Keys {
  export const AESKey = 'Pr0g3@Ucaldas*';
  export const EmailFrom = 'jeferson.arango@ucaldas.edu.co';
  export const AsuntoRegistroUsuario = 'Registro en el sistema de Mascotas';
  export const jwtKey = 'CLav3@JWT';
  export const expTimeJWT = (Date.now() / 1000) + (60 * 60 * 10);
  export const twilioPhone = '+12019891810';
  export const carpetaImagenMascotas = "../../archivos/mascotas";
  export const nombreCampoImagenMascota = "file";
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenMascota = 1024 * 1024;
  export const carpetaImagenPersonas = "../../archivos/personas";
  export const nombreCampoImagenPersona = "file";
  export const tamMaxImagenPersona = 2048 * 2048;
}
