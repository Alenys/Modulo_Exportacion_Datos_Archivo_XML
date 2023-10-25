import { Injectable } from '@angular/core';
import { PeriodicElement } from '../components/data-table/data-table.component';
@Injectable({
  providedIn: 'root'
})
export class VisualizarestudianteService {
  estudiante:PeriodicElement={
    nombre: "",
    apellidos:"",
    carnetIdentidad:"",
    provincia: "",
    municipio: "",
    direccion:"",
    sexo:"",
    colorPiel:"",
    escolaridadMadre:"",
    ocupacionMadre:"",
    sectorLaboralMadre:"",
    escolaridadPadre:"",
    ocupacionPadre:"",
    sectorLaboralPadre:"",
    fuenteIngreso: "",
    tipoPRE: "",
    preuniversitario:"",
    provinciaPreuniversitario: "",
    municipioPreuniversitario:"",
    viaIngreso: "",
    procedenciaConcurso:"",
    situacionConcurso:"",
    indiceAcademico:"",
    resultadosConvocatoriaOrdinaria: "",
    resultadosConvocatoriaExtraordinaria:"",
    notaValida: "",
    escalafon: "",
    opcionesConvocatoriaOrdinaria: "",
    opcionesConvocatoriaExtraordinaria: "",
    nombreCarrera:"",
    codigoCarrera: "",
    modalidad: "",
    CES: "",
    convocatoria:"",
    SMA: "",
  };
  constructor() { }
  public get recibir(){
return this.estudiante
  }
  public enviar (x:PeriodicElement){
this.estudiante=x;
  }
}
