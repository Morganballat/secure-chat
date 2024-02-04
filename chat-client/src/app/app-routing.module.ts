import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
// import { FrontpageComponent } from './frontpage/frontpage.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component: HomeComponent },

  // const routes: Routes = [
  //   { path: '', component: FrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
