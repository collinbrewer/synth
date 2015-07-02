# Synth
Synth is an extensible interface for defining generators that provide output based on a given configuration.

An example use case is synthesizing an entire object graph from a static schema.

## Usage
The primary use case is to generate a complete object graph from a schema:

```javascript
var schema=Schema.load({"schemaType":"object-graph", "entities":{"Todo":{"properties":{"title":"string"}}}});
var Graph=Synth.generate("object-graph", schema);

var todo=new Graph.Todo(); // creates a new 'todo' object with setTitle and getTitle methods
```

Another more abstract example is to create a custom schema for form field, then defining generators, allowing for arbitrary data to be parsed and processed:

```javascript
var schema={
   schemaType : "form",
   fields: [
      {
         schemaType: "textfield",
         name: "email"
      },
      {
         schemaType: "textarea",
         name: "message"
      }
   ]
};

Synth.register("textField", function(schema){ return "<input type='text' />"});
Synth.register("textarea", function(schema){ return "<textarea></textarea>"});
Synth.register("form", function(schema){ return schema.fields.map(Synth.generate); });

Synth.generate("form", schema);
```

You can also walk abstract data by using the dynamic mapping:

```javascript
var userGeneratedObject={...};

Synth.resolve=function(config, context){ return "custom"; });
```

## Extensibility
Synth can be customized by defining methods to be called for various events:

- ```beforeCreate``` and ```afterCreate```  
Called before and after an entity is initialized.

- ```beforeUpdate``` and ```afterUpdate```  
Called before and after an entity is updated.

- ```beforeDelete``` and ```afterDelete```  
Caled before and after an entity is deleted.

## Persistence
Synth exposes the ```requestPatch``` and ```applyPatch``` methods for persisting changes.
