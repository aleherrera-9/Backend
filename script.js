
let petList = [];
let bookList = [];
class Pet {
    constructor(apellido, mascotas) {
        this.apellido = apellido
        this.mascotas = mascotas
    }
}
class Book {
    constructor(apellido, libro, autor) {
        this.apellido = apellido
        this.libro = libro
        this.autor = autor
    }
}
class Usuario {
    static PetCount = 0;
    constructor(nombre, apellido, libro, autor, mascota) {
        this.nombre = nombre
        this.apellido = apellido
        this.libro = libro
        this.autor = autor
        this.mascota = mascota
    }
    getfullName() {
        return `Nombre de usuario: ${this.nombre} ${this.apellido}`;
    }
    addMascota() {
        petList.push(new Pet(this.apellido, this.mascota));

    }
    countMascotas() {
        var i = 0;
        petList.forEach(element => {
            if (element.apellido == this.apellido) {
                if (element.mascota != 0) {
                    i++;
                }
            }
        });
        if (i != 0) {
            return `Cantidad de mascotas de ${this.nombre} ${i}`;
        }
    }
    addBook() {
        bookList.push(new Book(this.apellido, this.libro, this.autor));
    }
    getBookNames() {
        console.log(`libros de ${this.nombre} :`)
        bookList.forEach(element => {
            if (element.apellido == this.apellido) {
                console.log(element.libro)
            }
        })
    }
}
const user1 = new Usuario('Alejandra', 'Herrera', 'Viaje al fin de la noche', 'Louis-Ferdinand Céline', 'gato');
const user2 = new Usuario('Alejandra', 'Herrera', 'Fahrenheit 451', 'Ray Bradbury', 'serpiente');
const user3 = new Usuario('Pablo', 'Lopez', 'Grandes Esperanzas', 'Charles Dickens', 'perro');
const user4 = new Usuario('Pablo', 'Lopez', 'Fausto', 'Johann Wolfgang von Goethe', 'loro');
const user5 = new Usuario('Pablo', 'Lopez', 'Las metamorfosis', 'Ovidio', 'mono');
console.log(user1.getfullName());
user1.addMascota();
user2.addMascota();
console.log(user1.countMascotas());
console.log(user3.getfullName());
user3.addMascota();
user4.addMascota();
user5.addMascota();
console.log(user3.countMascotas());
user1.addBook();
user2.addBook();
user3.addBook();
user4.addBook();
user5.addBook();
console.log(user1.getBookNames());
console.log(user3.getBookNames());