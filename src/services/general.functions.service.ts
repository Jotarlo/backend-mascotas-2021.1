
import {generate} from 'generate-password';
const CryptoJS = require("crypto-js");

export class GeneralFunctionsService {
  constructor() {

  }


  /**
   * Función para generar una clave aleatoria
   */
  GenerarClaveAleatoria(): string {

    let pass = generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true
    });

    return pass;
  }

  /**
   * Cifrar una cadena
   */
  CifrarTexto(texto: string): string {
    //let ciphertext = CryptoJS.AES.encrypt(texto, llaves.AESKey).toString();
    let ciphertext = CryptoJS.MD5(texto);
    return ciphertext;
  }
}
