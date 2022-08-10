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
                return `Titulo del objeto encontrado: ${oldObj.tittle}`
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
// async function main() {
//     const file = new Container('../DB/productos.txt');
//     console.log(file.path);
//     // await file.save({ "tittle": "Memoria GeiL DDR4 16GB 3000MHz Orion RGB Black ", "price": 13350, "thumbnail": "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_31969_Memoria_GeiL_DDR4_16GB_3000MHz_Orion_RGB_Black_aa7bb4c0-grn.jpg" });
//     // await file.save({ "tittle": "Gabinete Kolink Observatory Lite Black 4x120mm ARGB Vidrio Templado", "price": 12250, "thumbnail": "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_24191_Gabinete_Kolink_Observatory_Lite_Black_4x120mm_ARGB_Vidrio_Templado_23c44701-grn.jpg" });
//     // await file.save({ "tittle": "UPS Lyonn CTB-800V 800va", "price": 9750, "thumbnail": "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_7367_UPS_Lyonn_CTB-800V_800va_e8522db0-grn.jpg" });
//     console.log(await file.getAll());
//     // console.log(await file.getById(2));
//     // console.log(await file.deleteById(1));
//     // console.log('------------------------Despues de eliminar por ID-----------------------------')
//     // console.log(await file.getAll());
//     // console.log(await file.deleteAll());
// }
// main();