// dependencies
var Synth=require("./src/synth.js");

// expose
(function(mod, name){
   (typeof(module)!=="undefined" ? (module.exports=mod) : ((typeof(define)!=="undefined" && define.amd) ? define(function(){ return mod; }) : (window[name]=mod)));

   global[name]=mod;
})(Synth, "Synth");
