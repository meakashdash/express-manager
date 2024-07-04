export function generateControllerTemplate(name, language) {
    const extension = language === "js" ? "js" : "ts";
    return `// ${name}.controller.${extension}
  ${language === "ts" ? 'import { Request, Response } from "express";' : ""}
  
  class ${name}Controller {
    async getAll(${language === "ts" ? "req: Request, res: Response" : "req, res"}) {
      try {
        // Implement getAll logic
        res.status(200).json({ message: 'GetAll not implemented' });
      } catch (error) {
        res.status(500).json({ message: 'Error in getAll', error });
      }
    }
  
    async getById(${language === "ts" ? "req: Request, res: Response" : "req, res"}) {
      try {
        // Implement getById logic
        res.status(200).json({ message: 'GetById not implemented' });
      } catch (error) {
        res.status(500).json({ message: 'Error in getById', error });
      }
    }
  
    async create(${language === "ts" ? "req: Request, res: Response" : "req, res"}) {
      try {
        // Implement create logic
        res.status(201).json({ message: 'Create not implemented' });
      } catch (error) {
        res.status(500).json({ message: 'Error in create', error });
      }
    }
  
    async update(${language === "ts" ? "req: Request, res: Response" : "req, res"}) {
      try {
        // Implement update logic
        res.status(200).json({ message: 'Update not implemented' });
      } catch (error) {
        res.status(500).json({ message: 'Error in update', error });
      }
    }
  
    async delete(${language === "ts" ? "req: Request, res: Response" : "req, res"}) {
      try {
        // Implement delete logic
        res.status(200).json({ message: 'Delete not implemented' });
      } catch (error) {
        res.status(500).json({ message: 'Error in delete', error });
      }
    }
  }
  
  ${language === "ts"
        ? `export default new ${name}Controller();`
        : `module.exports = new ${name}Controller();`}
  `;
}
