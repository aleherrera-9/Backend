const fs = require('fs/promises');

class Container {
    constructor() { }

    async getAll() {
        try {
            const files = await fs.readFile('./DB/list.txt', 'utf-8');
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
            await fs.writeFile('./DB/list.txt', JSON.stringify(allFiles, null, 2));
        } catch (error) {
            return 'error al guardar'
        }
    }
    async getById(id) {
        try {
            const allFiles = await this.getAll();
            const indexFile = allFiles.findIndex((element) => element.id == id);
            const oldObj = allFiles.find((element) => element.id == id);
            if (indexFile == -1) {
                return 'no encontrado'
            } else {
                return `Titulo del objeto encontrado: ${oldObj.tittle}`
            }
        } catch (error) {
            return 'no encontrado'
        }
    }
    async deleteById(id) {
        try {
            const allFiles = await this.getAll();
            const indexFile = allFiles.findIndex((element) => element.id == id);
            //guarda el eliminado para luego mostrarlo
            const oldObj = allFiles.find((element) => element.id == id);
            if (indexFile == -1) {
                return 'no encontrado'
            } else {
                allFiles.splice(indexFile, 1);
                await fs.writeFile(this.path, JSON.stringify(allFiles, null, 2));
                return `Titulo del objeto eliminado: ${oldObj.tittle}`;
            }
        } catch (error) {
            return 'no  se pudo eliminar'
        }
    }
    async deleteAll() {
        try {
            const allFiles = await this.getAll();
            allFiles.splice(0, allFiles.length);
            await fs.writeFile(this.path, JSON.stringify(allFiles, null, 2));
            return 'Se eliminaron todos los archivos';
        } catch (error) {
            return 'no se pudo eliminar el array';
        }
    }
}

module.exports = Container;
