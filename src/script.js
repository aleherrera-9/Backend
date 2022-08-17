const fs = require('fs/promises');

class Container {
    constructor() { }
    async getById(id) {
        try {
            const allFiles = await this.getAll();
            const indexFile = allFiles.findIndex((element) => element.id == id);
            const oldObj = allFiles.find((element) => element.id == id);
            if (indexFile == -1) {
                return 'Producto no encontrado'
            } else {
                return (`<div>
                    <h2>Producto: ${oldObj.id}</h2>
                    <ul>
                    <li>Producto: ${oldObj.tittle}</li>
                        <li>Precio:$${oldObj.price}</li>
                        <img src=" ${oldObj.thumbnail}"/>
                    </ul>
                    <button id=${oldObj.id}method="delete">Eliminar</button>
                </div>
                
                `);
            }
        } catch (error) {
            return 'Producto no encontrado'
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
    async update(obj){
        const allFiles = await this.getAll();
        const found = allFiles.find(element => element.id == obj.id);
        found.tittle=obj.tittle;
        found.price=obj.price;
        found.thumbnail=obj.thumbnail;
        await fs.writeFile('./DB/productos.txt', JSON.stringify(allFiles, null, 2));
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
            await fs.writeFile('./DB/productos.txt', JSON.stringify(allFiles, null, 2));
            return newId;
        } catch (error) {
            return 'error al guardar'
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
                await fs.writeFile('./DB/productos.txt', JSON.stringify(allFiles, null, 2));
                return `Titulo del objeto eliminado: ${oldObj.tittle}`;
            }
        } catch (error) {
            return 'no  se pudo eliminar'
        }
    }
}
module.exports = Container;
