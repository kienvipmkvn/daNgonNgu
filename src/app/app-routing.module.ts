import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateNewComponent } from './create-new/create-new.component';
import { GridLanguageComponent } from './grid-language/grid-language.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {path:'dang-nhap', component: AuthComponent},
  {path:'', redirectTo: 'quan-ly', pathMatch: 'full'},
  {path:'quan-ly', canActivate: [AuthGuard], component: GridLanguageComponent, children: [
    {path: 'them-moi', component: CreateNewComponent},
    {path: 'chinh-sua', component: EditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
