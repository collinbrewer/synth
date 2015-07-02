/**
 * Synth: A factory for synthesizing classes & functions from a schema or model.
 *        Establishes and maintains an object graph when provided a full model
 *        Validates property types
 *
 * Synth can operate at runtime or can be used at compile time.
 *
 * Usage: Synth.synthesizeClass(classSchema);
 */

(function(){

   var generators={};

   var Synth={

      /**
       * Register a new generator
       *
       * @param {string} type - The type of generator
       * @param {function} generator - The generator function
       */
      register: function(type, generator){
         generators[type]=generator;
      },

      /**
       * Synthesize something using a generator
       *
       * @param {string} type - The type of generator
       * @param {object} meta - Arbitrary data passed to the generator
       * @param {object} context - An object that receives the generated result
       * @param {string} name - The name the results will be stored at on the context
       * @return {mixed} The newly synthesized result
       */
      generate: function(type, meta, context, name){

         var synthed;

         if(type in generators)
         {
            synthed=generators[type](meta, context, name);

            name!==null && name!==undefined && (context[name]=synthed);
         }
         else
         {
            throw new Error("Unrecognized schema type '" + type + "'");
         }

         return synthed;
      }
   };

   // expose
   (function(mod, name){
      (typeof(module)!=="undefined" ? (module.exports=mod) : ((typeof(define)!=="undefined" && define.amd) ? define(function(){ return mod; }) : (window[name]=mod)));

      global[name]=mod;
   })(Synth, "Synth");

})();
