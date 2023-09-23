"use strict";(self.webpackChunkDashboard=self.webpackChunkDashboard||[]).push([[378],{8378:(Et,k,s)=>{s.r(k),s.d(k,{MainModule:()=>Zt});var p=s(6814),_=s(4190),t=s(5879),y=s(7706),T=s(2885),Y=s(3336),J=s(4183),N=s(4444),B=s(603),U=s(8406),$=s(1683),u=s(617),v=s(7394),S=s(8645),F=s(3620),g=s(8209),b=s(5619),M=s(4004),w=s(9862),l=s(7700);let Q=(()=>{class o{constructor(n,e){this.http=n,this.dialog=e,this.dataList=[],this.dataListSubject=new b.X([]),this.data$=this.dataListSubject.asObservable(),this.url="/stickers.json"}getList(){this.http.get(this.url).subscribe({next:n=>{const e=null!==n?n:[];this.dataList=e,this.dataListSubject.next(e)},error:()=>{this.dialog.open(g.W,{data:{title:"Error",description:"Error while fetching stickers",type:"error"}})}})}add(){const e={id:(0,M.Z)(),content:"",dragPosition:{x:this.dataList.length>0?10*this.dataList.length:5,y:this.dataList.length>0?10*this.dataList.length:5}},i=[...this.dataList,e];this.dataListSubject.next(i),this.http.put(this.url,i).subscribe(()=>{this.dataList=i})}update(n){const e=[...this.dataList],i=e.findIndex(r=>r.id===n.id);-1!==i&&(e[i]=n,this.dataListSubject.next(e),this.http.put(this.url,e).subscribe(()=>{this.dataList=e}))}delete(n){const e=[...this.dataList],i=e.findIndex(r=>r.id===n.id);e.splice(i,1),this.dataListSubject.next(e),this.dataList=e,this.http.put(this.url,e)}}return o.\u0275fac=function(n){return new(n||o)(t.LFG(w.eN),t.LFG(l.uw))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var H=s(6236),O=s(1771),d=s(6223);function j(o,a){if(1&o&&(t.TgZ(0,"div",9)(1,"p",10),t._uU(2),t.qZA()()),2&o){const n=t.oxw(2);t.xp6(2),t.Oqu(n.notes.length)}}function q(o,a){if(1&o&&(t.TgZ(0,"div",7),t.YNc(1,j,3,1,"div",8),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",!n.open)}}function z(o,a){1&o&&(t.TgZ(0,"mat-icon"),t._uU(1,"arrow_left"),t.qZA())}function R(o,a){1&o&&(t.TgZ(0,"mat-icon"),t._uU(1,"arrow_right"),t.qZA())}function G(o,a){if(1&o){const n=t.EpF();t.ynx(0),t.TgZ(1,"div",11),t.NdJ("cdkDragEnded",function(i){const c=t.CHM(n).$implicit,P=t.oxw();return t.KtG(P.onDragEnd(i,c))}),t.TgZ(2,"div",12)(3,"mat-icon"),t._uU(4,"control_camera"),t.qZA(),t.TgZ(5,"mat-icon",13),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.onDeleteNote(r))}),t._uU(6,"delete_outline"),t.qZA()(),t.TgZ(7,"textarea",14),t.NdJ("ngModelChange",function(i){const c=t.CHM(n).$implicit;return t.KtG(c.content=i)})("ngModelChange",function(){const r=t.CHM(n).$implicit,c=t.oxw();return t.KtG(c.onNoteContentChange(r))}),t.qZA()(),t.BQk()}if(2&o){const n=a.$implicit;t.xp6(1),t.Q6J("cdkDragFreeDragPosition",n.dragPosition),t.xp6(6),t.Q6J("ngModel",n.content)}}let W=(()=>{class o{constructor(n,e){this.dataService=n,this.dialog=e,this.openStickersEvent=new t.vpe,this.open=!0,this.subscription=new v.w0,this.updateNoteSubject=new S.x,this.deleteEmptyNoteSubject=new S.x}ngOnInit(){this.dataService.getList(),this.subscription.add(this.dataService.data$.subscribe(n=>{this.notes=n})),this.subscription.add(this.updateNoteSubject.pipe((0,F.b)(3e3)).subscribe(n=>{this.dataService.update(n)})),this.subscription.add(this.deleteEmptyNoteSubject.pipe((0,F.b)(3e3)).subscribe(n=>{this.onDeleteNote(n)})),setTimeout(()=>{this.open=!1},2e3)}onDeleteNote(n){this.dataService.delete(n)}onDragEnd(n,e){const i=n.source.getFreeDragPosition().x,r=n.source.getFreeDragPosition().y;e.dragPosition={x:i,y:r},this.dataService.update(e)}onNoteContentChange(n){""===n.content?this.deleteEmptyNoteSubject.next(n):this.updateNoteSubject.next(n)}onAddNote(){this.notes.length<10?this.dataService.add():this.dialog.open(g.W,{data:{title:"Focus on the Top 10 Priorities",description:"Efficient Task Management advice: Limit the tasks on the board, focusing on the most important and high-priority ones.",type:"info"}})}ngOnDestroy(){this.subscription.unsubscribe()}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(Q),t.Y36(l.uw))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-stickers"]],outputs:{openStickersEvent:"openStickersEvent"},decls:8,vars:6,consts:[[3,"ngClass"],[3,"ngClass","click"],["class","alert",4,"ngIf"],[4,"ngIf"],[1,"wrap_container"],[3,"addEvent"],[4,"ngFor","ngForOf"],[1,"alert"],["class","alert_ring",4,"ngIf"],[1,"alert_ring"],[1,"alert_number"],["cdkDragBoundary",".wrap_container","cdkDrag","",1,"box",3,"cdkDragFreeDragPosition","cdkDragEnded"],[1,"box_actions"],[3,"click"],[3,"ngModel","ngModelChange"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t.NdJ("click",function(){return e.open=!e.open}),t.YNc(2,q,2,1,"div",2),t.YNc(3,z,2,0,"mat-icon",3),t.YNc(4,R,2,0,"mat-icon",3),t.qZA(),t.TgZ(5,"div",4)(6,"app-add-button",5),t.NdJ("addEvent",function(){return e.onAddNote()}),t.qZA(),t.YNc(7,G,8,2,"ng-container",6),t.qZA()()),2&n&&(t.Q6J("ngClass",e.open?"wrap":"wrap wrap--close"),t.xp6(1),t.Q6J("ngClass",e.open?"arrow":"arrow arrow--left"),t.xp6(1),t.Q6J("ngIf",e.notes.length>0),t.xp6(1),t.Q6J("ngIf",!e.open),t.xp6(1),t.Q6J("ngIf",e.open),t.xp6(3),t.Q6J("ngForOf",e.notes))},dependencies:[p.mk,p.sg,p.O5,H.Zt,u.Hw,O.L,d.Fj,d.JJ,d.On],styles:[".wrap[_ngcontent-%COMP%]{position:relative;background-color:var(--color-1);border-radius:2px;height:100%;width:20vw;margin:0 30px 0 10px;transition:.5s}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]{margin:0;width:100vw;height:calc(100vh - 48px)}}@media (orientation: landscape){.wrap--close[_ngcontent-%COMP%]{width:20px}}.wrap[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]{position:absolute;top:20%;right:42px;cursor:pointer}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]{display:none}}.wrap[_ngcontent-%COMP%]   .arrow--left[_ngcontent-%COMP%]{left:-56px}.wrap[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{position:absolute;color:var(--color-1);font-size:100px;width:100px;height:100px}.wrap[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%]{position:absolute;top:24px;left:35px;height:30px;width:30px;z-index:1}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%]{display:none}}.wrap[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]   .alert_ring[_ngcontent-%COMP%]{margin:0 auto;width:24px;height:24px;border-radius:50%;background-color:var(--color-alert);box-shadow:#0003 0 -1px 7px 1px,inset #8d2828 0 -1px 9px,#ff000080 0 2px 12px;animation:alert 1s infinite}.wrap[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]   .alert_number[_ngcontent-%COMP%]{color:#fff;position:absolute;top:14px;right:-2px}.wrap_container[_ngcontent-%COMP%]{position:absolute;overflow:hidden;inset:10px;border-radius:2px;box-shadow:inset 1px 1px 7px 2px #000;background-color:var(--color-2)}.wrap[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{position:absolute;width:120px;height:120px;border:solid 1px var(--color-grey);color:#000000de;cursor:move;background-color:var(--color-3);border-radius:4px;margin-right:25px;z-index:1;box-sizing:border-box;transition:box-shadow .2s cubic-bezier(0,0,.2,1);box-shadow:1px 1px 8px #000000a1}.wrap[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]:active{box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.wrap[_ngcontent-%COMP%]   .box_actions[_ngcontent-%COMP%]{position:absolute;display:flex;justify-content:space-between;padding:2px 10px 0;top:0;height:22px;width:100%;background-color:#ffffff56}.wrap[_ngcontent-%COMP%]   .box_actions[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--color-1);font-size:16px}.wrap[_ngcontent-%COMP%]   .box_actions[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:nth-child(2){cursor:pointer}.wrap[_ngcontent-%COMP%]   .box_actions[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:nth-child(2):hover{color:var(--color-text-light)}.wrap[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{position:absolute;inset:20px 0 0;border:none;background:transparent;color:var(--color-text);font-size:inherit;padding:5px;resize:none;text-align:center;overflow:hidden}"]}),o})();var X=s(4664),K=s(5940);function V(o,a){1&o&&(t.ynx(0),t._UZ(1,"mat-spinner"),t.BQk())}function tt(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"div",5),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw(3);return t.KtG(c.goToPage(r))}),t.TgZ(1,"p"),t._uU(2),t.qZA()()}if(2&o){const n=a.$implicit;t.Q6J("ngClass",n.deadline>=20?"alert--low":n.deadline>=10?"alert--medium":"alert--high"),t.xp6(2),t.Oqu(n.message)}}function nt(o,a){if(1&o&&(t.ynx(0),t.YNc(1,tt,3,2,"div",4),t.BQk()),2&o){const n=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",n.alerts)}}function et(o,a){1&o&&(t.TgZ(0,"p"),t._uU(1,"No upcoming important dates"),t.qZA())}function ot(o,a){if(1&o&&(t.YNc(0,nt,2,1,"ng-container",1),t.YNc(1,et,2,0,"ng-template",null,3,t.W1O)),2&o){const n=t.MAs(2),e=t.oxw();t.Q6J("ngIf",e.alerts.length>0)("ngIfElse",n)}}const it=["*"];let at=(()=>{class o{constructor(n,e,i){this.alertsService=n,this.router=e,this.menuService=i,this.alerts=[],this.loading=!0}ngOnInit(){this.alertsService.allAlerts$.pipe((0,X.w)(n=>(this.alerts=this.combineAlerts(null!==n?n:{persons:[],cars:[],pets:[],events:[]}),this.loading=!1,this.alertsService.allAlerts$))).subscribe()}combineAlerts(n){const e=[];for(const i in n)e.push(...n[i]);return e.sort((i,r)=>i.deadline-r.deadline),e}goToPage(n){this.menuService.setCurrentIndex(1),this.menuService.setExpandedRowId(n.parentId),this.router.navigate([`/dashboard/lists/${n.category}`])}ngOnDestroy(){}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(T.m),t.Y36(_.F0),t.Y36(y.h))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-upcoming-dates"]],ngContentSelectors:it,decls:5,vars:2,consts:[[1,"wrap"],[4,"ngIf","ngIfElse"],["showAlerts",""],["noAlerts",""],["class","alert",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"alert",3,"ngClass","click"]],template:function(n,e){if(1&n&&(t.F$t(),t.Hsn(0),t.TgZ(1,"div",0),t.YNc(2,V,2,0,"ng-container",1),t.YNc(3,ot,3,2,"ng-template",null,2,t.W1O),t.qZA()),2&n){const i=t.MAs(4);t.xp6(2),t.Q6J("ngIf",e.loading)("ngIfElse",i)}},dependencies:[p.mk,p.sg,p.O5,K.Ou],styles:['.wrap[_ngcontent-%COMP%]{margin:90px 20px 10px;padding:14px;height:calc(100% - 100px);overflow-y:auto;box-shadow:inset 1px 3px 15px #000}.alert[_ngcontent-%COMP%]{padding:10px 10px 10px 20px;border-radius:4px;margin-bottom:4px;color:var(--color-text-light);cursor:pointer}.alert--high[_ngcontent-%COMP%]{position:relative;border:1px solid #ff0000;background-color:#ff000060;border-left:9px solid #ff0000}.alert--high[_ngcontent-%COMP%]:after{position:absolute;content:"";top:50%;left:0;transform:translateY(-50%);border-left:10px solid #ff0000;border-bottom:10px solid transparent;border-top:10px solid transparent}.alert--medium[_ngcontent-%COMP%]{border:1px solid #FF4040;background-color:#ff404050;border-left:9px solid #FF4040}.alert--medium[_ngcontent-%COMP%]:after{position:absolute;content:"";top:50%;left:0;transform:translateY(-50%);border-left:10px solid #FF4040;border-bottom:10px solid transparent;border-top:10px solid transparent}.alert--low[_ngcontent-%COMP%]{border:1px solid #FF7070;background-color:#ff70703b;border-left:9px solid #FF7070}.alert--low[_ngcontent-%COMP%]:after{position:absolute;content:"";top:50%;left:0;transform:translateY(-50%);border-left:10px solid #FF7070;border-bottom:10px solid transparent;border-top:10px solid transparent}.alert[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}']}),o})();var h=s(2596),m=s(4052);let x=(()=>{class o{constructor(n,e){this.http=n,this.dialog=e,this.dataList=[],this.dataListSubject=new b.X([]),this.data$=this.dataListSubject.asObservable(),this.formFields=[{type:m.f.Text,label:"Name",name:"name",validations:[d.kI.required]},{type:m.f.Text,label:"Url (https://...)",name:"url",validations:[d.kI.required]},{type:m.f.Select,label:"Category",name:"category",options:["Social","Home","Phone","Music","School","Entertiment","Forum","Work","Shop","Another"],validations:[d.kI.required]}],this.url="/links/linksList.json"}getList(){this.http.get(this.url).subscribe({next:n=>{const e=null!==n?n:[];this.dataList=e,this.dataListSubject.next(e)},error:()=>{this.dialog.open(g.W,{data:{title:"Error",description:"Error while fetching links data",type:"error"}})}})}addUniqueId(){return(0,M.Z)()}add(n){const e=[...this.dataList,n];this.dataListSubject.next(e),this.http.put(this.url,e).subscribe(()=>{this.dataList=e})}update(n){const e=[...this.dataList],i=e.findIndex(r=>r.id===n.id);-1!==i&&(e[i]=n,this.dataListSubject.next(e),this.http.put(this.url,e).subscribe(()=>{this.dataList=e}))}delete(n){const e=[...this.dataList],i=e.findIndex(r=>r.id===n.id);-1!==i&&(e.splice(i,1),this.dataListSubject.next(e),this.http.put(this.url,e).subscribe(()=>{this.dataList=e}))}getFormFields(){return this.formFields.slice()}getIcon(n){switch(n){case"Social":return"alternate_email";case"Home":return"home";case"Music":return"music_note";case"School":return"school";case"Phone":return"phone";case"Work":return"work";case"Shop":return"shopping_cart";case"Forum":return"forum";case"Entertiment":return"casino";default:return"link"}}}return o.\u0275fac=function(n){return new(n||o)(t.LFG(w.eN),t.LFG(l.uw))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var Z=s(1424);let L=(()=>{class o{constructor(n,e){this.dialogRef=n,this.dataService=e,this.submitFormEvent=new t.vpe}ngOnInit(){this.formFields=this.dataService.getFormFields()}closeHandler(){this.dialogRef.close()}submitHandler(n){this.submitFormEvent.emit(n)}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(l.so),t.Y36(x))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-link-form"]],inputs:{data:"data",title:"title"},outputs:{submitFormEvent:"submitFormEvent"},decls:4,vars:3,consts:[["mat-dialog-title","",1,"title"],["mat-dialog-content",""],[3,"data","fields","submitEvent","closeEvent"]],template:function(n,e){1&n&&(t.TgZ(0,"p",0),t._uU(1),t.qZA(),t.TgZ(2,"div",1)(3,"app-create-form",2),t.NdJ("submitEvent",function(r){return e.submitHandler(r)})("closeEvent",function(){return e.closeHandler()}),t.qZA()()),2&n&&(t.xp6(1),t.Oqu(e.data?"Edit "+e.data.name:"Add new "+e.title.slice(0,-1)),t.xp6(2),t.Q6J("data",e.data)("fields",e.formFields))},dependencies:[Z.I,l.uh,l.xY],styles:[".title[_ngcontent-%COMP%]{color:var(--color-text-light)}"]}),o})(),rt=(()=>{class o{constructor(n,e,i){this.dialogRef=n,this.dialogData=e,this.dataService=i}ngOnInit(){this.title=this.dialogData.title}addHandler(n){const e=this.dataService.addUniqueId();n.id=e,this.newItem=n,this.dataService.add(this.newItem)}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(l.so),t.Y36(l.WI),t.Y36(x))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-add-link-dialog"]],decls:1,vars:1,consts:[[3,"title","submitFormEvent"]],template:function(n,e){1&n&&(t.TgZ(0,"app-link-form",0),t.NdJ("submitFormEvent",function(r){return e.addHandler(r)}),t.qZA()),2&n&&t.Q6J("title",e.title)},dependencies:[L]}),o})(),A=(()=>{class o{constructor(n,e,i){this.dialogRef=n,this.dialogData=e,this.dataService=i}ngOnInit(){this.title=this.dialogData.title,this.link=this.dialogData.link}updateHandler(n){n.id=this.link.id,this.dataService.update(n)}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(l.so),t.Y36(l.WI),t.Y36(x))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-update-link-dialog"]],decls:1,vars:2,consts:[[3,"title","data","submitFormEvent"]],template:function(n,e){1&n&&(t.TgZ(0,"app-link-form",0),t.NdJ("submitFormEvent",function(r){return e.updateHandler(r)}),t.qZA()),2&n&&t.Q6J("title",e.title)("data",e.link)}}),o})();var f=s(6311);function st(o,a){if(1&o){const n=t.EpF();t.ynx(0),t.TgZ(1,"div",4)(2,"a",5)(3,"mat-icon",6),t._uU(4),t.qZA()(),t.TgZ(5,"div",7)(6,"button",8)(7,"mat-icon",9),t._uU(8,"more_vert"),t.qZA()(),t.TgZ(9,"mat-menu",null,10)(11,"button",11),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw(2);return t.KtG(c.editDialog(r))}),t.TgZ(12,"mat-icon"),t._uU(13,"edit"),t.qZA(),t.TgZ(14,"span"),t._uU(15,"Edit link"),t.qZA()(),t.TgZ(16,"button",11),t.NdJ("click",function(){const r=t.CHM(n).$implicit,c=t.oxw(2);return t.KtG(c.deleteDialog(r))}),t.TgZ(17,"mat-icon"),t._uU(18,"delete"),t.qZA(),t.TgZ(19,"span"),t._uU(20,"Delete link"),t.qZA()()()()(),t.BQk()}if(2&o){const n=a.$implicit,e=t.MAs(10),i=t.oxw(2);t.xp6(2),t.Q6J("href",n.url,t.LSH)("matTooltip",n.name),t.xp6(2),t.Oqu(i.getIcon(n.category)),t.xp6(2),t.Q6J("matMenuTriggerFor",e),t.xp6(1),t.Q6J("matMenuTriggerFor",e)}}function ct(o,a){if(1&o&&(t.ynx(0),t.YNc(1,st,21,5,"ng-container",3),t.BQk()),2&o){const n=a.ngIf;t.xp6(1),t.Q6J("ngForOf",n)}}const lt=["*"];let pt=(()=>{class o{constructor(n,e){this.dataService=n,this.dialog=e,this.subscription=new v.w0}ngOnInit(){this.title="links",this.dataService.getList(),this.data$=this.dataService.data$}addDialog(){this.dialog.open(rt,{width:"500px",data:{title:this.title}})}editDialog(n){this.dialog.open(A,{width:"500px",data:{title:this.title,link:n}})}deleteDialog(n){const e=this.dialog.open(g.W,{data:{title:`Delete ${n.name}`,description:`Are you sure you want to delete ${n.name} link`,type:"submit"}});this.subscription.add(e.afterClosed().subscribe(i=>{"submit"===i&&this.dataService.delete(n)}))}getIcon(n){return this.dataService.getIcon(n)}ngOnDestroy(){this.subscription.unsubscribe()}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(x),t.Y36(l.uw))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-links"]],ngContentSelectors:lt,decls:5,vars:3,consts:[[1,"container"],[4,"ngIf"],[3,"addEvent"],[4,"ngFor","ngForOf"],[1,"box"],["target","_blank",1,"box_link",3,"href","matTooltip"],[1,"box_icon"],[1,"box_menu"],["mat-icon-button","",3,"matMenuTriggerFor"],[3,"matMenuTriggerFor"],["menu","matMenu"],["mat-menu-item","",3,"click"]],template:function(n,e){1&n&&(t.F$t(),t.Hsn(0),t.TgZ(1,"div",0),t.YNc(2,ct,2,1,"ng-container",1),t.ALo(3,"async"),t.TgZ(4,"app-add-button",2),t.NdJ("addEvent",function(){return e.addDialog()}),t.qZA()()),2&n&&(t.xp6(2),t.Q6J("ngIf",t.lcZ(3,1,e.data$)))},dependencies:[p.sg,p.O5,O.L,u.Hw,h.gM,f.VK,f.OP,f.p6,p.Ov],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;position:relative;width:100%;gap:22px;padding:80px 20px 20px}.container[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{position:relative;border-radius:2px;box-shadow:var(--shadow);background-color:var(--color-4);width:70px;height:70px}.container[_ngcontent-%COMP%]   .box_link[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;color:var(--color-text);width:100%;height:100%}.container[_ngcontent-%COMP%]   .box_link[_ngcontent-%COMP%]:hover   .box_icon[_ngcontent-%COMP%]{transform:scale(1.5)}.container[_ngcontent-%COMP%]   .box_link_icon[_ngcontent-%COMP%]{transform:scale(1.2)}.container[_ngcontent-%COMP%]   .box_menu[_ngcontent-%COMP%]{position:absolute;top:1px;right:1px}.container[_ngcontent-%COMP%]   .box_menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;background-color:transparent;padding-top:2px}.container[_ngcontent-%COMP%]   .box_menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{box-shadow:var(--shadow)}.container[_ngcontent-%COMP%]   .box_menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:18px;height:18px;font-size:18px;color:var(--color-text)}"]}),o})();var dt=s(8049);let C=(()=>{class o{constructor(n,e,i){this.http=n,this.dialog=e,this.userService=i,this.dataList=[],this.dataListSubject=new b.X([]),this.data$=this.dataListSubject.asObservable(),this.formFields=[{type:m.f.Text,label:"Name",name:"name",validations:[d.kI.required]},{type:m.f.Date,label:"Payment date",name:"date",validations:[d.kI.required]},{type:m.f.Select,label:"Payment Frequency",name:"frequency",options:["Monthly","Every 2 Months","Quarterly","Semi-Annually","Annually"],validations:[d.kI.required]}],this.url="/bills/billsList.json"}getList(){this.http.get(this.url).subscribe({next:n=>{const e=null!==n?n:[];this.dataList=e,this.dataListSubject.next(e)},error:()=>{this.dialog.open(g.W,{data:{title:"Error",description:"Error while fetching bills data",type:"error"}})}})}addUniqueId(){return(0,M.Z)()}add(n){const e=[...this.dataList,n];this.dataListSubject.next(e),this.http.put(this.url,e).subscribe(()=>{this.dataList=e})}update(n){const e=[...this.dataList],i=e.findIndex(r=>r.id===n.id);-1!==i&&(e[i]=n,this.dataListSubject.next(e),this.http.put(this.url,e).subscribe(()=>{this.dataList=e}))}delete(n){const e=[...this.dataList],i=e.findIndex(r=>r.id===n.id);-1!==i&&(e.splice(i,1),this.dataListSubject.next(e),this.http.put(this.url,e).subscribe(()=>{this.dataList=e}))}getFormFields(){return this.formFields.slice()}getPaymentIntervalDays(n){switch(n){case"Monthly":default:return 30;case"Every 2 Months":return 60;case"Quarterly":return 90;case"Semi-Annually":return 182;case"Annually":return 365}}}return o.\u0275fac=function(n){return new(n||o)(t.LFG(w.eN),t.LFG(l.uw),t.LFG(dt.K))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),D=(()=>{class o{constructor(n,e){this.dialogRef=n,this.dataService=e,this.submitFormEvent=new t.vpe}ngOnInit(){this.formFields=this.dataService.getFormFields()}closeHandler(){this.dialogRef.close()}submitHandler(n){this.submitFormEvent.emit(n)}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(l.so),t.Y36(C))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-bill-form"]],inputs:{data:"data",title:"title"},outputs:{submitFormEvent:"submitFormEvent"},decls:4,vars:3,consts:[["mat-dialog-title","",1,"title"],["mat-dialog-content",""],[3,"data","fields","submitEvent","closeEvent"]],template:function(n,e){1&n&&(t.TgZ(0,"p",0),t._uU(1),t.qZA(),t.TgZ(2,"div",1)(3,"app-create-form",2),t.NdJ("submitEvent",function(r){return e.submitHandler(r)})("closeEvent",function(){return e.closeHandler()}),t.qZA()()),2&n&&(t.xp6(1),t.Oqu(e.data?"Edit "+e.data.name:"Add new "+e.title.slice(0,-1)),t.xp6(2),t.Q6J("data",e.data)("fields",e.formFields))},dependencies:[Z.I,l.uh,l.xY],styles:[".title[_ngcontent-%COMP%]{color:var(--color-text-light)}"]}),o})(),gt=(()=>{class o{constructor(n,e,i){this.dialogRef=n,this.dialogData=e,this.dataService=i}ngOnInit(){this.title=this.dialogData.title}addHandler(n){const e=this.dataService.addUniqueId();n.id=e,this.newItem=n,this.dataService.add(this.newItem)}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(l.so),t.Y36(l.WI),t.Y36(C))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-add-bill-dialog"]],decls:1,vars:1,consts:[[3,"title","submitFormEvent"]],template:function(n,e){1&n&&(t.TgZ(0,"app-bill-form",0),t.NdJ("submitFormEvent",function(r){return e.addHandler(r)}),t.qZA()),2&n&&t.Q6J("title",e.title)},dependencies:[D]}),o})(),E=(()=>{class o{constructor(n,e,i){this.dialogRef=n,this.dialogData=e,this.dataService=i}ngOnInit(){this.title=this.dialogData.title,this.bill=this.dialogData.bill}updateHandler(n){n.id=this.bill.id,this.dataService.update(n)}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(l.so),t.Y36(l.WI),t.Y36(C))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-update-bill-dialog"]],decls:1,vars:2,consts:[[3,"title","data","submitFormEvent"]],template:function(n,e){1&n&&(t.TgZ(0,"app-bill-form",0),t.NdJ("submitFormEvent",function(r){return e.updateHandler(r)}),t.qZA()),2&n&&t.Q6J("title",e.title)("data",e.bill)}}),o})();var I=s(5819);const mt=function(o,a){return{width:o,"background-color":a}};function ut(o,a){if(1&o&&(t.TgZ(0,"div",7),t._UZ(1,"div",8),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.Q6J("ngStyle",t.WLB(1,mt,n.progress+"%",n.getColor(n.progress)))}}let _t=(()=>{class o{constructor(n){this.timeAlertService=n,this.editClick=new t.vpe,this.deleteClick=new t.vpe,this.paidClick=new t.vpe}ngOnInit(){this.value=this.timeAlertService.getCountEndTime(this.date),this.value>0&&(this.progress=this.value/this.maxValue*100)}getColor(n){return n<33?"var(--color-alert)":"var(--color-ok)"}onEditClick(){this.editClick.emit()}onDeleteClick(){this.deleteClick.emit()}onPaidClick(){this.paidClick.emit()}addDialog(){}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(I.X))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-progress-bar"]],inputs:{date:"date",maxValue:"maxValue",name:"name"},outputs:{editClick:"editClick",deleteClick:"deleteClick",paidClick:"paidClick"},decls:14,vars:4,consts:[[1,"wrap"],[1,"title"],[3,"ngClass"],["class","bar_content",4,"ngIf"],[1,"bar_number"],["matTooltip","Already paid",1,"icons","icons--submit",3,"click"],[1,"icons",3,"click"],[1,"bar_content"],[1,"value",3,"ngStyle"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"p",1),t._uU(2),t.qZA(),t.TgZ(3,"div",2),t.YNc(4,ut,2,4,"div",3),t.TgZ(5,"div",4)(6,"p"),t._uU(7),t.qZA()()(),t.TgZ(8,"mat-icon",5),t.NdJ("click",function(){return e.onPaidClick()}),t._uU(9,"skip_next"),t.qZA(),t.TgZ(10,"mat-icon",6),t.NdJ("click",function(){return e.onEditClick()}),t._uU(11,"edit"),t.qZA(),t.TgZ(12,"mat-icon",6),t.NdJ("click",function(){return e.onDeleteClick()}),t._uU(13,"delete"),t.qZA()()),2&n&&(t.xp6(2),t.Oqu(e.name),t.xp6(1),t.Q6J("ngClass",e.value>0?"bar":"bar bar--alert"),t.xp6(1),t.Q6J("ngIf",e.value>0),t.xp6(3),t.hij("",e.value," days"))},dependencies:[u.Hw,p.mk,p.O5,p.PC,h.gM],styles:[".wrap[_ngcontent-%COMP%]{display:flex;align-items:end;margin:10px 0}.wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--color-text-light);font-size:var(--font-medium)}.wrap[_ngcontent-%COMP%]   p.title[_ngcontent-%COMP%]{text-transform:uppercase;width:30%;overflow:hidden}.wrap[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]{flex-grow:1;display:flex;align-items:center;justify-content:flex-end;width:220px;height:24px;border-radius:4px;background-color:var(--color-1);padding:2px 4px;box-shadow:var(--shadow);margin-left:2%}.wrap[_ngcontent-%COMP%]   .bar--alert[_ngcontent-%COMP%]{background-color:var(--color-alert)}.wrap[_ngcontent-%COMP%]   .bar_content[_ngcontent-%COMP%]{position:relative;flex-grow:1;border-radius:4px;height:80%;background-color:var(--color-4);box-shadow:inset 1px 2px 6px 1px #000;overflow:hidden}.wrap[_ngcontent-%COMP%]   .bar_content[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:0;background-color:var(--color-3);border-radius:0 10px 10px 0;box-shadow:inset 1px 0 8px #000}.wrap[_ngcontent-%COMP%]   .bar_number[_ngcontent-%COMP%]{width:60px;height:100%;display:flex;justify-content:center;align-items:center}.wrap[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{margin-left:2%;color:var(--color-text-light)}.wrap[_ngcontent-%COMP%]   .icons--submit[_ngcontent-%COMP%]{color:var(--color-ok);box-shadow:var(--shadow);border-radius:4px}.wrap[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]:hover{transform:scale(1.2)}"]}),o})();function ht(o,a){if(1&o){const n=t.EpF();t.ynx(0),t.TgZ(1,"app-progress-bar",4),t.NdJ("editClick",function(){const r=t.CHM(n).$implicit,c=t.oxw(2);return t.KtG(c.onEditHandler(r))})("deleteClick",function(){const r=t.CHM(n).$implicit,c=t.oxw(2);return t.KtG(c.onDeleteHandler(r))})("paidClick",function(){const r=t.CHM(n).$implicit,c=t.oxw(2);return t.KtG(c.onPaidHandler(r))}),t.qZA(),t.BQk()}if(2&o){const n=a.$implicit,e=t.oxw(2);t.xp6(1),t.Q6J("date",n.date)("maxValue",e.getMaxValue(n.frequency))("name",n.name)}}function xt(o,a){if(1&o&&(t.ynx(0),t.YNc(1,ht,2,3,"ng-container",3),t.BQk()),2&o){const n=a.ngIf;t.xp6(1),t.Q6J("ngForOf",n)}}const ft=["*"];let Ct=(()=>{class o{constructor(n,e,i,r){this.dataService=n,this.dialog=e,this.timeAlertService=i,this.changeDetectorRef=r,this.subscription=new v.w0}ngOnInit(){this.title="bills",this.dataService.getList(),this.data$=this.dataService.data$}addDialog(){this.dialog.open(gt,{width:"500px",data:{title:this.title}})}onEditHandler(n){this.dialog.open(E,{width:"500px",data:{title:this.title,bill:n}})}onDeleteHandler(n){const e=this.dialog.open(g.W,{data:{title:`Delete ${n.name}`,description:`Are you sure you want to delete ${n.name} link`,type:"submit"}});this.subscription.add(e.afterClosed().subscribe(i=>{"submit"===i&&this.dataService.delete(n)}))}onPaidHandler(n){const e=this.timeAlertService.addIntervalToDate(n.date,n.frequency),i={...n,date:e},r=this.dialog.open(g.W,{data:{title:`Are you sure you paid ${n.name}?`,description:`${n.frequency} extend deadline.`,type:"submit"}});this.subscription.add(r.afterClosed().subscribe(c=>{"submit"===c&&(this.changeDetectorRef.detectChanges(),this.dataService.update(i),this.changeDetectorRef.markForCheck())}))}getMaxValue(n){return this.dataService.getPaymentIntervalDays(n)}ngOnDestroy(){this.subscription.unsubscribe()}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(C),t.Y36(l.uw),t.Y36(I.X),t.Y36(t.sBO))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-bills"]],ngContentSelectors:ft,decls:5,vars:3,consts:[[1,"bills"],[4,"ngIf"],[3,"addEvent"],[4,"ngFor","ngForOf"],[3,"date","maxValue","name","editClick","deleteClick","paidClick"]],template:function(n,e){1&n&&(t.F$t(),t.Hsn(0),t.TgZ(1,"div",0),t.YNc(2,xt,2,1,"ng-container",1),t.ALo(3,"async"),t.qZA(),t.TgZ(4,"app-add-button",2),t.NdJ("addEvent",function(){return e.addDialog()}),t.qZA()),2&n&&(t.xp6(2),t.Q6J("ngIf",t.lcZ(3,1,e.data$)))},dependencies:[p.sg,p.O5,O.L,_t,p.Ov],styles:[".bills[_ngcontent-%COMP%]{position:absolute;margin:90px 20px 10px;width:calc(100% - 40px);height:calc(100% - 100px);overflow:auto}"]}),o})();function vt(o,a){if(1&o&&(t.ynx(0),t.TgZ(1,"div",16)(2,"div",17),t._uU(3),t.qZA()(),t.TgZ(4,"mat-icon",18),t._uU(5,"info"),t.qZA(),t.BQk()),2&o){const n=t.oxw().ngIf,e=t.oxw(2).$implicit,i=t.oxw(2);t.xp6(3),t.hij(" ",n[e.value].length," "),t.xp6(1),t.Q6J("matTooltip",i.getTooltipContent(n[e.value]))}}function bt(o,a){1&o&&t._UZ(0,"div",19)}function Mt(o,a){if(1&o&&(t.ynx(0),t.YNc(1,vt,6,2,"ng-container",14),t.YNc(2,bt,1,0,"ng-template",null,15,t.W1O),t.BQk()),2&o){const n=a.ngIf,e=t.MAs(3),i=t.oxw(2).$implicit;t.xp6(1),t.Q6J("ngIf",n[i.value].length>0)("ngIfElse",e)}}function wt(o,a){if(1&o){const n=t.EpF();t.ynx(0),t.TgZ(1,"div",11),t.NdJ("click",function(){t.CHM(n);const i=t.oxw().$implicit,r=t.oxw(2);return t.KtG(r.goToPage(i.value))}),t.TgZ(2,"div",5)(3,"mat-icon"),t._uU(4),t.qZA()(),t.TgZ(5,"div",12)(6,"p"),t._uU(7),t.qZA()(),t.TgZ(8,"div",13),t.YNc(9,Mt,4,2,"ng-container",3),t.ALo(10,"async"),t.qZA()(),t.BQk()}if(2&o){const n=t.oxw().$implicit,e=t.oxw(2);t.xp6(4),t.Oqu(n.icon),t.xp6(3),t.Oqu(n.title),t.xp6(2),t.Q6J("ngIf",t.lcZ(10,3,e.allAlerts$))}}function Ot(o,a){if(1&o&&(t.ynx(0),t.YNc(1,wt,11,5,"ng-container",3),t.BQk()),2&o){const n=a.$implicit;t.xp6(1),t.Q6J("ngIf",n.visible)}}function Pt(o,a){if(1&o&&(t.ynx(0),t.YNc(1,Ot,2,1,"ng-container",10),t.BQk()),2&o){const n=a.ngIf;t.xp6(1),t.Q6J("ngForOf",n)}}const kt=[{path:"",component:(()=>{class o{constructor(n,e,i,r,c,P,Lt,At,Dt){this.router=n,this.menuService=e,this.alertsService=i,this.colorService=r,this.daysAlertService=c,this.carService=P,this.eventsService=Lt,this.personsService=At,this.petsService=Dt}ngOnInit(){this.menuService.getSections(),this.sections$=this.menuService.sections$,this.carService.getList(),this.eventsService.getList(),this.personsService.getList(),this.petsService.getList(),this.allAlerts$=this.alertsService.allAlerts$,this.colorService.setColor(),this.daysAlertService.setDaysAlert()}goToPage(n){this.menuService.setCurrentIndex(1),this.router.navigate([`/dashboard/lists/${n}`])}getTooltipContent(n){return n&&n.length>0?n.map((i,r)=>`${r+1}. ${i.message.split(" ").slice(0,2).join(" ")} - ${i.name}`).join(", "):""}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(_.F0),t.Y36(y.h),t.Y36(T.m),t.Y36(Y.x),t.Y36(J.p),t.Y36(N.Z),t.Y36(B.n),t.Y36(U.L),t.Y36($.O))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-main"]],decls:31,vars:3,consts:[[1,"wrap"],[1,"sections"],[1,"main"],[4,"ngIf"],[1,"info","info_wide"],[1,"main_icon"],[1,"info_title"],[1,"right-section"],[1,"info","info_bills"],[1,"info","info_links"],[4,"ngFor","ngForOf"],[1,"main_container",3,"click"],[1,"main_title"],[1,"main_alert-box"],[4,"ngIf","ngIfElse"],["ok",""],[1,"alert","alert--warning"],[1,"main_alert-number"],[1,"main_alert-tooltip",3,"matTooltip"],[1,"alert","alert--ok"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t.YNc(3,Pt,2,1,"ng-container",3),t.ALo(4,"async"),t.TgZ(5,"div",4)(6,"app-upcoming-dates")(7,"div",5)(8,"mat-icon"),t._uU(9,"notification_important"),t.qZA()(),t.TgZ(10,"div",6)(11,"p"),t._uU(12,"sorted top alerts"),t.qZA()()()()(),t.TgZ(13,"div",7)(14,"div",8)(15,"app-bills")(16,"div",5)(17,"mat-icon"),t._uU(18,"attach_money"),t.qZA()(),t.TgZ(19,"div",6)(20,"p"),t._uU(21,"bills"),t.qZA()()()(),t.TgZ(22,"div",9)(23,"app-links")(24,"div",5)(25,"mat-icon"),t._uU(26,"link"),t.qZA()(),t.TgZ(27,"div",6)(28,"p"),t._uU(29,"favourite links"),t.qZA()()()()()(),t._UZ(30,"app-stickers"),t.qZA()),2&n&&(t.xp6(3),t.Q6J("ngIf",t.lcZ(4,1,e.sections$)))},dependencies:[p.sg,p.O5,u.Hw,W,at,h.gM,pt,Ct,p.Ov],styles:[".wrap[_ngcontent-%COMP%]{display:flex;position:relative;height:100%;overflow:hidden;min-width:360px}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]{height:auto;flex-wrap:wrap}}.wrap[_ngcontent-%COMP%]   .sections[_ngcontent-%COMP%]{flex-grow:1;display:flex}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]   .sections[_ngcontent-%COMP%]{flex-wrap:wrap}}.wrap[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-content:flex-start;justify-content:flex-end;gap:22px;width:50%}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]{justify-content:center;width:100%;margin:22px}}.wrap[_ngcontent-%COMP%]   .main_container[_ngcontent-%COMP%]{flex-grow:1;position:relative;background-color:var(--color-2);width:47%;height:130px;box-shadow:var(--shadow);border-radius:4px;cursor:pointer}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]   .main_container[_ngcontent-%COMP%]{height:85px}}.wrap[_ngcontent-%COMP%]   .main_container[_ngcontent-%COMP%]:hover{box-shadow:2px 4px 10px #000}.wrap[_ngcontent-%COMP%]   .main_container[_ngcontent-%COMP%]:hover   .main_title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:calc(var(--font-subtitle) + 1px)}.wrap[_ngcontent-%COMP%]   .main_container[_ngcontent-%COMP%]:active{box-shadow:inset 2px 4px 10px #000}.wrap[_ngcontent-%COMP%]   .main_title[_ngcontent-%COMP%]{position:absolute;bottom:10px;left:14px}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]   .main_title[_ngcontent-%COMP%]{left:80px}}.wrap[_ngcontent-%COMP%]   .main_title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--color-text-light);font-size:var(--font-subtitle);text-transform:uppercase}.wrap[_ngcontent-%COMP%]   .main_icon[_ngcontent-%COMP%]{position:absolute;top:10px;left:10px}.wrap[_ngcontent-%COMP%]   .main_icon[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{color:var(--color-text-light);height:60px;width:60px;font-size:60px}.wrap[_ngcontent-%COMP%]   .main_alert-box[_ngcontent-%COMP%]{position:absolute;top:10px;right:14px;height:30px;width:30px}.wrap[_ngcontent-%COMP%]   .main_alert-box[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%]{margin:0 auto;width:24px;height:24px;border-radius:50%}.wrap[_ngcontent-%COMP%]   .main_alert-box[_ngcontent-%COMP%]   .alert--warning[_ngcontent-%COMP%]{background-color:var(--color-alert);box-shadow:#0003 0 -1px 7px 1px,inset #8d2828 0 -1px 9px,#ff000080 0 2px 12px;animation:_ngcontent-%COMP%_alert 1s 6}.wrap[_ngcontent-%COMP%]   .main_alert-box[_ngcontent-%COMP%]   .alert--ok[_ngcontent-%COMP%]{background-color:var(--color-ok);box-shadow:#0003 0 -1px 6px 1px,inset #134415 0 -1px 7px,#00ff0d80 0 2px 10px}@keyframes _ngcontent-%COMP%_alert{0%{background-color:var(--color-alert)}60%{background-color:#a00;box-shadow:#0003 0 -1px 7px 1px,inset #772121 0 -1px 12px,#ff000080 0 1px}to{background-color:var(--color-alert)}}.wrap[_ngcontent-%COMP%]   .main_alert-number[_ngcontent-%COMP%]{color:#fff;position:absolute;top:2px;right:8px}.wrap[_ngcontent-%COMP%]   .main_alert-tooltip[_ngcontent-%COMP%]{color:gray;position:absolute;top:1px;right:33px}.wrap[_ngcontent-%COMP%]   .right-section[_ngcontent-%COMP%]{width:65%}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]   .right-section[_ngcontent-%COMP%]{width:100%}}.wrap[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{position:relative;background-color:var(--color-1);width:calc(100% - 44px);box-shadow:var(--shadow);border-radius:4px;margin:0 22px 22px}.wrap[_ngcontent-%COMP%]   .info_wide[_ngcontent-%COMP%]{margin:0;width:100%;height:calc(100% - 316px)}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]   .info_wide[_ngcontent-%COMP%]{height:auto;min-height:240px}}.wrap[_ngcontent-%COMP%]   .info_bills[_ngcontent-%COMP%]{height:calc(100% - 294px);overflow:auto}@media (orientation: portrait){.wrap[_ngcontent-%COMP%]   .info_bills[_ngcontent-%COMP%]{height:auto;min-height:240px}}.wrap[_ngcontent-%COMP%]   .info_links[_ngcontent-%COMP%]{min-height:260px;overflow:auto}.wrap[_ngcontent-%COMP%]   .info_title[_ngcontent-%COMP%]{position:absolute;left:84px;top:30px}.wrap[_ngcontent-%COMP%]   .info_title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--color-text-light);font-size:var(--font-subtitle);text-transform:uppercase}.wrap[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]:hover{box-shadow:2px 4px 10px #000}"]}),o})()}];let yt=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[_.Bz.forChild(kt),_.Bz]}),o})();var Tt=s(279),St=s(1920),Ft=s(2599);let Zt=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[p.ez,yt,Tt.m,u.Ps,St.DashboardModule,h.AV,l.Is,f.Tx,Ft.rP]}),o})();t.B6R(A,[L],[]),t.B6R(E,[D],[])}}]);