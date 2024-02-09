export class Utils {
    
  static formatDateToActualDate(dateToFormat: Date, showHours: boolean): string {
    // const fechaLocal = new Date(dateToFormat.toLocaleString());

    if(dateToFormat.getHours() == 0) {
      dateToFormat.setHours(23,59,59);
    }
    const fechaLocal = dateToFormat;

    // Formatear la fecha y hora en un formato similar a LocalDateTime
    let fechaHoraFormateada = `${fechaLocal.getFullYear()}-${this.pad(fechaLocal.getMonth() + 1)}-${this.pad(fechaLocal.getDate())}`;
    fechaHoraFormateada+= (showHours)?`T${this.pad(fechaLocal.getHours())}:${this.pad(fechaLocal.getMinutes())}:${this.pad(fechaLocal.getSeconds())}`:'';
    
    return fechaHoraFormateada;

  }

  static formatDateToInitialDate(dateToFormat: Date, sustractDays: number, sustractMonth: number, showHours: boolean): string {

    // Convertir la fecha y hora a la zona horaria local del usuario
    let fechaLocal = new Date(dateToFormat.toLocaleString());

    fechaLocal.setFullYear(dateToFormat.getFullYear());
    fechaLocal.setMonth(dateToFormat.getMonth() - sustractMonth);
    fechaLocal.setDate(dateToFormat.getDate() - sustractDays);

    // Formatear la fecha y hora en un formato similar a LocalDateTime
    let fechaHoraFormateada = `${fechaLocal.getFullYear()}-${this.pad(fechaLocal.getMonth() + 1)}-${ this.pad(fechaLocal.getDate())}`;
    fechaHoraFormateada+= (showHours)?`T00:00:00`:'';
    return fechaHoraFormateada;
  }

  static pad(num: number): string {
    return (num.toString().length < 2)?`0${num}`:`${num}`;
  }

}