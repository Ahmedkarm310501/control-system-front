import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { AddUserComponent } from './admin/pages/add-user/add-user.component';
import { AdminLogComponent } from './admin/pages/admin-log/admin-log.component';
import { AddCourseComponent } from './admin/pages/add-course/add-course.component';
import { AllUsersComponent } from './admin/pages/all-users/all-users.component';
import { CourseGradesComponent } from './common/course-grades/course-grades.component';
import { CourseSettingsComponent } from './common/course-settings/course-settings.component';
import { AddStudentsComponent } from './common/add-students/add-students.component';
import { CourseDashboardComponent } from './common/course-dashboard/course-dashboard.component';
import { HomeScreenComponent } from './common/home-screen/home-screen.component';
import { EditUserComponent } from './admin/pages/edit-user/edit-user.component';
import { StudentsPageComponent } from './admin/pages/students-page/students-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './common/user-profile/user-profile.component';
import { SettingsPageComponent } from './admin/pages/settings-page/settings-page.component';
import { ReadExcelDirective } from './common/directives/read-excel.directive';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    AddUserComponent,
    AdminLogComponent,
    AddCourseComponent,
    AllUsersComponent,
    CourseGradesComponent,
    CourseSettingsComponent,
    AddStudentsComponent,
    CourseDashboardComponent,
    HomeScreenComponent,
    EditUserComponent,
    StudentsPageComponent,
    UserProfileComponent,
    SettingsPageComponent,
    ReadExcelDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
