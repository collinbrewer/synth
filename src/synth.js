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

   var extend=require("extend");

   var registry={};

   var Synth={

      /**
       * Register a new generator
       *
       * @param {string} type - The type of generator
       * @param {function} generator - The generator function
       */
      register: function(type, generator){
         registry[type]={
            "generator":generator,
            "extensions":{},
            "extenders":[]
         };
      },

      /**
       * Detect if a generator is already registered
       *
       * @param {string} type - The type of generator
       * @return {boolean} True if the generator is already registered
       */
      isRegistered: function(type){
         return (type in registry);
      },

      /**
       * Extend an existing generator
       *
       * @param {string} type - The type of the existing generator to extend]
       * @param {mixed} extension - An object containing extensions to be deeply
       * applied to the generated result or a function that extends the generated
       * result.  Function should follow the form: function(generated){...}
       */
      extend: function(type, extension){

         if(typeof(extension)==="object")
         {
            extend(true, registry[type].extensions, extension);
         }
         else
         {
            registry[type].extenders.push(extension);
         }
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
         var registered=registry[type];

         if(registered)
         {
            // generate
            synthed=registered.generator(meta, context, name);

            // apply extensions
            extend(synthed, registered.extensions);

            // run custom extenders
            for(var extenders=registered.extenders, i=0, l=extenders.length, extender; i<l, (extender=extenders[i++]);)
            {
               extender(synthed);
            }

            // put in context
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
