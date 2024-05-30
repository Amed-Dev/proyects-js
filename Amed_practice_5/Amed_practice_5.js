/**
 * @author Amed Inti Pereda Gomez
 */

/* Exercise 1 */
/*De forma textual (no en código) mencione una clase y sus propiedades, 
y mencione por lo menos 2 objetos de esa clase. */

/*
class: libro
propiedades:
- titulo string
- autor string
- paginas integer
- fecha publicación date
- género string

instancias: objetos
libro1 = {
          título: "El quijote", 
          autor: "Miguel Cervantes", 
          páginas: 1056, 
          fecha_publicación:05/1967, 
          género: "Novela" 
        }
libro2 = {
          título: "Cien años de soledad", 
          autor: "Gabriel García Márquez", 
          páginas: 471, 
          fecha_publicacion: 12/01/2012, 
          género: "Novela"
        }

class: trivia
propiedades:
- Categoria string
- autor string
- tema string
- Preguntas array
- Estadisticas array

instancias: objetos
trivia1 = {
            Categoria: "Ciencias", 
            autor: "José Santaolaya", 
            tema: "Atrologia", 
            preguntas:[
              {
                nro:1,pregunta: "¿Cuál es el tercer planeta del sistema sola", 
                opciones:[
                  {1: "Tierra"}, 
                  {2:"Marte"}], 
                correct: 1
              },
              {nro:2,pregunta: "Fenomeno astrologico que ocurre cuando la luna inpide el paso la luz solar:", 
              opciones:[
                {1:"Eclipse solar"},
                {2:"Eclipse lunar}", 
              correct:2}]}
            ], 
            estadisticas: {correctas: 0, incorrectas:0, no_respondidas:0} }
trivia2 = {
            Categoria: "Programación", 
            autor: "Midudev", 
            tema: "Estructuras repetitivas", 
            preguntas: [
              {
                nro:1,pregunta: "Es una estructura repetitiva:", 
                opciones:[
                  {1:"for"},
                  {2:"Let"}
                ]
              },
              {
                nro:2,pregunta: "For y while son dos estructuras repetitivas:", 
                opciones:[
                  {1:"True"},
                  {2:"False"}
                ]
              }
            ],      
            estadisticas: {correctas: 0, incorrectas:0, no_respondidas:0}}

*/

/* EXERCISE 2: La clase propuesta en el ejercicio 1 implementar en Javascript   */

class Trivia {
  constructor(categoria, autor, tema, preguntas, estadisticas) {
    this.categoria = categoria;
    this.autor = autor;
    this.tema = tema;
    this.preguntas = preguntas;
    this.estadisticas = estadisticas;
  }
}

let trivia1 = new Trivia(
  "Ciencias",
  "José Santaolaya",
  "Astrología",
  [
    {
      nro: 1,
      pregunta: "¿Cuál es el tercer planeta del sistema solar?",
      opciones: [{ 1: "Tierra" }, { 2: "Marte" }, { correct: 1 }],
    },
    {
      nro: 2,
      pregunta:
        "Fenómeno astrológico que ocurre cuando la luna impide el paso de la luz solar:",
      opciones: [
        { 1: "Eclipse solar" },
        { 2: "Eclipse lunar" },
        { correct: 2 },
      ],
    },
  ],
  {
    correctas: 0,
    incorrectas: 0,
    no_respondidas: 0,
  }
);

let trivia2 = new Trivia(
  "Programación",
  "Midudev",
  "Estructuras repetitivas",
  [
    {
      nro: 1,
      pregunta: "Es una estructura repetitiva:",
      opciones: [{ 1: "for" }, { 2: "Let" }, { correct: 1 }],
    },
    {
      nro: 2,
      pregunta: "For y while son dos estructuras repetitivas:",
      opciones: [{ 1: "True" }, { 2: "False" }, { correct: 2 }],
    },
  ],
  {
    correctas: 0,
    incorrectas: 0,
    no_respondidas: 0,
  }
);
/* EXERCISE 4*/
console.log(trivia1);
console.log(trivia2);

/* EXERCISE 3: Implementar la clase mascota */
class pet {
  constructor(name, species, race, age, color, weight, height, owner) {
    this.name = name;
    this.species = species;
    this.race = race;
    this.age = age;
    this.color = color;
    this.weight = weight;
    this.height = height;
    this.owner = owner;
  }

  // aquí se implementa la lógica del EJERCICIO 6
  showPet() {
    return `Mascota: ${this.name}, es un ${this.species}, tiene ${this.age} años y su dueño es ${this.owner}`;
  }
  // aquí se presenta la parte del EJERCICIO 7
  updateAge(newAge) {
    this.age = newAge;
    return `La edad de ${this.name} se cambio a ${this.age} años - Exitosamente`;
  }
}

/* EXERCISE 5: instancias una clase */

const pet1 = new pet(
  "Boby",
  "perro",
  "Dogo Argentino",
  3,
  "White",
  30,
  62,
  "Amed Pereda"
);
console.log(pet1.showPet());
const pet2 = new pet("Luna", "gato", "Chausie", 2, "brown", 5, 40, "Noly");
console.log(pet2.showPet());
console.log(pet2.updateAge(3));

/*  EXERCISE 8: De forma textual (no en código) mencione una clase padre y 
dos clases hijas, incluye propiedades y métodos.*/
/* 
class Padre: trivia
properties:
- categoria  string
- autor string
- tema string
- preguntas array
- estadisticas array
métodos:
- agregarPregunta(pregunta)
- EvaluarRespuesta(respuesta)
- MostrarEstadsitica()

//clase hija 1: triviaCiencias
propiedades adicionales_
- AreaEspecifica string
- nivelDificulta number
métodos adicionales:
- AgregarPreguntaCiencia(pregunta)
- EvaluarRespuestaCiencia(respuesta)

//clase hija 2: triviaProgramación
Propiedades adicionales
- LenguajeProgramación string
- ParadigmaDeProgramación string
Métodos adicionales:
- AgregarPreguntaProgramación(pregunta)
- EvaluarRespuestaProgramación(respuesta)
- ModificarElTiempoDeDuración(duración)



*/

/* EXERCISE 9: DEfinir 2 clases hijas para la clase mascota */

class Felino extends pet {
  constructor(name, age, species, weight, height, color, fur, behavior) {
    super(name, age, species, weight, height, color);
    this.fur = fur;
    this.behavior = behavior;
  }
  hacerSonido() {
    return "Miau Miau";
  }
  cazarPresa(pet) {
    return pet == "gato" ? "Ratón" : "Filete de carne";
  }
}

const felino1 = new Felino(
  "Tom",
  2,
  "gato",
  5,
  40,
  "black",
  "corto",
  "Jugueton"
);
console.log(felino1.hacerSonido());//'Miau Miau'
console.log(felino1.cazarPresa("gato")); //'Ratón'

class Ave extends pet {
  constructor(name, age, species, weight, height, color, plumage, habitat) {
    super(name, age, species, weight, height, color);
    this.plumage = plumage;
    this.habitat = habitat;
  }
  cantar() {
    return `${this.name} esta cantando`;
  }
  volar() {
    return `${this.name} esta volando`;
  }
}

const ave1 = new Ave(
  "Piolin",
  1,
  "canario",
  300,
  10,
  "yellow",
  "de contorno",
  "jardín"
);
console.log(ave1.cantar()); //'Piolin esta cantando'
console.log(ave1.volar()); //'Piolin esta volando'

/* EXERCISE 10: */
// solución en el archivo main.js
