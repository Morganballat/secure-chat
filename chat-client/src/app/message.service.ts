import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  encryptMessage(message: string, key: string): string {
    return CryptoJS.AES.encrypt(message, key).toString();
  }

  decryptMessage(encryptedMessage: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
