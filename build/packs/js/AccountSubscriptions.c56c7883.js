(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AccountSubscriptions"],{"1d08":function(n,t,e){},"2d1f":function(n,t,e){n.exports=e("b606")},5176:function(n,t,e){n.exports=e("51b6")},"51b6":function(n,t,e){e("a3c3"),n.exports=e("584a").Object.assign},"6ca9":function(n,t,e){},8897:function(n,t,e){"use strict";var s=e("1d08"),a=e.n(s);a.a},9306:function(n,t,e){"use strict";var s=e("c3a1"),a=e("9aa9"),c=e("355d"),i=e("241e"),r=e("335c"),o=Object.assign;n.exports=!o||e("294c")(function(){var n={},t={},e=Symbol(),s="abcdefghijklmnopqrst";return n[e]=7,s.split("").forEach(function(n){t[n]=n}),7!=o({},n)[e]||Object.keys(o({},t)).join("")!=s})?function(n,t){var e=i(n),o=arguments.length,l=1,u=a.f,h=c.f;while(o>l){var f,m=r(arguments[l++]),d=u?s(m).concat(u(m)):s(m),b=d.length,p=0;while(b>p)h.call(m,f=d[p++])&&(e[f]=m[f])}return e}:o},"9c60":function(n,t,e){var s=e("63b6"),a=e("13c8")(!0);s(s.S,"Object",{entries:function(n){return a(n)}})},a3c3:function(n,t,e){var s=e("63b6");s(s.S+s.F,"Object",{assign:e("9306")})},b606:function(n,t,e){e("9c60"),n.exports=e("584a").Object.entries},b6c6:function(n,t,e){"use strict";var s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("header",{staticClass:"breadcrumbs"},[e("router-link",{staticClass:"title-h2 breadcrumbs__link",attrs:{to:{name:"account-subscriptions"}}},[n._v("\n    Выборка\n  ")]),e("router-link",{staticClass:"title-h2 breadcrumbs__link",attrs:{to:{name:"account-settings"}}},[n._v("\n    Настройки\n  ")])],1)},a=[],c={name:"Breadcrumbs"},i=c,r=(e("e30f"),e("2877")),o=Object(r["a"])(i,s,a,!1,null,"79c1f8a9",null);t["a"]=o.exports},cd23:function(n,t,e){"use strict";e.r(t);var s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("form",{staticClass:"account-subscriptions mb-section",on:{submit:function(t){return t.preventDefault(),n.onFormSubscriptionsSubmit(t)},reset:function(t){return t.preventDefault(),n.onFormSubscriptionsReset(t)}}},[e("Breadcrumbs"),n.showWarning?e("p",{staticClass:"account-subscriptions__warning text-norm"},[n._v("\n    Рассылка телепрограммы осуществляется еженедельно в ночь с воскресенья на понедельник.\n    "),e("span",{staticClass:"icon-close-warning",on:{click:n.onWarningIconCloseClick}})]):n._e(),e("div",{staticClass:"account-subscriptions__title-wrap"},[e("h3",{staticClass:"title-h3"},[n._v("\n      Телеканалы для получения телепрограммы:\n    ")]),e("div",[e("button",{staticClass:"link",on:{click:function(t){return t.preventDefault(),n.chooseOn("channels")}}},[n._v("\n        Выбрать все\n      ")]),e("button",{staticClass:"link",on:{click:function(t){return t.preventDefault(),n.removeSelection("channels")}}},[n._v("\n        Снять выделение\n      ")])])]),e("div",{staticClass:"wrapper account-subscriptions__wrapper"},[e("div",{staticClass:"account-subscriptions__left"},n._l(n.optionsChannelsLeft,function(t){return e("div",{key:t.channel_id,staticClass:"col"},[e("label",{staticClass:"label-checkbox",class:{"label-checkbox_checked":n.form.channels[t.channel_id]}},[e("input",{directives:[{name:"model",rawName:"v-model",value:n.form.channels[t.channel_id],expression:"form.channels[channel.channel_id]"}],attrs:{type:"checkbox","true-value":1,"false-value":0,hidden:""},domProps:{checked:Array.isArray(n.form.channels[t.channel_id])?n._i(n.form.channels[t.channel_id],null)>-1:n._q(n.form.channels[t.channel_id],1)},on:{change:function(e){var s=n.form.channels[t.channel_id],a=e.target,c=a.checked?1:0;if(Array.isArray(s)){var i=null,r=n._i(s,i);a.checked?r<0&&n.$set(n.form.channels,t.channel_id,s.concat([i])):r>-1&&n.$set(n.form.channels,t.channel_id,s.slice(0,r).concat(s.slice(r+1)))}else n.$set(n.form.channels,t.channel_id,c)}}}),n._v("\n          "+n._s(t.name)+"\n        ")])])}),0),e("div",{staticClass:"account-subscriptions__right"},n._l(n.optionsChannelsRight,function(t){return e("div",{key:t.channel_id,staticClass:"col"},[e("label",{staticClass:"label-checkbox",class:{"label-checkbox_checked":n.form.channels[t.channel_id]}},[e("input",{directives:[{name:"model",rawName:"v-model",value:n.form.channels[t.channel_id],expression:"form.channels[channel.channel_id]"}],attrs:{type:"checkbox","true-value":1,"false-value":0,hidden:""},domProps:{checked:Array.isArray(n.form.channels[t.channel_id])?n._i(n.form.channels[t.channel_id],null)>-1:n._q(n.form.channels[t.channel_id],1)},on:{change:function(e){var s=n.form.channels[t.channel_id],a=e.target,c=a.checked?1:0;if(Array.isArray(s)){var i=null,r=n._i(s,i);a.checked?r<0&&n.$set(n.form.channels,t.channel_id,s.concat([i])):r>-1&&n.$set(n.form.channels,t.channel_id,s.slice(0,r).concat(s.slice(r+1)))}else n.$set(n.form.channels,t.channel_id,c)}}}),n._v("\n          "+n._s(t.name)+"\n        ")])])}),0)]),e("div",{staticClass:"account-subscriptions__title-wrap"},[e("h3",{staticClass:"title-h3"},[n._v("\n      Форматы телепрограммы:\n    ")]),e("div",[e("button",{staticClass:"link",on:{click:function(t){return t.preventDefault(),n.chooseOn("formats")}}},[n._v("\n        Выбрать все\n      ")]),e("button",{staticClass:"link",on:{click:function(t){return t.preventDefault(),n.removeSelection("formats")}}},[n._v("\n        Снять выделение\n      ")])])]),e("div",{staticClass:"wrapper wrapper_200 account-subscriptions__wrapper_200"},n._l(n.form.formats,function(t,s){return e("label",{key:s,staticClass:"label-checkbox",class:{"label-checkbox_checked":n.form.formats[s]}},[e("input",{directives:[{name:"model",rawName:"v-model",value:n.form.formats[s],expression:"form.formats[format]"}],attrs:{type:"checkbox","true-value":1,"false-value":0,hidden:""},domProps:{checked:Array.isArray(n.form.formats[s])?n._i(n.form.formats[s],null)>-1:n._q(n.form.formats[s],1)},on:{change:function(t){var e=n.form.formats[s],a=t.target,c=a.checked?1:0;if(Array.isArray(e)){var i=null,r=n._i(e,i);a.checked?r<0&&n.$set(n.form.formats,s,e.concat([i])):r>-1&&n.$set(n.form.formats,s,e.slice(0,r).concat(e.slice(r+1)))}else n.$set(n.form.formats,s,c)}}}),n._v("\n      "+n._s(s)+"\n    ")])}),0),e("button",{staticClass:"btn-norm",attrs:{type:"submit"}},[n._v("\n    Сохранить изменения\n  ")]),e("button",{staticClass:"btn-border account-subscriptions__btn-reset",attrs:{type:"reset"}},[n._v("\n    Отмена\n  ")])],1)},a=[],c=e("bd86"),i=e("5176"),r=e.n(i),o=e("a4bb"),l=e.n(o),u=(e("ac6a"),e("2d1f")),h=e.n(u),f=e("cebc"),m=e("2f62"),d=e("d017"),b=e("4f6b"),p=e("864e"),_=e("b6c6"),v={name:"AccountSubscriptions",components:{Breadcrumbs:_["a"]},metaInfo:{titleTemplate:"Выборка | %s"},data:function(){return{form:{channels:[],formats:{XLSX:0,JSON:0,XML:0}},checkbox:{},showWarning:!0}},computed:Object(f["a"])({},Object(m["b"])(["channels","user"]),{optionsChannels:function(){return this.channels.length?this.channels.map(function(n){return n.attributes}):[]},optionsChannelsLeft:function(){return this.optionsChannels.length?this.optionsChannels.slice(0,Math.ceil(this.optionsChannels.length/2)):[]},optionsChannelsRight:function(){return this.optionsChannels.length?this.optionsChannels.slice(Math.ceil(this.optionsChannels.length/2)+1):[]}}),beforeMount:function(){this.getChannel(),this.showWarning=!localStorage.getItem("AccountSubscriptionHideWarning")},methods:{onFormSubscriptionsSubmit:function(){var n=new FormData,t=h()(this.form.channels).reduce(function(n,t){return t[1]&&n.push(t[0]),n},[]),e=h()(this.form.formats).reduce(function(n,t){return t[1]&&n.push(t[0]),n},[]);n.append("user[formats][]",e),n.append("user[channels][]",t),this.$store.dispatch(d["i"],{params:n,userId:this.user.id}).then(function(){Object(p["e"])("Данные сохранены")})},onFormSubscriptionsReset:function(){this.removeSelection("formats"),this.removeSelection("channels"),this.addCheckedParams()},chooseOn:function(n){var t=this;l()(this.form[n]).forEach(function(e){return t.form[n][e]=1,!1})},removeSelection:function(n){var t=this;l()(this.form[n]).forEach(function(e){return t.form[n][e]=0,!1})},onWarningIconCloseClick:function(){this.showWarning=!1,localStorage.setItem("AccountSubscriptionHideWarning","1")},getChannel:function(){var n=this;this.channels.length?(this.initChannel(),this.addCheckedParams()):this.$store.dispatch(b["a"]).then(function(){n.initChannel(),n.addCheckedParams()})},initChannel:function(){this.form.channels=this.channels.reduce(function(n,t){return r()({},n,Object(c["a"])({},t.attributes.channel_id,0))},{})},addCheckedParams:function(){var n=this;this.user.attributes.channels&&this.user.attributes.channels.forEach(function(t){n.form.channels[t]=1}),this.user.attributes.formats&&this.user.attributes.formats.forEach(function(t){n.form.formats[t.toUpperCase()]=1})}}},C=v,k=(e("8897"),e("2877")),g=Object(k["a"])(C,s,a,!1,null,"720e8faa",null);t["default"]=g.exports},e30f:function(n,t,e){"use strict";var s=e("6ca9"),a=e.n(s);a.a}}]);
//# sourceMappingURL=AccountSubscriptions.c56c7883.js.map