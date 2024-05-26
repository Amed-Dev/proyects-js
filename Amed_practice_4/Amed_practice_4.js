/**
 * @author Amed Inti Pereda Gomez
 */

/* Exercise 1: Almacenar canciones*/ 
let songsArray = ["Mal por ti", "Ricardo Arjona", 2021, "Rock en español", 302];
let songsObject = {
  title: "Mal por ti",
  artist: "Ricardo Arjona",
  year: 2021,
  genre: "Rock en español",
  duration: 302,
};
/* array operations */
console.log(songsArray);
console.log(songsArray[0]);
console.log(songsArray[1]);
// methods
console.log(songsArray.indexOf("Ricardo Arjona"));
/*obejct operations */
console.log(songsObject);
console.log(songsObject.title);
console.log(songsObject["title"]);

// methods
console.log(Object.keys(songsObject));
console.log(Object.values(songsObject));
console.log(Object.entries(songsObject));

/* EXERCISE 2: Modifica el objeto para permitir más de una entrada 
en los atributos artista y género*/
let songsObjectModified = {
  title: "Blues de la notiriedad",
  artist: ["Ricardo Arjona","Gaby Moreno"],
  year: 2021,
  genre: ["Pop","Rock en español", "Argentinian Rock"],
  duration: 302,
};
console.log(songsObjectModified.artist);
console.log(songsObjectModified.artist[0]);
console.log(songsObjectModified["genre"]);

/* EXERCISE 3: declarar objetos para almacenar info de cantantes */

const artist = {
  name: "Ricardo Arjona",
  genre: ["Pop latino", "Pop rock", "Baladas","Blues"],
  songs: [
    { title: "Morir por vivir", album: "Blanco", year: 2020, duration: 245 },
    { title: "El invisible", album: "Blanco", year: 2021, duration: 234 },
    { title: "Tu retrato", album: "Blanco", year: 2020, duration: 225 },
    { title: "Yo me vi (Autoretrato)", album: "Negro", year: 2021, duration: 223 },
    { title: "El bobo", album: "Negro", year: 2021, duration: 249 },
    { title: "De la ilusion al miedo", album: "Negro", year: 2021, duration: 268 },
  ],
};

let song2 = artist.songs[1].year;
console.log(song2);
song2 = 2020;
console.log(song2);


/* EXERCISE 4: definir método para mostrar cancion y artista */
const artist2 = {
  name: "Ricardo Arjona",
  genre: ["Pop latino", "Pop rock", "Baladas", "Blues"],
  songs: [
    { title: "Morir por vivir", album: "Blanco", year: 2020, duration: 245 },
    { title: "El invisible", album: "Blanco", year: 2021, duration: 234 },
    { title: "Tu retrato", album: "Blanco", year: 2020, duration: 225 },
    { title: "Yo me vi (Autoretrato)", album: "Negro", year: 2021, duration: 223 },
    { title: "El bobo", album: "Negro", year: 2021, duration: 249 },
    { title: "De la ilusion al miedo", album: "Negro", year: 2021, duration: 268 },
  ],
  showSongInfo(i) {
    try {
      let song = this.songs[i - 1];
      let response = `${this.name} - ${song.title}`;
      return response;
    } catch {
      return(`Indique un número de canción válido 1-${this.songs.length}`)
    }
  },
};

let song1 = artist2;
console.log(song1.showSongInfo(0)); 

/* EXERCISE 5: definir metodo para convertir la duración de la canción a minutos y segundos */
const artist3 = {
  name: "Ricardo Arjona",
  genre: ["Pop latino", "Pop rock", "Baladas", "Blues"],
  songs: [
    { title: "Morir por vivir", album: "Blanco", year: 2020, duration: 245 },
    { title: "El invisible", album: "Blanco", year: 2021, duration: 234 },
    { title: "Tu retrato", album: "Blanco", year: 2020, duration: 225 },
    { title: "Yo me vi (Autoretrato)", album: "Negro", year: 2021, duration: 223 },
    { title: "El bobo", album: "Negro", year: 2021, duration: 249 },
    { title: "De la ilusion al miedo", album: "Negro", year: 2021, duration: 268 },
  ],
  showSongInfo(i) {
    try {
      let song = this.songs[i - 1];
      let response = `${this.name} - ${song.title}`;
      return response;
    } catch {
      return(`Indique un número de canción válido 1-${this.songs.length}`)
    }
  },
  //método para convertir la duración a forma de minutos y segundos
  showDuration(i) {
    try {
      let song = this.songs[i - 1];
      let minutes = Math.floor(song.duration / 60);
      let seconds = song.duration % 60;
      let response = `${this.name} - ${song.title} - ${minutes}:${seconds.toString().padStart(2,'0')}`;
      return response;
    } catch {
      return(`Indique un número de canción válido 1-${this.songs.length}`)
    }
  },
};

let song3 = artist3;
console.log(song3.showDuration(6)); 

/* EXERCISE 6: web de preguntas*/
