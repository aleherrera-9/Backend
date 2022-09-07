const fs = require('fs/promises');
const moment=require('moment');
class Container {
    constructor(path){ this.path=path; }
   
    async getAll() {
        try {
            const files = await fs.readFile(this.path, 'utf-8');
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
            const newFile = { id: newId, ...obj,timestamp:moment().format("DD/MM/YYYY hh:mm:ss") }
            allFiles.push(newFile)
            await fs.writeFile(this.path, JSON.stringify(allFiles, null, 2));
            return newId;
        } catch (error) {
            return 'error al guardar'
        }
    }
    async update(obj,file) {
        const allFiles = await this.getAll();
        if(file!=null){
            const found = allFiles.find(element => element.id == obj.id);
            const newFile = allFiles.find(element => element.id == file.id);
            newFile.productos.push({id: found.id, ...obj,timestamp:moment().format("DD/MM/YYYY hh:mm:ss") })
            await fs.writeFile(this.path, JSON.stringify(allFiles, null, 2));
        }else{
            const found = allFiles.find(element => element.id == obj.id);
            found.id=obj.id;
            found.title = obj.title;
            found.description=obj.description;
            found.price = obj.price;
            found.cod=obj.cod;
            found.thumbnail = obj.thumbnail;
            found.stock=obj.stock;
            found.timestamp=moment().format("DD/MM/YYYY hh:mm:ss");
            await fs.writeFile(this.path, JSON.stringify(allFiles, null, 2));
        }
        
    }
    async getById(id) {
        try {
            const allFiles = await this.getAll();
            const indexFile = allFiles.findIndex((element) => element.id == id);
            const oldObj = allFiles.find((element) => element.id == id);
            if (indexFile == -1) {
                return 'Producto no encontrado'
            } else {
                return oldObj;
            }
        } catch (error) {
            return 'Producto no encontrado'
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
                return `ID eliminado: ${oldObj.id}`;
            }
        } catch (error) {
            return 'no  se pudo eliminar'
        }
    }
}
module.exports = Container;
