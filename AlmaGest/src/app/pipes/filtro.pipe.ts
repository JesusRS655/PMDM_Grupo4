import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filtro",
})
export class FiltroPipe implements PipeTransform {
  
  transform(arr: any[], texto: string): any[] {
    texto = texto.toLowerCase();

    if (texto === "") {
      return arr;
    }
    return arr.filter((item) => {
      return item.description.toLowerCase().includes(texto);
    });
  }
}
