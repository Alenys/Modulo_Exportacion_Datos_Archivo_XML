import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../data-table/data-table.component';
import { VisualizarestudianteService } from 'src/app/servicios/visualizarestudiante.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit{

  ngOnInit(){
  this.estudiante = this.servicio.recibir
  if(this.estudiante.CES==""){
    this.router.navigateByUrl('/home');
  }
  }
constructor( private servicio:VisualizarestudianteService,private router:Router){

}
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

  
}
