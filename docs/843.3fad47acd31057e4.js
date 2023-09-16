"use strict";(self.webpackChunkDashboard=self.webpackChunkDashboard||[]).push([[843],{3843:(B,g,r)=>{r.r(g),r.d(g,{CarsModule:()=>_});var u=r(6814),y=r(4104),v=r(617),l=r(7700),t=r(5879),D=r(5619),c=r(6223),T=r(4004),d=r(4052),f=r(8209),I=r(9862);let p=(()=>{class a{constructor(e,i){this.http=e,this.dialog=i,this.dataList=[],this.dataListSubject=new D.X([]),this.data$=this.dataListSubject.asObservable(),this.formFields=[{type:d.f.Select,label:"Brand",name:"brand",options:["Audi","BMW","Chevrolet","Ford","Honda","Hyundai","Mercedes","Nissan","Toyota","Volkswagen","Fiat","Renault","Citroen","Suzuki","Another"],validations:[c.kI.required]},{type:d.f.Text,label:"Model",name:"model",validations:[c.kI.required]},{type:d.f.Text,label:"Registration number",name:"registrationNumber"},{type:d.f.Number,label:"Production Year",name:"productionYear",validations:[c.kI.required]},{type:d.f.Select,label:"Color",name:"color",options:["Red","Black","Blue","Green","White","Yellow","Silver","Gray"]},{type:d.f.Date,label:"Insurance Date",name:"insuranceDate",validations:[c.kI.required]},{type:d.f.Date,label:"Car Inspection",name:"carInspection",validations:[c.kI.required]},{type:d.f.Number,label:"Engine Capacity",name:"engineCapacity"}],this.url="/cars/carsList.json"}getList(){this.http.get(this.url).subscribe({next:e=>{const i=null!==e?e:[];this.dataList=i,this.dataListSubject.next(i)},error:()=>{this.dialog.open(f.W,{data:{title:"Error",description:"Error while fetching car data",type:"error"}})}})}addUniqueId(){return(0,T.Z)()}add(e){const i=[...this.dataList,e];this.dataListSubject.next(i),this.http.put(this.url,i).subscribe(()=>{this.dataList=i})}update(e){const i=[...this.dataList],n=i.findIndex(o=>o.id===e.id);-1!==n&&(i[n]=e,this.dataListSubject.next(i),this.http.put(this.url,i).subscribe(()=>{this.dataList=i}))}delete(e){const i=[...this.dataList],n=i.findIndex(o=>o.id===e.id);-1!==n&&(i.splice(n,1),this.dataListSubject.next(i),this.http.put(this.url,i).subscribe(()=>{this.dataList=i}))}getFormFields(){return this.formFields.slice()}}return a.\u0275fac=function(e){return new(e||a)(t.LFG(I.eN),t.LFG(l.uw))},a.\u0275prov=t.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();var Z=r(1424);let C=(()=>{class a{constructor(e,i){this.dialogRef=e,this.dataService=i,this.submitFormEvent=new t.vpe}ngOnInit(){this.formFields=this.dataService.getFormFields()}closeHandler(){this.dialogRef.close()}submitHandler(e){this.submitFormEvent.emit(e)}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(l.so),t.Y36(p))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-car-form"]],inputs:{data:"data"},outputs:{submitFormEvent:"submitFormEvent"},decls:4,vars:3,consts:[["mat-dialog-title","",1,"title"],["mat-dialog-content",""],[3,"data","fields","submitEvent","closeEvent"]],template:function(e,i){1&e&&(t.TgZ(0,"p",0),t._uU(1),t.qZA(),t.TgZ(2,"div",1)(3,"app-create-form",2),t.NdJ("submitEvent",function(o){return i.submitHandler(o)})("closeEvent",function(){return i.closeHandler()}),t.qZA()()),2&e&&(t.xp6(1),t.Oqu(i.data?"Edit "+i.data.brand+" "+i.data.model:"Add new car"),t.xp6(2),t.Q6J("data",i.data)("fields",i.formFields))},dependencies:[Z.I,l.uh,l.xY],styles:[".title[_ngcontent-%COMP%]{color:var(--color-text-light)}"]}),a})();var h=r(5819);let S=(()=>{class a{constructor(e,i,n,o){this.dialogRef=e,this.dialogData=i,this.dataService=n,this.timeAlertService=o}ngOnInit(){this.title=this.dialogData.title,this.car=this.dialogData.car,this.alertService=this.dialogData.alertService}updateHandler(e){e.id=this.car.id;const i=this.timeAlertService.getCountEndTime(e.insuranceDate);this.updateTimeAlert(i,"Insurance",e);const n=this.timeAlertService.getCountEndTime(e.carInspection);this.updateTimeAlert(n,"Inspection",e),this.dataService.update(e)}updateTimeAlert(e,i,n){e<=30?this.alertService.updateAlert(this.title,this.car.id,n.brand,n.model,e,i):this.alertService.deleteAlertByItem(this.title,this.car.id,i)}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(l.so),t.Y36(l.WI),t.Y36(p),t.Y36(h.X))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-update-car-dialog"]],decls:1,vars:1,consts:[[3,"data","submitFormEvent"]],template:function(e,i){1&e&&(t.TgZ(0,"app-car-form",0),t.NdJ("submitFormEvent",function(o){return i.updateHandler(o)}),t.qZA()),2&e&&t.Q6J("data",i.car)}}),a})();var E=r(279),A=r(4190);let F=(()=>{class a{constructor(e,i,n,o){this.dialogRef=e,this.dialogData=i,this.dataService=n,this.timeAlertService=o}ngOnInit(){this.title=this.dialogData.title,this.alertService=this.dialogData.alertService}addHandler(e){const i=this.dataService.addUniqueId();e.id=i,this.newItem=e;const n=this.timeAlertService.getCountEndTime(e.carInspection),o=this.timeAlertService.getCountEndTime(e.insuranceDate);this.checkTimeAlert(n,"Inspection"),this.checkTimeAlert(o,"Insurance"),this.dataService.add(this.newItem)}checkTimeAlert(e,i){e<=30&&this.alertService.addAlert(this.title,this.newItem.id,this.newItem.brand,this.newItem.model,e,i)}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(l.so),t.Y36(l.WI),t.Y36(p),t.Y36(h.X))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-add-car-dialog"]],decls:1,vars:1,consts:[[3,"title","submitFormEvent"]],template:function(e,i){1&e&&(t.TgZ(0,"app-car-form",0),t.NdJ("submitFormEvent",function(o){return i.addHandler(o)}),t.qZA()),2&e&&t.Q6J("title",i.title)},dependencies:[C]}),a})();var b=r(7394),m=r(9758),U=r(6758),Y=r(7706),x=r(9132),L=r(5301);function M(a,s){if(1&a&&(t.TgZ(0,"p")(1,"span"),t._uU(2,"Engine Power"),t.qZA(),t._uU(3),t.qZA()),2&a){const e=t.oxw();t.xp6(3),t.hij(": ",e.details.registrationNumber,"")}}function O(a,s){if(1&a&&(t.TgZ(0,"p")(1,"span"),t._uU(2,"Engine Capacity"),t.qZA(),t._uU(3),t.qZA()),2&a){const e=t.oxw();t.xp6(3),t.hij(": ",e.details.engineCapacity,"")}}function w(a,s){if(1&a&&(t.TgZ(0,"p")(1,"span"),t._uU(2,"Color"),t.qZA(),t._uU(3),t.qZA()),2&a){const e=t.oxw();t.xp6(3),t.hij(": ",e.details.color,"")}}const $=function(a){return{color:a}};let j=(()=>{class a{constructor(e,i){this.timeAlertService=e,this.alertService=i,this.subscription=new b.w0}ngOnInit(){this.insuranceDate=this.timeAlertService.getCountEndTime(this.details.insuranceDate),this.inspectionDate=this.timeAlertService.getCountEndTime(this.details.carInspection),this.subscription.add(this.alerts$.subscribe(e=>{this.alerts=e})),this.alerts?.length>0&&(this.updateTimeAlert(this.insuranceDate,"Insurance"),this.updateTimeAlert(this.inspectionDate,"Inspection"))}updateTimeAlert(e,i){const n=this.alertService.isUpdateAlertNeeded(this.details.id,i,e);n&&e<=30?this.alertService.updateAlert(this.title,this.details.id,this.details.brand,this.details.model,e,i):n&&this.alertService.deleteAlertByItem(this.title,this.details.id,i)}ngOnDestroy(){this.subscription.unsubscribe()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(h.X),t.Y36(m.c))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-car-details"]],inputs:{details:"details",alerts$:"alerts$",title:"title"},decls:32,vars:13,consts:[[1,"details"],[4,"ngIf"],[1,"car"],[3,"ngStyle"],[1,"progress-container"],["title","Insurance",3,"days"],["title","Car Inspection",3,"days"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"div")(2,"p")(3,"span"),t._uU(4,"Brand"),t.qZA(),t._uU(5),t.qZA(),t.TgZ(6,"p")(7,"span"),t._uU(8,"Model"),t.qZA(),t._uU(9),t.qZA(),t.YNc(10,M,4,1,"p",1),t.TgZ(11,"p")(12,"span"),t._uU(13,"Production Year"),t.qZA(),t._uU(14),t.qZA()(),t.TgZ(15,"div")(16,"p")(17,"span"),t._uU(18,"Insurance Date"),t.qZA(),t._uU(19),t.qZA(),t.TgZ(20,"p")(21,"span"),t._uU(22,"Car Inspection"),t.qZA(),t._uU(23),t.qZA(),t.YNc(24,O,4,1,"p",1),t.qZA(),t.TgZ(25,"div",2)(26,"mat-icon",3),t._uU(27,"directions_car"),t.qZA(),t.YNc(28,w,4,1,"p",1),t.qZA(),t.TgZ(29,"div",4),t._UZ(30,"app-progress",5)(31,"app-progress",6),t.qZA()()),2&e&&(t.xp6(5),t.hij(": ",i.details.brand,""),t.xp6(4),t.hij(": ",i.details.model,""),t.xp6(1),t.Q6J("ngIf",i.details.registrationNumber),t.xp6(4),t.hij(": ",i.details.productionYear,""),t.xp6(5),t.hij(": ",i.details.insuranceDate,""),t.xp6(4),t.hij(": ",i.details.carInspection,""),t.xp6(1),t.Q6J("ngIf",i.details.engineCapacity),t.xp6(2),t.Q6J("ngStyle",t.VKq(11,$,i.details.color)),t.xp6(2),t.Q6J("ngIf",i.details.color),t.xp6(2),t.Q6J("days",i.insuranceDate),t.xp6(1),t.Q6J("days",i.inspectionDate))},dependencies:[u.O5,u.PC,L.t,v.Hw],styles:["[_nghost-%COMP%]{width:100%;margin-top:20px}.details[_ngcontent-%COMP%]{display:flex;color:var(--color-text);min-height:100px}.details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:700}.details[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2){margin-left:40px}.car[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;width:200px}.car[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:80px;height:80px;font-size:80px;color:var(--color-2)}"]}),a})();function J(a,s){if(1&a&&t._UZ(0,"app-car-details",2),2&a){const e=s.element,i=t.oxw();t.Q6J("title",i.title)("details",e)("alerts$",i.alerts$)}}const N=[{path:"",component:(()=>{class a{constructor(e,i,n,o){this.dialog=e,this.menuService=i,this.dataService=n,this.alertService=o,this.headers=["brand","model"],this.subscription=new b.w0}ngOnInit(){this.getSectionInfo(U.Q.Cars),this.alertService.getAlerts(this.title),this.dataService.getList(),this.data$=this.dataService.data$,this.alerts$=this.alertService.categoryAlerts$}getSectionInfo(e){this.menuService.getSections(),this.sections=this.menuService.takeSections(),this.title=this.sections[e].title;const i=this.sections.find(n=>n.title===this.title);i&&(this.icon=i.icon)}addDialog(){this.dialog.open(F,{width:"500px",data:{alertService:this.alertService,title:this.title}})}editDialog(e){this.dialog.open(S,{width:"500px",data:{title:this.title,car:e,alertService:this.alertService}})}deleteDialog(e){const i=this.dialog.open(f.W,{data:{title:`Delete ${e.brand}`,description:`Are you sure you want to delete ${e.brand} ${e.model}`,type:"submit"}});this.subscription.add(i.afterClosed().subscribe(n=>{"submit"===n&&(this.alertService.deleteAlert(this.title,e.id),this.dataService.delete(e))}))}ngOnDestroy(){this.subscription.unsubscribe()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(l.uw),t.Y36(Y.h),t.Y36(p),t.Y36(m.c))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-cars"]],features:[t._Bn([m.c])],decls:3,vars:5,consts:[[3,"title","icon","alerts$","data$","columnsToDisplay","addEvent","editEvent","deleteEvent"],["detailsTemplate",""],[3,"title","details","alerts$"]],template:function(e,i){1&e&&(t.TgZ(0,"app-table",0),t.NdJ("addEvent",function(){return i.addDialog()})("editEvent",function(o){return i.editDialog(o)})("deleteEvent",function(o){return i.deleteDialog(o)}),t.YNc(1,J,1,3,"ng-template",null,1,t.W1O),t.qZA()),2&e&&t.Q6J("title",i.title)("icon",i.icon)("alerts$",i.alerts$)("data$",i.data$)("columnsToDisplay",i.headers)},dependencies:[x.a,j]}),a})()}];let P=(()=>{class a{}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[A.Bz.forChild(N),A.Bz]}),a})(),_=(()=>{class a{}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[P,u.ez,E.m,y.Nh,v.Ps,l.Is]}),a})();t.B6R(S,[C],[])}}]);