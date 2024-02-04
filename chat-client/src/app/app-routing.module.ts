import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { FrontpageComponent } from './frontpage/frontpage.component';

const routes: Routes = [
  { path: 'chat/:id', component: ChatComponent },
  { path: '', component: FrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
