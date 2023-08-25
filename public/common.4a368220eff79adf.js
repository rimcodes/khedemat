"use strict";(self.webpackChunkrcadmin=self.webpackChunkrcadmin||[]).push([[592],{3245:(m,h,t)=>{t.d(h,{G:()=>u});var o=t(553),r=t(5879),s=t(9862);let u=(()=>{class i{constructor(e){this.http=e,this.catsApiUrl=`${o.N.api}/categories`,this.categories=[]}getAllCategories(){return this.http.get(this.catsApiUrl)}getCategory(e){return this.http.get(`${this.catsApiUrl}/${e}`)}createCategory(e){return this.http.post(this.catsApiUrl,e)}updateCategory(e){return this.http.patch(this.catsApiUrl,e)}deleteCategory(e){return this.http.delete(this.catsApiUrl,{body:{id:e}})}}return i.\u0275fac=function(e){return new(e||i)(r.LFG(s.eN))},i.\u0275prov=r.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()},8119:(m,h,t)=>{t.d(h,{r:()=>u});var o=t(553),r=t(5879),s=t(9862);let u=(()=>{class i{constructor(e){this.http=e,this.servicesApiUrl=`${o.N.api}/services`,this.services=[]}getAllServices(){return this.http.get(this.servicesApiUrl)}getService(e){return this.http.get(`${this.servicesApiUrl}/${e}`)}createService(e){return this.http.post(this.servicesApiUrl,e)}updateService(e){return this.http.patch(this.servicesApiUrl,e)}deleteService(e){return this.http.delete(this.servicesApiUrl,{body:{id:e}})}}return i.\u0275fac=function(e){return new(e||i)(r.LFG(s.eN))},i.\u0275prov=r.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()},6346:(m,h,t)=>{t.d(h,{f:()=>p});var o=t(6306),r=t(8504),s=t(553),u=t(5879),i=t(9862);let p=(()=>{class e{constructor(n){this.http=n,this.usersApiUrl=`${s.N.api}/users`,this.users=[]}getAllUsers(){return this.http.get(this.usersApiUrl)}getUser(n){return this.http.get(`${this.usersApiUrl}/${n}`)}getWorkers(){return this.http.get(`${this.usersApiUrl}/workers`)}getClients(){return this.http.get(`${this.usersApiUrl}/clients`)}getAdmins(){return this.http.get(`${this.usersApiUrl}/admins`)}createUser(n){return this.http.post(this.usersApiUrl,n).pipe((0,o.K)(this.handleError))}updateUser(n){return this.http.patch(this.usersApiUrl,n)}deleteUser(n){return this.http.delete(this.usersApiUrl,{body:{id:n}})}handleError(n){return 0===n.status?console.error("An error occurred:",n.error):console.error(`Backend returned code ${n.status}, body was: `,n.error),(0,r._)(()=>new Error("Something bad happened; please try again later."))}}return e.\u0275fac=function(n){return new(n||e)(u.LFG(i.eN))},e.\u0275prov=u.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},1894:(m,h,t)=>{t.d(h,{L:()=>n});var o=t(7700),r=t(4052),s=t(5879),u=t(6346),i=t(3245),p=t(8119),e=t(2939),_=t(2296);let n=(()=>{class c{constructor(l,a,d,v,E,D){this.dialogRef=l,this.data=a,this.usersService=d,this.categoriesService=v,this.servicesService=E,this._snackBar=D,this.durationInSeconds=3}ngOnInit(){}onNoClick(){this.dialogRef.close()}confirmDelete(l){switch(this.data.type){case"user":this.usersService.deleteUser(l).subscribe({next:a=>{this.openSnackBar("\u0644\u0645 \u062a\u0645\u062a \u0639\u0645\u0644\u064a\u062a \u0627\u0644\u062d\u0630\u0641 ","\u0627\u0644\u0630\u0647\u0627\u0628 \u0627\u0644\u0649 \u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645","warning"),this.dialogRef.close()},error:a=>{this.openSnackBar(a.message,"\u062d\u062f\u062b \u062e\u0637\u0621 \u0645\u0627!","warning"),console.log(a)}});break;case"category":this.categoriesService.deleteCategory(l).subscribe({next:a=>{this.openSnackBar("\u0644\u0642\u062f \u062a\u0645\u062a \u0639\u0645\u0644\u064a\u062a \u0627\u0644\u062d\u0630\u0641 ","\u0627\u0644\u0630\u0647\u0627\u0628 \u0627\u0644\u0649 \u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645","success"),this.dialogRef.close()},error:a=>{this.openSnackBar("\u062d\u062f\u062b \u062e\u0637\u0621 \u0645\u0627!\n"+a.error.message,"\u0627\u0644\u0639\u0648\u062f\u0629","warning"),console.log(a)}});break;case"service":this.servicesService.deleteService(l).subscribe({next:a=>{this.openSnackBar("\u0644\u0642\u062f \u062a\u0645\u062a \u0639\u0645\u0644\u064a\u062a \u0627\u0644\u062d\u0630\u0641 ","\u0627\u0644\u0630\u0647\u0627\u0628 \u0627\u0644\u0649 \u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645","success"),this.dialogRef.close()},error:a=>{this.openSnackBar("\u062d\u062f\u062b \u062e\u0637\u0621 \u0645\u0627!\n"+a.error.message,"\u0627\u0644\u0639\u0648\u062f\u0629","warning"),console.log(a)}});break;default:console.log("No item has been deleted")}}openSnackBar(l,a,d){this._snackBar.openFromComponent(r.v,{duration:1e3*this.durationInSeconds,data:{message:l,action:a,status:d}})}}return c.\u0275fac=function(l){return new(l||c)(s.Y36(o.so),s.Y36(o.WI),s.Y36(u.f),s.Y36(i.G),s.Y36(p.r),s.Y36(e.ux))},c.\u0275cmp=s.Xpm({type:c,selectors:[["app-delete-dialogue"]],decls:9,vars:1,consts:[["mat-dialog-title",""],["mat-dialog-content",""],["mat-dialog-actions",""],["mat-raised-button","","mat-dialog-close","","color","primary",3,"click"],["mat-raised-button","","color","warn",3,"click"]],template:function(l,a){1&l&&(s.TgZ(0,"h1",0),s._uU(1,"\u0647\u0644 \u0627\u0646\u062a \u0645\u062a\u0623\u0643\u062f "),s.qZA(),s.TgZ(2,"p",1),s._uU(3),s.qZA(),s.TgZ(4,"div",2)(5,"button",3),s.NdJ("click",function(){return a.onNoClick()}),s._uU(6,"\u0625\u0644\u063a\u0627\u0621"),s.qZA(),s.TgZ(7,"button",4),s.NdJ("click",function(){let v;return a.confirmDelete(null!==(v=a.data.model.id)&&void 0!==v?v:"")}),s._uU(8,"\u062d\u0630\u0641"),s.qZA()()),2&l&&(s.xp6(3),s.hij(" \u0627\u0646\u062a \u0627\u0644\u0627\u0646 \u0633\u062a\u062d\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631: ",a.data.name,"\n"))},dependencies:[_.lW,o.ZT,o.uh,o.xY,o.H8]}),c})()},4052:(m,h,t)=>{t.d(h,{v:()=>p});var o=t(2939),r=t(5879),s=t(1896),u=t(2296);const i=function(){return["/"]};let p=(()=>{class _{constructor(c){this.data=c}ngOnInit(){}}return _.\u0275fac=function(c){return new(c||_)(r.Y36(o.qD))},_.\u0275cmp=r.Xpm({type:_,selectors:[["app-snack-message"]],decls:5,vars:6,consts:[[1,"flex","p-3","text-white","justify-between","items-center"],["matSnackBarLabel","",1,"text-white"],["mat-stroked-button","","matSnackBarAction","",1,"bg-white",3,"routerLink"]],template:function(c,g){1&c&&(r.TgZ(0,"div",0)(1,"span",1),r._uU(2),r.qZA(),r.TgZ(3,"button",2),r._uU(4),r.qZA()()),2&c&&(r.Tol(g.data.status),r.xp6(2),r.hij(" ",g.data.message," "),r.xp6(1),r.Q6J("routerLink",r.DdM(5,i)),r.xp6(1),r.Oqu(g.data.action))},dependencies:[s.rH,u.lW,o.Mm,o.Wf],styles:[".warning[_ngcontent-%COMP%]{color:#ff7171}.success[_ngcontent-%COMP%]{color:green}"]}),_})()}}]);