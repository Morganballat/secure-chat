import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as hash from "hash.js";

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent {

  password: string = '';

  hashAndSend() {
    const hashedPassword = hash.sha256().update(this.password).digest('hex')
    // Envoyer le mot de passe hashé au serveur (vous devez implémenter cette fonction)
    this.sendToServer(hashedPassword);
  }

  sendToServer(hashedPassword: string) {
    // Remplacez cette fonction par la logique réelle pour envoyer le mot de passe au serveur
    console.log('Mot de passe hashé envoyé au serveur :', hashedPassword);
  }

}
