"use strict";(self.webpackChunkDashboard=self.webpackChunkDashboard||[]).push([[774],{3774:(B,g,o)=>{o.r(g),o.d(g,{EventsModule:()=>N});var c=o(6814),C=o(4104),S=o(617),r=o(7700),A=o(279),f=o(4190),m=o(7394),v=o(9758),E=o(8209),x=o(6758),t=o(5879),D=o(5619),p=o(6223),T=o(4004),d=o(4052),F=o(553),O=o(9862),Z=o(3934);let h=(()=>{class n{constructor(e,i,s){this.http=e,this.dialog=i,this.userService=s,this.dataList=[],this.dataListSubject=new D.X([]),this.data$=this.dataListSubject.asObservable(),this.formFields=[{type:d.f.Select,label:"Category",name:"category",options:["Holidays","Occasions","Entertainment","Education","Work"],validations:[p.kI.required]},{type:d.f.Text,label:"Title",name:"name",validations:[p.kI.required]},{type:d.f.Date,label:"Date",name:"date",validations:[p.kI.required]},{type:d.f.Textarea,label:"Description",name:"description"},{type:d.f.Select,label:"Importance",name:"importance",options:["Low","Medium","High"],validations:[p.kI.required]}],this.subscription=new m.w0,this.uid=s.getUid(),this.url=`${F.N.firebaseConfig.databaseURL}/users/${this.uid}/events/eventsList.json`}getList(){this.subscription.add(this.http.get(this.url).subscribe({next:e=>{const i=null!==e?e:[];this.dataList=i,this.dataListSubject.next(i)},error:()=>{this.dialog.open(E.W,{data:{title:"Error",description:"Error while fetching data",type:"error"}})}}))}addUniqueId(){return(0,T.Z)()}add(e){const i=[...this.dataList,e];this.dataListSubject.next(i),this.subscription.add(this.http.put(this.url,i).subscribe(()=>{this.dataList=i}))}update(e){const i=[...this.dataList],s=i.findIndex(l=>l.id===e.id);-1!==s&&(i[s]=e,this.dataListSubject.next(i),this.subscription.add(this.http.put(this.url,i).subscribe(()=>{this.dataList=i})))}delete(e){const i=[...this.dataList],s=i.findIndex(l=>l.id===e.id);-1!==s&&(i.splice(s,1),this.dataListSubject.next(i),this.subscription.add(this.http.put(this.url,i).subscribe(()=>{this.dataList=i})))}getFormFields(){return this.formFields.slice()}ngOnDestroy(){this.subscription.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(O.eN),t.LFG(r.uw),t.LFG(Z.K))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var u=o(5819),L=o(1424);let y=(()=>{class n{constructor(e,i){this.dialogRef=e,this.dataService=i,this.submitFormEvent=new t.vpe}ngOnInit(){this.formFields=this.dataService.getFormFields()}closeHandler(){this.dialogRef.close()}submitHandler(e){this.submitFormEvent.emit(e)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(r.so),t.Y36(h))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-event-form"]],inputs:{data:"data",title:"title"},outputs:{submitFormEvent:"submitFormEvent"},decls:4,vars:3,consts:[["mat-dialog-title","",1,"title"],["mat-dialog-content",""],[3,"data","fields","submitEvent","closeEvent"]],template:function(e,i){1&e&&(t.TgZ(0,"p",0),t._uU(1),t.qZA(),t.TgZ(2,"div",1)(3,"app-create-form",2),t.NdJ("submitEvent",function(l){return i.submitHandler(l)})("closeEvent",function(){return i.closeHandler()}),t.qZA()()),2&e&&(t.xp6(1),t.Oqu(i.data?"Edit "+i.data.name:"Add new "+i.title.slice(0,-1)),t.xp6(2),t.Q6J("data",i.data)("fields",i.formFields))},dependencies:[L.I,r.uh,r.xY],styles:[".title[_ngcontent-%COMP%]{color:var(--color-text-light)}"]}),n})(),w=(()=>{class n{constructor(e,i,s,l){this.dialogRef=e,this.dialogData=i,this.dataService=s,this.timeAlertService=l}ngOnInit(){this.title=this.dialogData.title,this.alertService=this.dialogData.alertService}addHandler(e){const i=this.dataService.addUniqueId();e.id=i,this.newItem=e;const s=this.timeAlertService.getCountEndTime(e.date);this.checkTimeAlert(s,"Date"),this.dataService.add(this.newItem)}checkTimeAlert(e,i){e<=30&&this.alertService.addAlert(this.title,this.newItem.id,this.newItem.category,this.newItem.name,e,i)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(r.so),t.Y36(r.WI),t.Y36(h),t.Y36(u.X))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-add-event-dialog"]],decls:1,vars:1,consts:[[3,"title","submitFormEvent"]],template:function(e,i){1&e&&(t.TgZ(0,"app-event-form",0),t.NdJ("submitFormEvent",function(l){return i.addHandler(l)}),t.qZA()),2&e&&t.Q6J("title",i.title)},dependencies:[y]}),n})(),b=(()=>{class n{constructor(e,i,s,l){this.dialogRef=e,this.dialogData=i,this.dataService=s,this.timeAlertService=l}ngOnInit(){this.title=this.dialogData.title,this.event=this.dialogData.event,this.alertService=this.dialogData.alertService}updateHandler(e){e.id=this.event.id;const i=this.timeAlertService.getDaysToAnniversary(e.date);this.updateTimeAlert(i,"Date",e),this.dataService.update(e)}updateTimeAlert(e,i,s){e<=30?this.alertService.updateAlert(this.title,this.event.id,s.category,s.name,e,i):this.alertService.deleteAlertByItem(this.title,this.event.id,i)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(r.so),t.Y36(r.WI),t.Y36(h),t.Y36(u.X))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-update-event-dialog"]],decls:1,vars:2,consts:[[3,"title","data","submitFormEvent"]],template:function(e,i){1&e&&(t.TgZ(0,"app-event-form",0),t.NdJ("submitFormEvent",function(l){return i.updateHandler(l)}),t.qZA()),2&e&&t.Q6J("title",i.title)("data",i.event)}}),n})();var I=o(7706),M=o(9132),U=o(5301);function $(n,a){if(1&n&&(t.TgZ(0,"p")(1,"span"),t._uU(2,"Description"),t.qZA(),t._uU(3),t.qZA()),2&n){const e=t.oxw();t.xp6(3),t.hij(": ",e.details.description,"")}}const Y=function(n,a,e,i){return{"importance-level_low":n,"importance-level_medium":a,"importance-level_high":e,"importance-level--active":i}};function j(n,a){if(1&n&&(t.TgZ(0,"div",6),t._uU(1),t.qZA()),2&n){const e=a.$implicit,i=t.oxw();t.Q6J("ngClass",t.l5B(2,Y,"Low"===e,"Medium"===e,"High"===e,e===i.details.importance)),t.xp6(1),t.hij(" ",e," ")}}let P=(()=>{class n{constructor(e,i){this.timeAlertService=e,this.alertService=i,this.importanceLevels=["Low","Medium","High"],this.subscription=new m.w0}ngOnInit(){this.date=this.timeAlertService.getCountEndTime(this.details.date),this.subscription.add(this.alerts$.subscribe(e=>{this.alerts=e})),this.alerts?.length>0&&this.updateTimeAlert(this.date,"Date")}updateTimeAlert(e,i){const s=this.alertService.isUpdateAlertNeeded(this.details.id,i,e);s&&e<=30?this.alertService.updateAlert(this.title,this.details.id,this.details.category,this.details.name,e,i):s&&this.alertService.deleteAlertByItem(this.title,this.details.id,i)}getImportanceIcon(e){switch(e){case"Low":return"slow_motion_video low_priority";case"Medium":default:return"child_friendly";case"High":return"priority_high"}}ngOnDestroy(){this.subscription.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(u.X),t.Y36(v.c))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-event-details"]],inputs:{details:"details",alerts$:"alerts$",title:"title"},decls:19,vars:6,consts:[[1,"details"],[4,"ngIf"],[2,"flex-grow","1","display","flex","justify-content","flex-end"],[1,"importance-bar"],["class","importance-level",3,"ngClass",4,"ngFor","ngForOf"],["title","Date",3,"days"],[1,"importance-level",3,"ngClass"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"div")(2,"p")(3,"span"),t._uU(4,"Title"),t.qZA(),t._uU(5),t.qZA(),t.TgZ(6,"p")(7,"span"),t._uU(8,"Category"),t.qZA(),t._uU(9),t.qZA(),t.TgZ(10,"p")(11,"span"),t._uU(12,"Date"),t.qZA(),t._uU(13),t.qZA(),t.YNc(14,$,4,1,"p",1),t.qZA(),t.TgZ(15,"div",2)(16,"div",3),t.YNc(17,j,2,7,"div",4),t.qZA()(),t._UZ(18,"app-progress",5),t.qZA()),2&e&&(t.xp6(5),t.hij(": ",i.details.name,""),t.xp6(4),t.hij(": ",i.details.category,""),t.xp6(4),t.hij(": ",i.details.date,""),t.xp6(1),t.Q6J("ngIf",i.details.description),t.xp6(3),t.Q6J("ngForOf",i.importanceLevels),t.xp6(1),t.Q6J("days",i.date))},dependencies:[c.mk,c.sg,c.O5,U.t],styles:["[_nghost-%COMP%]{width:100%;margin-top:20px}.details[_ngcontent-%COMP%]{display:flex;color:var(--color-text);min-height:100px}.details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:700}.event[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;width:200px;height:110px;margin-left:40px}.event[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:80px;height:80px;font-size:80px;color:var(--color-2)}.importance-bar[_ngcontent-%COMP%]{display:flex;align-items:center;padding:5px;margin-right:40px}.importance-level[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:5px;width:100px;color:#fff;font-weight:700;border-radius:10px 0 0 10px;box-shadow:-2px 2px 4px #0000009f}.importance-level_low[_ngcontent-%COMP%]{background-color:#588158;height:40px}.importance-level_medium[_ngcontent-%COMP%]{background-color:#fac158;height:80px}.importance-level_high[_ngcontent-%COMP%]{background-color:#ff7070;height:120px;border-radius:10px}.importance-level--active[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_active .3s infinite alternate}@keyframes _ngcontent-%COMP%_active{0%{box-shadow:-1px 1px 8px 4px #000000c0}to{box-shadow:-1px 1px 10px 6px #000000bd}}"]}),n})();function J(n,a){if(1&n&&t._UZ(0,"app-event-details",2),2&n){const e=a.element,i=t.oxw();t.Q6J("title",i.title)("details",e)("alerts$",i.alerts$)}}const _=[{path:"",component:(()=>{class n{constructor(e,i,s,l){this.dialog=e,this.menuService=i,this.dataService=s,this.alertService=l,this.headers=["name","category"],this.subscription=new m.w0}ngOnInit(){this.getSectionInfo(x.Q.Events),this.alertService.getAlerts(this.title),this.dataService.getList(),this.data$=this.dataService.data$,this.alerts$=this.alertService.categoryAlerts$}getSectionInfo(e){this.menuService.getSections(),this.sections=this.menuService.takeSections(),this.title=this.sections[e].title;const i=this.sections.find(s=>s.title===this.title);i&&(this.icon=i.icon)}addDialog(){this.dialog.open(w,{width:"500px",data:{alertService:this.alertService,title:this.title}})}editDialog(e){this.dialog.open(b,{width:"500px",data:{title:this.title,event:e,alertService:this.alertService}})}deleteDialog(e){const i=this.dialog.open(E.W,{data:{title:`Delete ${e.name}`,description:`Are you sure you want to delete ${e.category} - ${e.name}`,type:"submit"}});this.subscription.add(i.afterClosed().subscribe(s=>{"submit"===s&&(this.alertService.deleteAlert(this.title,e.id),this.dataService.delete(e))}))}ngOnDestroy(){this.subscription.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(r.uw),t.Y36(I.h),t.Y36(h),t.Y36(v.c))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-events"]],features:[t._Bn([v.c])],decls:3,vars:5,consts:[[3,"title","icon","alerts$","data$","columnsToDisplay","addEvent","editEvent","deleteEvent"],["detailsTemplate",""],[3,"title","details","alerts$"]],template:function(e,i){1&e&&(t.TgZ(0,"app-table",0),t.NdJ("addEvent",function(){return i.addDialog()})("editEvent",function(l){return i.editDialog(l)})("deleteEvent",function(l){return i.deleteDialog(l)}),t.YNc(1,J,1,3,"ng-template",null,1,t.W1O),t.qZA()),2&e&&t.Q6J("title",i.title)("icon",i.icon)("alerts$",i.alerts$)("data$",i.data$)("columnsToDisplay",i.headers)},dependencies:[M.a,P]}),n})()}];let H=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[f.Bz.forChild(_),f.Bz]}),n})(),N=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[H,c.ez,A.m,C.Nh,S.Ps,r.Is]}),n})();t.B6R(b,[y],[])}}]);