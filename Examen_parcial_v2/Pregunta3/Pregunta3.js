class Detalle {
    /*
    Definimos las propiedadesdel evento, aqui agregue a id para que sea mas facil el proceso de eliminar o reemplazar el evento
    */
    constructor(id, titulo, descripcion, fecha, ubicacion) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.fecha = fecha;
      this.ubicacion = ubicacion;
    }
  /// ediar el evento para ello debe ingresar el nuevo titulo 
    editarEvento(nuevoTitulo) {
      if (nuevoTitulo && nuevoTitulo.trim() !== '') {
        this.titulo = nuevoTitulo;
      } else {
        throw new Error("El evento no se puede editar con un título vacío");
      }
    }
  //MOstrart los eventos
    getDetalles() {
      return `${this.titulo} - ${this.fecha} en ${this.ubicacion}`;
    }
  }
  
  class Eventos {
    constructor() {
      this.eventos = [];//Lista para almacenar todos los eventos
    }
  //agregar el evento manejado promesas
    agregarevento(evento) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.eventos.push(evento);
          resolve(evento);
        }, 100);
      });
    }
  //editar para ello debe ingresar el id y nuevotiulo
  //id para encontrar el titulo aqui llamamos a la funcion de editar evento de la clase de detalle
  //caso contrario decimos que sucedio un error
    editar(id, nuevoTitulo) {
      return new Promise((resolve, reject) => {
        const evento = this.eventos.find(e => e.id === id);
        if (evento) {
          try {
            evento.editarEvento(nuevoTitulo);
            resolve(evento);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error("Evento no encontrado"));
        }
      });
    }
  /*
la funcion de eliminar sea mas facil usamos el id 
  */
    eliminareventos(id) {
      return new Promise((resolve, reject) => {
        const index = this.eventos.findIndex(e => e.id === id);
        if (index !== -1) {
          const eventoEliminado = this.eventos.splice(index, 1)[0];
          resolve(eventoEliminado);
        } else {
          reject(new Error("Evento no encontrado"));
        }
      });
    }
  }
  
  const prob1 = new Eventos();
  
  async function agregarEvent() {
    try {
      const nuevoevento = new Detalle(1, "Tarea", "Proyectos", 2024, "Lima");
      const eventoAgregado = await prob1.agregarevento(nuevoevento);
      console.log(`Evento añadido: ${eventoAgregado.titulo}`);
  
      const eventoEditado = await prob1.editar(1, "Cocina");
      console.log(`Evento editado: ${eventoEditado.titulo}`);
  
      const eventoEliminado = await prob1.eliminareventos(1);
      console.log(`Evento eliminado: ${eventoEliminado.id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  agregarEvent();
  
  export { Eventos, Detalle, agregarEvent };