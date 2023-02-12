import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './admin/pages/add-course/add-course.component';
import { AddUserComponent } from './admin/pages/add-user/add-user.component';
import { AdminLogComponent } from './admin/pages/admin-log/admin-log.component';
import { AllUsersComponent } from './admin/pages/all-users/all-users.component';
import { EditUserComponent } from './admin/pages/edit-user/edit-user.component';
import { StudentsPageComponent } from './admin/pages/students-page/students-page.component';
import { SettingsPageComponent } from './admin/pages/settings-page/settings-page.component';
import { LoginComponent } from './auth/login/login.component';
import { AddStudentsComponent } from './common/add-students/add-students.component';
import { CourseDashboardComponent } from './common/course-dashboard/course-dashboard.component';
import { CourseGradesComponent } from './common/course-grades/course-grades.component';
import { CourseSettingsComponent } from './common/course-settings/course-settings.component';
import { HomeScreenComponent } from './common/home-screen/home-screen.component';
import { UserProfileComponent } from './common/user-profile/user-profile.component';
import { LoginGuard } from './auth/login.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'course-grades', component: CourseGradesComponent, canActivate: [AuthGuard] },
  { path: 'course-settings', component: CourseSettingsComponent, canActivate: [AuthGuard] },
  { path: 'add-students', component: AddStudentsComponent, canActivate: [AuthGuard] },
  { path: 'course-dashboard', component: CourseDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  // admin routes
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'admin-log', component: AdminLogComponent, canActivate: [AuthGuard] },
  { path: 'add-course', component: AddCourseComponent, canActivate: [AuthGuard] },
  { path: 'all-users', component: AllUsersComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: EditUserComponent , canActivate: [AuthGuard]},
  { path: 'students-page', component: StudentsPageComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsPageComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
