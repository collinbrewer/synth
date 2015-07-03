var should=require("chai").should();
var Synth=require("../index.js");

context("#register", function(){

   it("should register a new schema type", function(){

      Synth.register("qwer", function(){ return function(){}; });
   });
});

context("#isRegistered", function(){

   it("should check the registry", function(){

      Synth.register("qwer", function(){ return function(){}; });

      Synth.generate("qwer", {"pointless":"options"}).should.be.a("function");
   });
});

context("#generate", function(){

   beforeEach(function(){

      Synth.register("qwer", function(){ return function(){}; });
   });

   it("should generate a function", function(){

      Synth.generate("qwer", {"pointless":"options"}).should.be.a("function");
   });
});

context("#extend", function(){

   beforeEach(function(){
      Synth.register("qwer", function(){ return function(){}; });
   });

   it("should register extension", function(){

      Synth.extend("qwer", {
         foo: "bar"
      });
   });

   it("should apply an extension", function(){

      Synth.extend("qwer", {
         getExtended: function(){ return true; }
      });

      var generated=Synth.generate("qwer");

      generated.should.have.property("getExtended");
      generated.getExtended.should.be.a("function");
   });

   it("should deeply apply an extension", function(){

      Synth.extend("qwer", {
         prototype: {
            getDeeplyExtended: function(){ return true; }
         }
      });

      var Qwer=Synth.generate("qwer");

      var qwer=new Qwer();

      qwer.should.have.property("getDeeplyExtended");
      qwer.getDeeplyExtended.should.be.a("function");
   });

   it("should run a custom extender", function(){

      Synth.extend("qwer", function extendFurther(dest){
         dest.isCustomExtended=true;
         dest.prototype.getCustomExtended=function(){ return true; };
      });

      var Qwer=Synth.generate("qwer");

      Qwer.should.have.property("isCustomExtended");
      Qwer.isCustomExtended.should.equal(true);

      var qwer=new Qwer();

      qwer.should.have.property("getCustomExtended");
      qwer.getCustomExtended.should.be.a("function");
   });
});
