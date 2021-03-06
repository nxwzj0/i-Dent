import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { ErrorComponent } from './error.component';
import { TopComponent } from './top/top.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { Mr2Component } from './mr2/mr2.component';
import { ProjectComponent } from './project/project.component';

const myRoutes = [
  { path: 'detail/:incidentId', component: DetailComponent, data: { category:'detail'}},
  { path: 'edit', component: EditComponent, data: { category:'edit'}},
  { path: 'list/:condId', component: ListComponent, data: { category:'list'}},
  { path: 'top', component: TopComponent, data: { category:'top'}},
  { path: 'project', component: ProjectComponent, data: { category:'project'}},
  { path: 'mr2', component: Mr2Component, data: { category:'mr2'}},
  { path: '', component: TopComponent, data: { category:'top'}},
  { path: '**', component: ErrorComponent },
];

export const MY_ROUTES: ModuleWithProviders = RouterModule.forRoot(myRoutes, { useHash: true });
