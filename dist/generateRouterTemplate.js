export function generateRouterTemplate(name, language) {
    const extension = language === "js" ? "js" : "ts";
    return `// ${name}.router.${extension}
  ${language === "ts"
        ? 'import express, { Router } from "express";'
        : 'const express = require("express");'}
  ${language === "ts"
        ? `import ${name}Controller from './${name}.controller';`
        : `const ${name}Controller = require('./${name}.controller');`}
  
  const router${language === "ts" ? ": Router" : ""} = express.Router();
  
  router.get('/', ${name}Controller.getAll);
  router.get('/:id', ${name}Controller.getById);
  router.post('/', ${name}Controller.create);
  router.put('/:id', ${name}Controller.update);
  router.delete('/:id', ${name}Controller.delete);
  
  ${language === "ts" ? "export default router;" : "module.exports = router;"}
  `;
}
