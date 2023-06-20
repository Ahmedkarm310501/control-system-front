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
import { SetupPageComponent } from './config/setup-page/setup-page.component';
import { AdminDataComponent } from './config/admin-data/admin-data.component';
import { SystemSettingsComponent } from './config/system-settings/system-settings.component';
import { AllCoursesComponent } from './admin/pages/all-courses/all-courses.component';
import { DissAllowGuard } from './auth/diss-allow.guard';
import { AddSemesterComponent } from './admin/pages/add-semester/add-semester.component';
import { ConfigureSemesterComponent } from './admin/pages/configure-semester/configure-semester.component';
import { ExtraGradesComponent } from './common/extra-grades/extra-grades.component';
import { CompareCoursesComponent } from './common/compare-courses/compare-courses.component';
// import { UserDataComponent } from './config/user-data/user-data.component';

const routes: Routes = [
  // configration routes
  { path: 'setup', component: SetupPageComponent, canActivate: [LoginGuard] },
  {
    path: 'admin-data',
    component: AdminDataComponent,
    canActivate: [DissAllowGuard],
  },
  {
    path: 'system-setup',
    component: SystemSettingsComponent,
    canActivate: [DissAllowGuard],
  },
  // common routes
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    // component: HomeScreenComponent,
    data: { breadcrumb: 'Courses' },
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeScreenComponent },
      {
        path: 'course/:courseId/:termId',
        data: { breadcrumb: 'Course Grades' },
        canActivate: [AuthGuard],
        children: [
          { path: '', component: CourseGradesComponent },
          {
            path: 'course-settings',
            component: CourseSettingsComponent,
            canActivate: [AuthGuard],
            data: { breadcrumb: 'Course Settings' },
          },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },

  {
    path: 'add-students',
    component: AddStudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-dashboard',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Course Dashboard' },
    children: [
      { path: '', component: CourseDashboardComponent },
      {
        path: 'extra-grades/:courseId',
        component: ExtraGradesComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Extra Grades' },
      },
    ],
  },

  {
    path: 'compare-courses',
    component: CompareCoursesComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Compare Courses' },
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'User Profile' },
  },
  // admin routes
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Add User' },
  },
  {
    path: 'admin-log',
    component: AdminLogComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Admin Log' },
  },
  {
    path: 'add-semester',
    component: AddSemesterComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Add Semester' },
  },
  {
    path: 'configure-semester',
    component: ConfigureSemesterComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Configure Semester' },
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Add Course' },
  },
  {
    path: 'all-users',
    // component: AllUsersComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'All Users' },
    children: [
      { path: '', component: AllUsersComponent },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Edit User' },
      },
    ],
  },
  {
    path: 'all-courses',
    component: AllCoursesComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'All Courses' },
  },

  {
    path: 'students-page',
    component: StudentsPageComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Students Page' },
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Settings' },
  },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
