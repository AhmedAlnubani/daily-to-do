import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyTasksComponent } from './daily-tasks/daily-tasks.component';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = [
  {
    path: 'daily-tasks',
    canActivate:[AuthGuard],
    component: DailyTasksComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
