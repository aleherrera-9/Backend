const fs = require('fs/promises');

class Container {
    constructor() {}
    async getById(id) {
        try {
            const allFiles = await this.getAll();
            const indexFile = allFiles.findIndex((element) => element.id == id);
            const oldObj = allFiles.find((element) => element.id == id);
            if (indexFile == -1) {
                return 'no encontrado'
            } else {
                return ` Producto : ${oldObj.tittle} / ID: ${oldObj.id} / Precio: ${oldObj.price}`
            }
        } catch (error) {
            return 'no encontrado'
        }
    }
    async getAll() {
        try {
            const files = await fs.readFile('./DB/productos.txt', 'utf-8');
            return (JSON.parse(files));
        } catch (error) {
            return []
        }
    }
  
}
module.exports=Container;
