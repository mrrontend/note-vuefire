webpackJsonp([1,2],[,,,function(e,t,n){"use strict";var a=n(21),s=n.n(a),r=new s.a;t.a=r},,,,,,,,,,,,,function(e,t,n){"use strict";var a=n(50),s=n.n(a),r=n(143);s.a.initializeApp(r),t.a={providers:{twitter:new s.a.auth.TwitterAuthProvider,google:new s.a.auth.GoogleAuthProvider,facebook:new s.a.auth.FacebookAuthProvider,github:new s.a.auth.GithubAuthProvider},user:null,ref:s.a.auth(),onAuth:function(e){this.ref.onAuthStateChanged(e)},getAuth:function(){return this.ref.currentUser},loginWithPassword:function(e){return this.ref.signInWithEmailAndPassword(e.email,e.password)},signUpWithPassword:function(e){return this.ref.createUserWithEmailAndPassword(e.email,e.password)},signInWithProvider:function(e,t){var n=this.providers[e];this.ref.signInWithPopup(n).then(function(e){t&&t(null,e)},function(e){t(e)})},signOut:function(){this.ref.signOut()}}},function(e,t,n){"use strict";var a=n(69),s=n.n(a),r=n(73),o=n.n(r),i=n(74),u=n.n(i),c=n(76),l=n.n(c),d=n(75),f=n.n(d),v=n(113),p=n.n(v),h=n(50),m=n.n(h),g=n(16),_=function(e){function t(){o()(this,t);var e=l()(this,(t.__proto__||s()(t)).call(this));return e.ref=m.a.database().ref("notes"),e}return f()(t,e),u()(t,[{key:"create",value:function(e,t){var n=e.title,a=void 0===n?"":n,s=e.content,r=void 0===s?"":s;this.notesRef.push({title:a,content:r},t)}},{key:"update",value:function(e,t){var n=e.key,a=e.title,s=void 0===a?"":a,r=e.content,o=void 0===r?"":r;this.notesRef.child(n).update({title:s,content:o},t)}},{key:"remove",value:function(e,t){var n=e.key;this.notesRef.child(n).remove(t)}},{key:"attachFirebaseListeners",value:function(){var e=this;g.a.onAuth(function(t){e.emit("userAuth",t),e.notesRef.on("child_added",e.onAdded,e),e.notesRef.on("child_removed",e.onRemoved,e),e.notesRef.on("child_changed",e.onChanged,e)})}},{key:"detachFirebaseListeners",value:function(){this.notesRef.off("child_added",this.onAdded,this),this.notesRef.off("child_removed",this.onRemoved,this),this.notesRef.off("child_changed",this.onChanged,this)}},{key:"onAdded",value:function(e){var t=this.snapshotToNote(e);this.emit("added",t)}},{key:"onRemoved",value:function(e){var t=this.snapshotToNote(e);this.emit("removed",t)}},{key:"onChanged",value:function(e){var t=this.snapshotToNote(e);this.emit("changed",t)}},{key:"onError",value:function(e){console.log(e)}},{key:"snapshotToNote",value:function(e){var t=e.key,n=e.val();return n.key=t,n}},{key:"findIndex",value:function(e,t){return e.findIndex(function(e){return e.key===t})}},{key:"find",value:function(e,t){return e.find(function(e){return e.key===t})}},{key:"uid",get:function(){var e=m.a.auth().currentUser;return e?e.uid:null}},{key:"notesRef",get:function(){return m.a.database().ref("users/"+this.uid+"/notes")}}]),t}(p.a);t.a=new _},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){n(116);var a=n(0)(n(61),n(135),null,null);e.exports=a.exports},function(e,t,n){n(114);var a=n(0)(n(62),n(133),null,null);e.exports=a.exports},function(e,t,n){n(118);var a=n(0)(n(64),n(137),null,null);e.exports=a.exports},function(e,t,n){n(120);var a=n(0)(n(58),n(140),null,null);e.exports=a.exports},function(e,t,n){n(115);var a=n(0)(n(65),n(134),null,null);e.exports=a.exports},function(e,t,n){var a=n(0)(n(66),n(139),null,null);e.exports=a.exports},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(52),s=n.n(a),r=n(53),o=n.n(r),i=n(51),u=n.n(i),c=n(130),l=n.n(c),d=n(3),f=n(131),v=n.n(f);t.default={name:"app",components:{Notes:s.a,CreateNoteForm:u.a,UpdateModal:o.a,HeaderBar:v.a,Alerts:l.a},data:function(){return{alerts:[]}},created:function(){d.a.$on("alert",this.showAlert)},beforeDestroy:function(){d.a.$off("alert")},methods:{showAlert:function(e){var t=this;this.alerts.push(e),setTimeout(function(){t.alerts.splice(e,1)},e.duration||1500)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["alerts"]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(16),s=n(3);t.default={data:function(){return{user:null,searchQuery:""}},watch:{searchQuery:function(){s.a.$emit("search",this.searchQuery)}},methods:{processUser:function(e){return null===e?void(this.user=null):void(this.user={userTitle:e.providerData[0].displayName||e.providerData[0].email||"",imageUrl:e.providerData[0].photoURL||"https://www.gravatar.com/avatar/"})},signOut:function(){a.a.signOut(),this.$router.push("auth")}},created:function(){a.a.onAuth(this.processUser),this.processUser(a.a.getAuth())}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(17),s=n(3);t.default={data:function(){return{title:"",content:""}},methods:{createNote:function(){var e=this;(this.title.trim()||this.content.trim())&&a.a.create({title:this.title,content:this.content},function(t){return t?s.a.$emit("alert",{type:"error",message:t.message}):(e.title="",e.content="",void s.a.$emit("alert",{type:"success",message:"Note was successfully created"}))})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(17),s=n(127),r=n.n(s),o=n(3),i=n(132),u=n.n(i);t.default={components:{Note:u.a},data:function(){return{notes:[],searchQuery:""}},watch:{filteredNotes:{handler:function(){var e=this;this.$nextTick(function(){e.masonry.reloadItems(),e.masonry.layout()})}},deep:!0},computed:{filteredNotes:function(){var e=this;return this.notes.filter(function(t){return!e.searchQuery||(t.title.indexOf(e.searchQuery)!==-1||t.content.indexOf(e.searchQuery)!==-1)})}},mounted:function(){var e=this;this.masonry=new r.a(this.$refs.notes,{itemSelector:".note",columnWidth:320,gutter:16,fitWidth:!1}),a.a.on("added",function(t){e.notes.unshift(t)}),a.a.on("changed",function(t){var n=t.key,s=t.title,r=t.content,o=a.a.find(e.notes,n);o.title=s,o.content=r}),a.a.on("removed",function(t){var n=t.key,s=a.a.findIndex(e.notes,n);e.notes.splice(s,1)}),o.a.$on("search",function(t){e.searchQuery=t}),a.a.attachFirebaseListeners()},destroyed:function(){a.a.detachFirebaseListeners(),this.notes=[]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(17),s=n(3);t.default={props:["note"],methods:{remove:function(){a.a.remove(this.note,function(e){e&&s.a.$emit("alert",{type:"error",message:e.message})})},updateModal:function(){s.a.$emit("note.selected",this.note)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(21),s=n.n(a),r=n(17),o=n(3);t.default={data:function(){return{note:null}},created:function(){var e=this;o.a.$on("note.selected",function(t){e.note=s.a.util.extend({},t)})},beforeDestroy:function(){o.a.$off("note.selected")},methods:{remove:function(){var e=this;r.a.remove(this.note,function(t){return t?void o.a.$emit("alert",{type:"error",message:"Failed to remove note"}):void e.dismissModal()})},update:function(){var e=this;r.a.update(this.note,function(t){return t?void o.a.$emit("alert",{type:"error",message:"Failed to update note"}):void e.dismissModal()})},dismissModal:function(){this.note=null}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(16),s=n(3);t.default={data:function(){return{email:"",password:"",confirmPassword:"",wantsToSignUp:!1}},methods:{signUpWithPassword:function(){var e=this;this.password===this.confirmPassword&&a.a.signUpWithPassword({email:this.email,password:this.password}).then(function(t){return e.loginWithPassword()}).then(function(){return s.a.$emit("alert",{type:"success",message:"Signed up successfully"})}).catch(function(e){return s.a.$emit("alert",{type:"error",message:e.message})})},loginWithPassword:function(){var e=this;return a.a.loginWithPassword({email:this.email,password:this.password}).then(function(t){return s.a.$emit("alert",{type:"success",message:"Signed in successfully"}),e.onSignedIn(),t}).catch(function(e){return s.a.$emit("alert",{type:"error",message:e.message})})},signInWithProvider:function(e){var t=this;a.a.signInWithProvider(e,function(e,n){return e?s.a.$emit("alert",{type:"error",message:e.message}):void t.onSignedIn()})},onSignedIn:function(){this.$router.push({name:"notes"})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(52),s=n.n(a),r=n(51),o=n.n(r),i=n(53),u=n.n(i);t.default={components:{Notes:s.a,CreateNoteForm:o.a,UpdateModal:u.a},data:function(){return{selectedNote:null}},events:{"note.selected":function(e){this.selectedNote=e}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},,,,,,,,,function(e,t,n){n(119);var a=n(0)(n(59),n(138),null,null);e.exports=a.exports},function(e,t,n){n(117);var a=n(0)(n(60),n(136),null,null);e.exports=a.exports},function(e,t,n){n(121);var a=n(0)(n(63),n(141),null,null);e.exports=a.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"notes",staticClass:"notes"},e._l(e.filteredNotes,function(e){return n("note",{attrs:{note:e}})}))},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"auth-form",on:{submit:function(t){t.preventDefault(),e.wantsToSignUp?e.signUpWithPassword():e.loginWithPassword()}}},[n("h1",[e._v(e._s(e.wantsToSignUp?"Sign up":"Log in"))]),e._v(" "),n("div",[n("label",{attrs:{for:"email"}},[e._v("Email")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"email",name:"email",id:"email",required:""},domProps:{value:e._s(e.email)},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),e._v(" "),n("div",[n("label",{attrs:{for:"password"}},[e._v("Password")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",name:"password",id:"password",required:""},domProps:{value:e._s(e.password)},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.wantsToSignUp,expression:"wantsToSignUp"}]},[n("label",{attrs:{for:"confirm-password"}},[e._v("Confirm Password")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.confirmPassword,expression:"confirmPassword"}],attrs:{type:"password",name:"confirm-password",id:"confirm-password"},domProps:{value:e._s(e.confirmPassword)},on:{input:function(t){t.target.composing||(e.confirmPassword=t.target.value)}}})]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.wantsToSignUp,expression:"!wantsToSignUp"}],staticClass:"clearfix btn-group"},[n("button",{attrs:{type:"submit"}},[e._v("Log in")]),e._v(" "),n("button",{attrs:{type:"button"},on:{click:function(t){e.wantsToSignUp=!0}}},[e._v("Sign up")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.wantsToSignUp,expression:"wantsToSignUp"}]},[n("button",{staticClass:"signup-submit",attrs:{type:"submit"}},[e._v("Sign up")])]),e._v(" "),n("hr"),e._v(" "),n("div",{staticClass:"social-providers"},[n("a",{attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.signInWithProvider("facebook")}}},[n("i",{staticClass:"fa fa-facebook-square",attrs:{"aria-hidden":"true"}})]),e._v(" "),n("a",{attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.signInWithProvider("twitter")}}},[n("i",{staticClass:"fa fa-twitter-square",attrs:{"aria-hidden":"true"}})]),e._v(" "),n("a",{attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.signInWithProvider("google")}}},[n("i",{staticClass:"fa fa-google-plus-square",attrs:{"aria-hidden":"true"}})]),e._v(" "),n("a",{attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.signInWithProvider("github")}}},[n("i",{staticClass:"fa fa-github-square",attrs:{"aria-hidden":"true"}})])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"create-note",on:{submit:function(t){t.preventDefault(),e.createNote()}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"title"}],attrs:{name:"title",placeholder:"Title"},domProps:{value:e._s(e.title)},on:{input:function(t){t.target.composing||(e.title=t.target.value)}}}),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"content"}],attrs:{name:"content",placeholder:"Notes go here ...",rows:"3"},domProps:{value:e._s(e.content)},on:{input:function(t){t.target.composing||(e.content=t.target.value)}}}),e._v(" "),n("button",{attrs:{type:"submit"}},[e._v("+")])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.user?n("header",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchQuery,expression:"searchQuery"}],attrs:{placeholder:"Search",debounce:"500"},domProps:{value:e._s(e.searchQuery)},on:{input:function(t){t.target.composing||(e.searchQuery=t.target.value)}}}),e._v(" "),n("div",[n("span",[e._v(e._s(e.user.userTitle))]),e._v(" "),n("img",{attrs:{src:e.user.imageUrl,alt:e.user.userTitle}}),e._v(" "),n("a",{attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.signOut(t)}}},[n("i",{staticClass:"fa fa-sign-out",attrs:{"aria-hidden":"true"}})])])]):e._e()},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"modal"}},[e.note?n("div",{staticClass:"backdrop",on:{click:function(t){t.target===t.currentTarget&&e.dismissModal(t)}}},[n("form",{staticClass:"edit-note",on:{submit:function(t){t.preventDefault(),e.update(t)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.note.title,expression:"note.title"}],attrs:{name:"title",placeholder:"Title"},domProps:{value:e._s(e.note.title)},on:{input:function(t){t.target.composing||(e.note.title=t.target.value)}}}),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.note.content,expression:"note.content"}],attrs:{name:"content",placeholder:"Text goes here...",rows:"8"},domProps:{value:e._s(e.note.content)},on:{input:function(t){t.target.composing||(e.note.content=t.target.value)}}}),e._v(" "),n("button",{attrs:{type:"button"},on:{click:e.remove}},[n("i",{staticClass:"fa fa-trash-o",attrs:{"aria-hidden":"true"}})]),e._v(" "),n("button",{attrs:{type:"submit"}},[e._v("Done")])])]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"alerts"},[n("transition",{attrs:{name:"expand"}},e._l(e.alerts,function(t){return n("div",{class:t.type},[n("p",[e._v("\n        "+e._s(t.message)+"\n      ")])])}))],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("create-note-form"),e._v(" "),n("notes"),e._v(" "),n("update-modal")],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("header-bar"),e._v(" "),n("alerts",{attrs:{alerts:e.alerts}}),e._v(" "),n("router-view")],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"note"},[n("h2",[e._v(e._s(e.note.title))]),e._v(" "),n("pre",[e._v(e._s(e.note.content))]),e._v(" "),n("button",{attrs:{type:"button"},on:{click:function(t){t.stopPropagation(),e.remove(t)}}},[n("i",{staticClass:"fa fa-trash-o",attrs:{"aria-hidden":"true"}})]),e._v(" "),n("button",{staticClass:"edit",attrs:{type:"button"},on:{click:e.updateModal}},[n("i",{staticClass:"fa fa-pencil",attrs:{"aria-hidden":"true"}})])])},staticRenderFns:[]}},,function(e,t){e.exports={apiKey:"AIzaSyApvQLzAUd1ZTLX-V-YsxJEHfUU0B0oL90",authDomain:"note-vuefire.firebaseapp.com",databaseURL:"https://note-vuefire.firebaseio.com",storageBucket:"note-vuefire.appspot.com",messagingSenderId:"928050884511"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(21),s=n.n(a),r=n(54),o=n.n(r),i=n(16),u=n(57),c=n.n(u),l=n(56),d=n.n(l),f=n(55),v=n.n(f);s.a.use(c.a);var p=new c.a({routes:[{name:"notes",path:"/",component:d.a,alias:"/notes",meta:{auth:!0}},{name:"auth",path:"/auth",component:v.a}]});p.beforeEach(function(e,t,n){e.meta.auth&&!i.a.getAuth()?n({name:"auth"}):n()}),new s.a({el:"#app",template:"<App/>",components:{App:o.a},router:p})}],[144]);