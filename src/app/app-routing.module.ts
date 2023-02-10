import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './admin/pages/add-course/add-course.component';
import { AddUserComponent } from './admin/pages/add-user/add-user.component';
import { AdminLogComponent } from './admin/pages/admin-log/admin-log.component';
import { AllUsersComponent } from './admin/pages/all-users/all-users.component';
import { SettingsPageComponent } from './admin/pages/settings-page/settings-page.component';
import { LoginComponent } from './auth/login/login.component';
import { AddStudentsComponent } from './common/add-students/add-students.component';
import { CourseDashboardComponent } from './common/course-dashboard/course-dashboard.component';
import { CourseGradesComponent } from './common/course-grades/course-grades.component';
import { CourseSettingsComponent } from './common/course-settings/course-settings.component';
import { HomeScreenComponent } from './common/home-screen/home-screen.component';
import { UserProfileComponent } from './common/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'course-grades', component: CourseGradesComponent },
  { path: 'course-settings', component: CourseSettingsComponent },
  { path: 'add-students', component: AddStudentsComponent },
  { path: 'course-dashboard', component: CourseDashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  // admin routes
  { path: 'add-user', component: AddUserComponent },
  { path: 'admin-log', component: AdminLogComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'all-users', component: AllUsersComponent },
  { path: "settings", component: SettingsPageComponent},

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
