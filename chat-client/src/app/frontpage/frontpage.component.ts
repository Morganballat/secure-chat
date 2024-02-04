import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as hash from "hash.js";
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
})
export class FrontpageComponent {
  constructor(private messageService: MessageService, private router: Router) { }


  password: string = '';

  hashAndSend() {
    const hashedPassword = hash.sha256().update(this.password).digest('hex');
    this.sendToServer(hashedPassword);
  }

  sendToServer(hashedPassword: string) {
    this.messageService.createChat(hashedPassword).subscribe((res) => {
      this.router.navigate(['/chat', res.chat.id]);
    });
  }
}
