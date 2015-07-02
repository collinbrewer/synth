var should=require("chai").should();
var Synth=require("../index.js");

describe("Registering", function(){

   it("should register a new schema type", function(){

      Synth.register("qwer", function(){ return function(){}; });

      Synth.generate("qwer", {"pointless":"options"}).should.be.a("function");
   });
});
