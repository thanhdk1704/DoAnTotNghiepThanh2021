import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { PageloiComponent } from './layouts/pageloi/pageloi.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'',loadChildren:()=>import('./login/login.module').then(x=>x.LoginModule)},
  {path:'main',loadChildren:()=>import('./main/main.module').then(m=>m.MainModule)},
  {path:'**',component:PageloiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
