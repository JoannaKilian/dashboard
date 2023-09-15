"use strict";(self.webpackChunkDashboard=self.webpackChunkDashboard||[]).push([[0],{3e3:(W,g,r)=>{r.r(g),r.d(g,{PetsModule:()=>V});var p=r(6814),D=r(4104),f=r(617),l=r(7700),T=r(279),t=r(5879),P=r(5619),h=r(6223),_=r(4004),c=r(4052),v=r(8209),C=r(9862);let d=(()=>{class a{constructor(e,i){this.http=e,this.dialog=i,this.dataList=[],this.dataListSubject=new P.X([]),this.data$=this.dataListSubject.asObservable(),this.formFields=[{type:c.f.Text,label:"Name",name:"name",validations:[h.kI.required]},{type:c.f.Select,label:"Sex",name:"sex",options:["Male","Female"],validations:[h.kI.required]},{type:c.f.Select,label:"Species",name:"species",options:["Dog","Cat","Rabbit","Guinea Pig","Hamster","Bird","Fish","Turtle","Ferret","Horse","Rat","Mouse"],validations:[h.kI.required]},{type:c.f.Text,label:"Breed",name:"breed"},{type:c.f.Date,label:"Date Of Birth",name:"dateOfBirth",validations:[h.kI.required]},{type:c.f.Date,label:"Vaccination Date",name:"vaccinationDate"}],this.url="/pets/petsList.json"}getList(){this.http.get(this.url).subscribe({next:e=>{const i=null!==e?e:[];this.dataList=i,this.dataListSubject.next(i)},error:()=>{this.dialog.open(v.W,{data:{title:"Error",description:"Error while fetching pets data",type:"error"}})}})}addUniqueId(){return(0,_.Z)()}add(e){const i=[...this.dataList,e];this.dataListSubject.next(i),this.http.put(this.url,i).subscribe(()=>{this.dataList=i})}update(e){const i=[...this.dataList],n=i.findIndex(o=>o.id===e.id);-1!==n&&(i[n]=e,this.dataListSubject.next(i),this.http.put(this.url,i).subscribe(()=>{this.dataList=i}))}delete(e){const i=[...this.dataList],n=i.findIndex(o=>o.id===e.id);-1!==n&&(i.splice(n,1),this.dataListSubject.next(i),this.http.put(this.url,i).subscribe(()=>{this.dataList=i}))}getFormFields(){return this.formFields.slice()}getAverageLifespan(e){switch(e.species){case"Dog":return 12;case"Cat":return 14;case"Rabbit":case"Bird":return 10;case"Guinea Pig":case"Fish":return 6;case"Hamster":case"Rat":return 3;case"Turtle":return 30;case"Ferret":return 8;case"Horse":return 28;case"Mouse":return 2;default:return-1}}}return a.\u0275fac=function(e){return new(e||a)(t.LFG(C.eN),t.LFG(l.uw))},a.\u0275prov=t.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();var Z=r(1424);let A=(()=>{class a{constructor(e,i){this.dialogRef=e,this.dataService=i,this.submitFormEvent=new t.vpe}ngOnInit(){this.formFields=this.dataService.getFormFields()}closeHandler(){this.dialogRef.close()}submitHandler(e){this.submitFormEvent.emit(e)}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(l.so),t.Y36(d))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-pet-form"]],inputs:{data:"data",title:"title"},outputs:{submitFormEvent:"submitFormEvent"},decls:4,vars:3,consts:[["mat-dialog-title","",1,"title"],["mat-dialog-content",""],[3,"data","fields","submitEvent","closeEvent"]],template:function(e,i){1&e&&(t.TgZ(0,"p",0),t._uU(1),t.qZA(),t.TgZ(2,"div",1)(3,"app-create-form",2),t.NdJ("submitEvent",function(o){return i.submitHandler(o)})("closeEvent",function(){return i.closeHandler()}),t.qZA()()),2&e&&(t.xp6(1),t.Oqu(i.data?"Edit "+i.data.name+" "+i.data.species:"Add new "+i.title.slice(0,-1)),t.xp6(2),t.Q6J("data",i.data)("fields",i.formFields))},dependencies:[Z.I,l.uh,l.xY],styles:[".title[_ngcontent-%COMP%]{color:var(--color-text-light)}"]}),a})();var y=r(4190),S=r(7394),m=r(9758),F=r(6758),u=r(5819);let x=(()=>{class a{constructor(e,i,n,o){this.dialogRef=e,this.dialogData=i,this.dataService=n,this.timeAlertService=o}ngOnInit(){this.title=this.dialogData.title,this.alertService=this.dialogData.alertService}addHandler(e){const i=this.dataService.addUniqueId();e.id=i,this.newItem=e;const n=this.timeAlertService.getDaysToAnniversary(e.dateOfBirth);if(this.checkTimeAlert(n,"Birthday"),e.vaccinationDate){const o=this.timeAlertService.getCountEndTime(e.vaccinationDate);this.checkTimeAlert(o,"Vaccination Date")}this.dataService.add(this.newItem)}checkTimeAlert(e,i){e<=30&&this.alertService.addAlert(this.title,this.newItem.id,this.newItem.species,this.newItem.name,e,i)}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(l.so),t.Y36(l.WI),t.Y36(d),t.Y36(u.X))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-add-pet-dialog"]],decls:1,vars:1,consts:[[3,"title","submitFormEvent"]],template:function(e,i){1&e&&(t.TgZ(0,"app-pet-form",0),t.NdJ("submitFormEvent",function(o){return i.addHandler(o)}),t.qZA()),2&e&&t.Q6J("title",i.title)},dependencies:[A]}),a})(),b=(()=>{class a{constructor(e,i,n,o){this.dialogRef=e,this.dialogData=i,this.dataService=n,this.timeAlertService=o}ngOnInit(){this.title=this.dialogData.title,this.pet=this.dialogData.pet,this.alertService=this.dialogData.alertService}updateHandler(e){e.id=this.pet.id;const i=this.timeAlertService.getDaysToAnniversary(e.dateOfBirth);if(this.updateTimeAlert(i,"Birthday",e),e.vaccinationDate){const n=this.timeAlertService.getCountEndTime(e.vaccinationDate);this.updateTimeAlert(n,"Vaccination Date",e)}this.dataService.update(e)}updateTimeAlert(e,i,n){e<=30?this.alertService.updateAlert(this.title,this.pet.id,n.species,n.name,e,i):this.alertService.deleteAlertByItem(this.title,this.pet.id,i)}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(l.so),t.Y36(l.WI),t.Y36(d),t.Y36(u.X))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-update-pet-dialog"]],decls:1,vars:2,consts:[[3,"title","data","submitFormEvent"]],template:function(e,i){1&e&&(t.TgZ(0,"app-pet-form",0),t.NdJ("submitFormEvent",function(o){return i.updateHandler(o)}),t.qZA()),2&e&&t.Q6J("title",i.title)("data",i.pet)}}),a})();var O=r(7706),E=r(9132);function I(a,s){1&a&&(t.TgZ(0,"mat-icon"),t._uU(1,"favorite"),t.qZA())}function U(a,s){1&a&&(t.TgZ(0,"mat-icon"),t._uU(1,"favorite_border"),t.qZA())}function L(a,s){if(1&a&&(t.TgZ(0,"div",1),t.YNc(1,I,2,0,"mat-icon",2),t.YNc(2,U,2,0,"mat-icon",2),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.numberRangeArray),t.xp6(1),t.Q6J("ngForOf",e.numberEmptyArray)}}let Y=(()=>{class a{constructor(){this.numberEmptyArray=[],this.numberRangeArray=[]}ngOnInit(){this.numberRangeArray=new Array(this.range),this.numberEmptyArray=new Array(this.numberAll-this.range)}}return a.\u0275fac=function(e){return new(e||a)},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-stars"]],inputs:{numberAll:"numberAll",range:"range"},decls:1,vars:1,consts:[["class","favorite-wrap",4,"ngIf"],[1,"favorite-wrap"],[4,"ngFor","ngForOf"]],template:function(e,i){1&e&&t.YNc(0,L,3,2,"div",0),2&e&&t.Q6J("ngIf",i.range)},dependencies:[f.Hw,p.sg,p.O5],styles:[".favorite-wrap[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;background-color:var(--color-4);margin-bottom:16px;border-radius:8px;color:var(--color-3);font-size:var(--font-subtitle)}.favorite-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--color-3)}"]}),a})();var w=r(5301);function B(a,s){if(1&a&&(t.TgZ(0,"p")(1,"span"),t._uU(2,"Breed"),t.qZA(),t._uU(3),t.qZA()),2&a){const e=t.oxw();t.xp6(3),t.hij(": ",e.details.breed,"")}}function M(a,s){if(1&a&&(t.TgZ(0,"p")(1,"span"),t._uU(2,"Vaccination Date"),t.qZA(),t._uU(3),t.qZA()),2&a){const e=t.oxw();t.xp6(3),t.hij(": ",e.details.vaccinationDate,"")}}function J(a,s){if(1&a&&(t.ynx(0),t.TgZ(1,"p")(2,"span"),t._uU(3,"Age: "),t.qZA(),t._uU(4),t.qZA(),t.BQk()),2&a){const e=t.oxw();t.xp6(4),t.hij("",e.age," years")}}function N(a,s){1&a&&(t.TgZ(0,"p")(1,"span"),t._uU(2,"Age: "),t.qZA(),t._uU(3,"Bellow year"),t.qZA())}function $(a,s){if(1&a&&(t.TgZ(0,"p")(1,"span"),t._uU(2,"Average Lifespan"),t.qZA(),t._uU(3),t.qZA()),2&a){const e=t.oxw();t.xp6(3),t.hij(": ",e.averageLifespan,"")}}function Q(a,s){if(1&a&&t._UZ(0,"app-stars",9),2&a){const e=t.oxw();t.Q6J("numberAll",e.averageLifespan)("range",e.age)}}function j(a,s){if(1&a&&t._UZ(0,"app-progress",10),2&a){const e=t.oxw();t.Q6J("days",e.vaccinationDate)}}let R=(()=>{class a{constructor(e,i,n){this.timeAlertService=e,this.alertService=i,this.petsService=n,this.subscription=new S.w0}ngOnInit(){this.age=this.timeAlertService.getAge(this.details.dateOfBirth),this.averageLifespan=this.petsService.getAverageLifespan(this.details),this.birthdayDate=this.timeAlertService.getDaysToAnniversary(this.details.dateOfBirth),this.details.vaccinationDate&&(this.vaccinationDate=this.timeAlertService.getCountEndTime(this.details.vaccinationDate)),this.subscription.add(this.alerts$.subscribe(e=>{this.alerts=e})),this.alerts?.length>0?this.updateTimeAlert(this.birthdayDate,"Birthday"):this.alerts?.length>0&&this.details.vaccinationDate&&this.updateTimeAlert(this.vaccinationDate,"Vaccination Date")}updateTimeAlert(e,i){const n=this.alertService.isUpdateAlertNeeded(this.details.id,i,e);n&&e<=30?this.alertService.updateAlert(this.title,this.details.id,this.details.species,this.details.name,e,i):n&&this.alertService.deleteAlertByItem(this.title,this.details.id,i)}ngOnDestroy(){this.subscription.unsubscribe()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(u.X),t.Y36(m.c),t.Y36(d))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-pet-details"]],inputs:{details:"details",alerts$:"alerts$",title:"title"},decls:33,vars:12,consts:[[1,"details"],[4,"ngIf"],[1,"details_life"],[4,"ngIf","ngIfElse"],["bellowYear",""],[3,"numberAll","range",4,"ngIf"],[1,"progress-container"],["title","Birthday",3,"days"],["title","Vaccination Date",3,"days",4,"ngIf"],[3,"numberAll","range"],["title","Vaccination Date",3,"days"]],template:function(e,i){if(1&e&&(t.TgZ(0,"div",0)(1,"div")(2,"p")(3,"span"),t._uU(4,"Name"),t.qZA(),t._uU(5),t.qZA(),t.TgZ(6,"p")(7,"span"),t._uU(8,"Species"),t.qZA(),t._uU(9),t.qZA(),t.YNc(10,B,4,1,"p",1),t.TgZ(11,"p")(12,"span"),t._uU(13,"Sex"),t.qZA(),t._uU(14),t.qZA()(),t.TgZ(15,"div")(16,"p")(17,"span"),t._uU(18,"Birthday"),t.qZA(),t._uU(19),t.qZA(),t.YNc(20,M,4,1,"p",1),t.qZA(),t.TgZ(21,"div",2)(22,"p")(23,"span"),t._uU(24,"Length of life: "),t.qZA()(),t.YNc(25,J,5,1,"ng-container",3),t.YNc(26,N,4,0,"ng-template",null,4,t.W1O),t.YNc(28,$,4,1,"p",1),t.qZA(),t.YNc(29,Q,1,2,"app-stars",5),t.TgZ(30,"div",6),t._UZ(31,"app-progress",7),t.YNc(32,j,1,1,"app-progress",8),t.qZA()()),2&e){const n=t.MAs(27);t.xp6(5),t.hij(": ",i.details.name,""),t.xp6(4),t.hij(": ",i.details.species,""),t.xp6(1),t.Q6J("ngIf",i.details.breed),t.xp6(4),t.hij(": ",i.details.sex,""),t.xp6(5),t.hij(": ",i.details.dateOfBirth,""),t.xp6(1),t.Q6J("ngIf",i.details.vaccinationDate),t.xp6(5),t.Q6J("ngIf",i.age>0)("ngIfElse",n),t.xp6(3),t.Q6J("ngIf",i.averageLifespan),t.xp6(1),t.Q6J("ngIf",i.age<=i.averageLifespan),t.xp6(2),t.Q6J("days",i.birthdayDate),t.xp6(1),t.Q6J("ngIf",i.details.vaccinationDate)}},dependencies:[p.O5,Y,w.t],styles:["[_nghost-%COMP%]{width:100%;margin-top:20px}.details[_ngcontent-%COMP%]{display:flex;color:var(--color-text);min-height:100px}.details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:700}.details[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2), .details[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3){margin-left:40px}.details_life[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-right:30px}"]}),a})();function q(a,s){if(1&a&&t._UZ(0,"app-pet-details",2),2&a){const e=s.element,i=t.oxw();t.Q6J("title",i.title)("details",e)("alerts$",i.alerts$)}}const H=[{path:"",component:(()=>{class a{constructor(e,i,n,o){this.dialog=e,this.menuService=i,this.dataService=n,this.alertService=o,this.headers=["species","name"],this.subscription=new S.w0}ngOnInit(){this.getSectionInfo(F.Q.Pets),this.alertService.getAlerts(this.title),this.dataService.getList(),this.data$=this.dataService.data$,this.alerts$=this.alertService.categoryAlerts$}getSectionInfo(e){this.menuService.getSections(),this.sections=this.menuService.takeSections(),this.title=this.sections[e].title;const i=this.sections.find(n=>n.title===this.title);i&&(this.icon=i.icon)}addDialog(){this.dialog.open(x,{width:"500px",data:{alertService:this.alertService,title:this.title}})}editDialog(e){this.dialog.open(b,{width:"500px",data:{title:this.title,pet:e,alertService:this.alertService}})}deleteDialog(e){const i=this.dialog.open(v.W,{data:{title:`Delete ${e.name}`,description:`Are you sure you want to delete ${e.name} ${e.species}`,type:"submit"}});this.subscription.add(i.afterClosed().subscribe(n=>{"submit"===n&&(this.alertService.deleteAlert(this.title,e.id),this.dataService.delete(e))}))}ngOnDestroy(){this.subscription.unsubscribe()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(l.uw),t.Y36(O.h),t.Y36(d),t.Y36(m.c))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-pets"]],features:[t._Bn([m.c])],decls:3,vars:5,consts:[[3,"title","icon","alerts$","data$","columnsToDisplay","addEvent","editEvent","deleteEvent"],["detailsTemplate",""],[3,"title","details","alerts$"]],template:function(e,i){1&e&&(t.TgZ(0,"app-table",0),t.NdJ("addEvent",function(){return i.addDialog()})("editEvent",function(o){return i.editDialog(o)})("deleteEvent",function(o){return i.deleteDialog(o)}),t.YNc(1,q,1,3,"ng-template",null,1,t.W1O),t.qZA()),2&e&&t.Q6J("title",i.title)("icon",i.icon)("alerts$",i.alerts$)("data$",i.data$)("columnsToDisplay",i.headers)},dependencies:[E.a,R]}),a})()}];let X=(()=>{class a{}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[y.Bz.forChild(H),y.Bz]}),a})(),V=(()=>{class a{}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[X,p.ez,T.m,D.Nh,f.Ps,l.Is]}),a})();t.B6R(b,[A],[])}}]);