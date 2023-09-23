"use strict";(self.webpackChunkDashboard=self.webpackChunkDashboard||[]).push([[857],{857:(M,l,o)=>{o.r(l),o.d(l,{ListsModule:()=>f});var c=o(6814),i=o(4190),d=o(7394),t=o(5879),g=o(7706),r=o(617);function h(n,e){if(1&n&&(t.ynx(0),t.TgZ(1,"div",3)(2,"div",4)(3,"mat-icon"),t._uU(4),t.qZA()()(),t.BQk()),2&n){const s=t.oxw().$implicit;t.xp6(1),t.Q6J("routerLink","/dashboard/lists/"+s.value),t.xp6(3),t.Oqu(s.icon)}}function u(n,e){if(1&n&&(t.ynx(0),t.YNc(1,h,5,2,"ng-container",1),t.BQk()),2&n){const s=e.$implicit;t.xp6(1),t.Q6J("ngIf",s.visible)}}function v(n,e){if(1&n&&(t.ynx(0),t.YNc(1,u,2,1,"ng-container",2),t.BQk()),2&n){const s=e.ngIf;t.xp6(1),t.Q6J("ngForOf",s)}}const m=[{path:"",component:(()=>{class n{constructor(s,a){this.menuService=s,this.router=a,this.subscription=new d.w0}ngOnInit(){this.menuService.setCurrentIndex(1),this.menuService.getSections(),this.sections$=this.menuService.sections$}getTabIndex(s){switch(s){case"persons":default:return 0;case"cars":return 1;case"pets":return 2}}goToPage(s){this.router.navigate([`/dashboard/lists/${s}`])}ngOnDestroy(){this.subscription.unsubscribe()}}return n.\u0275fac=function(s){return new(s||n)(t.Y36(g.h),t.Y36(i.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-lists"]],decls:4,vars:3,consts:[[1,"nav"],[4,"ngIf"],[4,"ngFor","ngForOf"],["routerLinkActive","section-button--active",1,"section-button",3,"routerLink"],[1,"section-button_icon"]],template:function(s,a){1&s&&(t.TgZ(0,"div",0),t.YNc(1,v,2,1,"ng-container",1),t.ALo(2,"async"),t.qZA(),t._UZ(3,"router-outlet")),2&s&&(t.xp6(1),t.Q6J("ngIf",t.lcZ(2,1,a.sections$)))},dependencies:[c.sg,c.O5,i.lC,i.rH,i.Od,r.Hw,c.Ov],styles:[".nav[_ngcontent-%COMP%]{display:flex;align-content:flex-start;gap:30px}@media (orientation: portrait){.nav[_ngcontent-%COMP%]{flex-wrap:wrap;justify-content:center;gap:20px}}.nav[_ngcontent-%COMP%]   .section-button[_ngcontent-%COMP%]{position:relative;background-color:var(--color-grey);width:150px;height:150px;box-shadow:var(--shadow);border-radius:4px;cursor:pointer}@media (orientation: portrait){.nav[_ngcontent-%COMP%]   .section-button[_ngcontent-%COMP%]{width:40%;height:80px}}.nav[_ngcontent-%COMP%]   .section-button--active[_ngcontent-%COMP%]{background-color:var(--color-1)}.nav[_ngcontent-%COMP%]   .section-button[_ngcontent-%COMP%]:hover{box-shadow:2px 4px 10px #000}.nav[_ngcontent-%COMP%]   .section-button[_ngcontent-%COMP%]:active{box-shadow:inset 2px 4px 10px #000}.nav[_ngcontent-%COMP%]   .section-button_icon[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.nav[_ngcontent-%COMP%]   .section-button_icon[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{color:var(--color-text-light);height:60px;width:60px;font-size:60px}"]}),n})(),children:[{path:"",pathMatch:"full",redirectTo:"persons"},{path:"persons",loadChildren:()=>Promise.all([o.e(620),o.e(155),o.e(592),o.e(782)]).then(o.bind(o,4782)).then(n=>n.PersonsModule)},{path:"cars",loadChildren:()=>Promise.all([o.e(620),o.e(155),o.e(592),o.e(724)]).then(o.bind(o,1724)).then(n=>n.CarsModule)},{path:"pets",loadChildren:()=>Promise.all([o.e(620),o.e(155),o.e(592),o.e(59)]).then(o.bind(o,5059)).then(n=>n.PetsModule)},{path:"events",loadChildren:()=>Promise.all([o.e(620),o.e(155),o.e(592),o.e(438)]).then(o.bind(o,2438)).then(n=>n.EventsModule)}]}];let p=(()=>{class n{}return n.\u0275fac=function(s){return new(s||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[i.Bz.forChild(m),i.Bz]}),n})();var C=o(279),x=o(7700);let f=(()=>{class n{}return n.\u0275fac=function(s){return new(s||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[c.ez,p,C.m,r.Ps,x.Is]}),n})()}}]);