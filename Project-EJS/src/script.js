const fs = require('fs/promises');

class Container {
    constructor() { }

    async getAll() {
        try {
            const files = await fs.readFile('./DB_EJS/list.txt', 'utf-8');
            return (JSON.parse(files));
        } catch (error) {
            return []
        }
    }
  
    async save(obj) {
        try {
            const allFiles = await this.getAll();
            let newId;
            if (allFiles.length == 0) {
                newId = 1
            }
            else {
                newId = allFiles[allFiles.length - 1].id + 1
            }
            const newFile = { id: newId, ...obj }
            allFiles.push(newFile)
            await fs.writeFile('./DB_EJS/list.txt', JSON.stringify(allFiles, null, 2));
        } catch (error) {
            return 'error al guardar'
        }
    }
   
}
module.exports = Container;
