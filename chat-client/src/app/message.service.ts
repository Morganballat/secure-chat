import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) { }

  createChat(password: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/create/${password}`);
  }

  getChat(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/chat/${id}`);
  }

  postChat(id: string, message: string, key: string): Observable<any> {
    const encryptedMessage = this.encryptMessage(message, key);
    return this.http.post(`http://localhost:3000/api/chat/${id}`, {
      message: encryptedMessage,
    });
  }

  getChatStream(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/chat/${id}/stream`);
  }

  encryptMessage(message: string, key: string): string {
    return CryptoJS.AES.encrypt(message, key).toString();
  }

  decryptMessage(encryptedMessage: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
