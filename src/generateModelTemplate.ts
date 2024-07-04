export function generateModelTemplate(name: string, language: string): string {
  const extension = language === "js" ? "js" : "ts";
  return `// ${name}.model.${extension}
  ${
    language === "ts"
      ? 'import mongoose, { Schema, Document } from "mongoose";'
      : 'const mongoose = require("mongoose");'
  }
  
  ${
    language === "ts"
      ? `interface I${name} extends Document {
    // Define your properties here
    name: string;
    // Add more properties as needed
  }`
      : ""
  }
  
  const ${name}Schema = new ${
    language === "ts" ? "Schema" : "mongoose.Schema"
  }({
    name: { type: String, required: true },
    // Add more fields as needed
  });
  
  ${
    language === "ts"
      ? `export default mongoose.model<I${name}>('${name}', ${name}Schema);`
      : `module.exports = mongoose.model('${name}', ${name}Schema);`
  }
  `;
}
