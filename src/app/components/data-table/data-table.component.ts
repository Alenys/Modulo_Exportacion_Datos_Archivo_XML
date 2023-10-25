import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator,} from '@angular/material/paginator';
import {MatTable, MatTableDataSource,} from '@angular/material/table';
import { VisualizarestudianteService } from 'src/app/servicios/visualizarestudiante.service';
import * as JssonToXml from 'js2xmlparser'
import { Subject } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],

})
export class DataTableComponent implements AfterViewInit,OnInit {
  panelOpenState = false;
  private rowClick$  = new Subject<PeriodicElement>();

  displayedColumns: string[] = ['select', 'apellidos', 'nombre', 'CI','Provincia','Municipio','IPU'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataSourcefiltro = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  filteredElements: any[] = [];
  selectedElements: any[] = [];
  provincias: string[]=[];
  municipios: string[]=[];
  preuniversitario:string[]=[];
  nombredelacarrera: string[]=[];
  modalidades:string[]=[];
  indice:indi[]=[
    {
        provincia:"",
  municipio:"",
  carnet:"",
  carrera:"",
  modalidad:"",
  preuniversitario:"",
}]
constructor( public service: VisualizarestudianteService,private router:Router){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  ngAfterViewInit() {
    this.dataSource.sort=this.sort
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel= "Estudiantes por pagina";
    this.paginator._intl.firstPageLabel="Primera pagina";
    this.paginator._intl.nextPageLabel="Siguiente pagina";
    this.paginator._intl.lastPageLabel="Ultima pagina";
    this.paginator._intl.previousPageLabel="Pagina anterior";
    console.log(this.paginator);
  }

  ngOnInit(): void {
    
    this.rowClick$.subscribe(
      row => this.service.enviar(row),
    );
    for(let i in ELEMENT_DATA){
      if(!this.provincias.includes(ELEMENT_DATA[i].provincia)  ){
        this.provincias.push(ELEMENT_DATA[i].provincia)
      }}
      for(let i in ELEMENT_DATA){
        if(!this.municipios.includes(ELEMENT_DATA[i].municipio)  ){
          this.municipios.push(ELEMENT_DATA[i].municipio)
        }
    }
     for(let i in ELEMENT_DATA){
      if(!this.preuniversitario.includes(ELEMENT_DATA[i].preuniversitario)  ){
        this.preuniversitario.push(ELEMENT_DATA[i].preuniversitario)
      }
    }
    for(let i in ELEMENT_DATA){
      if(!this.nombredelacarrera.includes(ELEMENT_DATA[i].nombreCarrera)  ){
        this.nombredelacarrera.push(ELEMENT_DATA[i].nombreCarrera)
      }
    }
    for(let i in ELEMENT_DATA){
      if(!this.modalidades.includes(ELEMENT_DATA[i].modalidad)  ){
        this.modalidades.push(ELEMENT_DATA[i].modalidad)
      }
    }
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    
    this.selection.changed.subscribe((data) => {
     this.selectedElements = this.selection.selected;
     const jsonSelectedElements = JSON.stringify(this.selectedElements);
     console.log(jsonSelectedElements);
    });

const jsonSelectedElements = JSON.stringify(this.selectedElements);

    }
    onRowClicked(row: PeriodicElement): void {
      this.rowClick$.next(row);
      
      this.router.navigateByUrl('/home/visual');
    }
  
    filtrar(event:Event){
      const filtro = (event.target as HTMLInputElement).value;
     
      this.dataSource.filter= filtro.trim().toLowerCase();
      this.filteredElements= this.dataSource.filteredData;
    }
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
    } 
          
      this.dataSource.data.forEach(row => this.selection.select(row));
          
    }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length; // Obtener la cantidad de elementos en la vista actual
      return numSelected == numRows;
    }
   
    onUpload( ){

      const xmlSelectedElements = JssonToXml.parse('elements', { element: this.selectedElements });
     let element = document.createElement('a');
        element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlSelectedElements));
        element.setAttribute('download', 'estudiantes');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }


      filtarselect(e:string,x:string){ 
        this.filteredElements=[];
       if(x ==="p"){
        this.indice[0].provincia=e;
       }
      else if(x==="m"){
        this.indice[0].municipio=e;
       }
      else if(x==="pre"){
        this.indice[0].preuniversitario=e;
       }
      else if(x==="nom"){
        this.indice[0].carrera=e;
       }
       else {
        this.indice[0].modalidad=e;
       }
     
       this.fil()
      }
     
      fil(){
        for(let i in ELEMENT_DATA){
          if(ELEMENT_DATA[i].provincia===this.indice[0].provincia || this.indice[0].provincia===""||this.indice[0].provincia===undefined){
             if(ELEMENT_DATA[i].municipio===this.indice[0].municipio || this.indice[0].municipio==="" ||this.indice[0].municipio===undefined){
              if(ELEMENT_DATA[i].carnetIdentidad===this.indice[0].carnet || this.indice[0].carnet==="" ||this.indice[0].carnet===undefined){
                if(ELEMENT_DATA[i].nombreCarrera===this.indice[0].carrera || this.indice[0].carrera==="" ||this.indice[0].carrera===undefined){
                  if(ELEMENT_DATA[i].modalidad===this.indice[0].modalidad|| this.indice[0].modalidad==="" ||this.indice[0].modalidad===undefined){
                    if(ELEMENT_DATA[i].preuniversitario===this.indice[0].preuniversitario|| this.indice[0].preuniversitario==="" ||this.indice[0].preuniversitario===undefined){
                      this.filteredElements.push(ELEMENT_DATA[i])
                     }      
                   }      
                 }      
               }      
             }         
            
          }
        }
       
        if(this.filteredElements.length==0){
          Swal.fire({
          title:'Error',
          text:'No se encontraron elementos',
          icon:'error',
          })
        }
        this.dataSource.data = this.filteredElements;
      }
     
    }
      
export interface indi{
  provincia:string;
  municipio:string;
  carnet:string;
  carrera:string;
  preuniversitario:string;
  modalidad:string;
}


export interface PeriodicElement {
  nombre: string,
  apellidos:string,
  carnetIdentidad: string,
  provincia: string,
  municipio: string,
  direccion: string,
  sexo: string,
  colorPiel: string,
  escolaridadMadre: string,
  ocupacionMadre: string,
  sectorLaboralMadre: string,
  escolaridadPadre: string,
  ocupacionPadre: string,
  sectorLaboralPadre:string,
  fuenteIngreso: string,
  tipoPRE: string,
  preuniversitario: string,
  provinciaPreuniversitario: string,
  municipioPreuniversitario:string,
  viaIngreso: string,
  procedenciaConcurso: string,
  situacionConcurso:string,
  indiceAcademico:string,
  resultadosConvocatoriaOrdinaria: string,
  resultadosConvocatoriaExtraordinaria: string,
  notaValida: string,
  escalafon: string,
  opcionesConvocatoriaOrdinaria: string,
  opcionesConvocatoriaExtraordinaria: string,
  nombreCarrera:string,
  codigoCarrera: string,
  modalidad: string,
  CES: string,
  convocatoria: string,
  SMA: string,
}

const ELEMENT_DATA = [
  {
    nombre: 'Juan',
    apellidos: 'Gómez',
    carnetIdentidad: '00020455678',
    provincia: 'La Habana',
    municipio: 'Plaza de la Revolución',
    direccion: 'Calle 23',
    sexo: 'Masculino',
    colorPiel: 'Moreno',
    escolaridadMadre: 'Preparatoria',
    ocupacionMadre: 'Agente de Seguridad',
    sectorLaboralMadre: 'Comercio',
    escolaridadPadre: 'Primaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'IPU',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'IPU: Presidente Allende',
    provinciaPreuniversitario: 'La Habana',
    municipioPreuniversitario: 'Boyeros',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '8.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '8.5',
    escalafon: '37',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Ingeniería Industrial',
    codigoCarrera: '002',
    modalidad: 'Presencial',
    CES: 'Universidad de las Ciencias Informaticas',
    convocatoria: 'Convocatoria 1',
    SMA: 'Diferido'
  },
  {
    nombre: 'María',
    apellidos: 'López',
    carnetIdentidad: '8705032155',
    provincia: 'Guantánamo',
    municipio: 'Guantánamo',
    direccion: 'Avenida 456',
    sexo: 'Femenino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Universidad',
    ocupacionMadre: 'Abogada',
    sectorLaboralMadre: 'Derecho',
    escolaridadPadre: 'Universidad',
    ocupacionPadre: 'Ingeniero',
    sectorLaboralPadre: 'Ingeniería',
    fuenteIngreso: 'Beca',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'PrepaTec',
    provinciaPreuniversitario: 'Guantánamo',
    municipioPreuniversitario: 'Guantánamo',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '9.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '9.2',
    escalafon: '89',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Ingeniería en Ciencias Informáticas',
    codigoCarrera: '001',
    modalidad: 'Presencial',
    CES: 'Universidad de las Ciencias Informáticas',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Laura',
    apellidos: 'Hernández',
    carnetIdentidad: '98040533576',
    provincia: 'La Habana',
    municipio: 'La Lisa',
    direccion: 'Calle 454',
    sexo: 'Masculino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Secundaria',
    ocupacionMadre: 'Ama de casa',
    sectorLaboralMadre: 'N/D',
    escolaridadPadre: 'Secundaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'IPU',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 4',
    provinciaPreuniversitario: 'La Habana',
    municipioPreuniversitario: 'La Lisa',
    viaIngreso: 'Prueba de aptitud',
    procedenciaConcurso: 'N/D',
    situacionConcurso: 'N/D',
    indiceAcademico: '9.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '4.0',
    escalafon: '7',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'Opción 2',
    nombreCarrera: 'Medicina',
    codigoCarrera: '789',
    modalidad: 'Presencial',
    CES: 'Universidad de Ciencias Médicas de La Habana',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Bella',
    apellidos: 'Ruíz',
    carnetIdentidad: '00050433879',
    provincia: 'Mayabeque',
    municipio: 'Municipio',
    direccion: 'Dirección particular 5',
    sexo: 'Femenino',
    colorPiel: 'Negro',
    escolaridadMadre: 'Universitaria',
    ocupacionMadre: 'Ingeniera',
    sectorLaboralMadre: 'Ingeniería',
    escolaridadPadre: 'Universitaria',
    ocupacionPadre: 'Abogado',
    sectorLaboralPadre: 'Derecho',
    fuenteIngreso: 'Beca',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 5',
    provinciaPreuniversitario: 'Mayabeque',
    municipioPreuniversitario: 'Municipio 4',
    viaIngreso: 'Concurso',
    procedenciaConcurso: 'Otra universidad',
    situacionConcurso: 'Aprobado',
    indiceAcademico: '4.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '4.0',
    escalafon: '89',
    opcionesConvocatoriaOrdinaria: 'Opción 2',
    opcionesConvocatoriaExtraordinaria: 'Opción 3',
    nombreCarrera: 'Ingeniría Agrícola',
    codigoCarrera: '101',
    modalidad: 'Presencial',
    CES: 'Universidad Agraria de La Habana Fructuoso Rodríguez Pérez',
    convocatoria: 'Convocatoria 2',
    SMA: 'Diferido'
  },
  {
    nombre: 'Juan',
    apellidos: 'Gómez',
    carnetIdentidad: '12082344576',
    provincia: 'Mayabeque',
    municipio: 'Madruga',
    direccion: 'Calle 123',
    sexo: 'Masculino',
    colorPiel: 'Moreno',
    escolaridadMadre: 'Preparatoria',
    ocupacionMadre: 'Comerciante',
    sectorLaboralMadre: 'Comercio',
    escolaridadPadre: 'Primaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'Trabajo',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'PrepaTec',
    provinciaPreuniversitario: 'Mayabeque',
    municipioPreuniversitario: 'Santa Cruz del Norte',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '8.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '8.5',
    escalafon: '78',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Ingeniería Industrial',
    codigoCarrera: '002',
    modalidad: 'Presencial',
    CES: 'Universidad Agraria de La Habana Fructuoso Rodríguez Pérez',
    convocatoria: 'Convocatoria 1',
    SMA: 'Diferido'
  },
  {
    nombre: 'Esperanza',
    apellidos: 'López',
    carnetIdentidad: '87060543821',
    provincia: 'Matanzas',
    municipio: 'Unión de Reyes',
    direccion: 'Avenida 456',
    sexo: 'Femenino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Universidad',
    ocupacionMadre: 'Abogada',
    sectorLaboralMadre: 'Derecho',
    escolaridadPadre: 'Universidad',
    ocupacionPadre: 'Ingeniero',
    sectorLaboralPadre: 'Ingeniería',
    fuenteIngreso: 'Beca',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'PrepaTec',
    provinciaPreuniversitario: 'Matanzas',
    municipioPreuniversitario: 'Matanzas',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '9.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '9.2',
    escalafon: '8',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Ingeniería Industrial',
    codigoCarrera: '001',
    modalidad: 'Presencial',
    CES: 'Universidad de Matanzas Camilo Cienfuegos',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Luna',
    apellidos: 'Rodríguez',
    carnetIdentidad: '0203045576',
    provincia: 'Matanzas',
    municipio: 'Unión de Reyes',
    direccion: 'Dirección particular 4',
    sexo: 'Masculino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Secundaria',
    ocupacionMadre: 'Ama de casa',
    sectorLaboralMadre: 'N/D',
    escolaridadPadre: 'Secundaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'Trabajo',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 4',
    provinciaPreuniversitario: 'Matanzas',
    municipioPreuniversitario: 'Matanzas',
    viaIngreso: 'Prueba de aptitud',
    procedenciaConcurso: 'N/D',
    situacionConcurso: 'N/D',
    indiceAcademico: '4.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '4.0',
    escalafon: '78',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'Opción 2',
    nombreCarrera: 'Pedagogía',
    codigoCarrera: '789',
    modalidad: 'Presencial',
    CES: 'Universidad de Matanzas Camilo Cienfuegos',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Zoe',
    apellidos: 'Parada',
    carnetIdentidad: '01072493899',
    provincia: 'Matanzas',
    municipio: 'Limonar',
    direccion: 'Dirección particular 5',
    sexo: 'Femenino',
    colorPiel: 'Negro',
    escolaridadMadre: 'Universitaria',
    ocupacionMadre: 'Ingeniera',
    sectorLaboralMadre: 'Ingeniería',
    escolaridadPadre: 'Universitaria',
    ocupacionPadre: 'Abogado',
    sectorLaboralPadre: 'Derecho',
    fuenteIngreso: 'Beca',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 5',
    provinciaPreuniversitario: 'Matanzas',
    municipioPreuniversitario: 'Matanzas',
    viaIngreso: 'Concurso',
    procedenciaConcurso: 'Otra universidad',
    situacionConcurso: 'Aprobado',
    indiceAcademico: '4.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '6.0',
    escalafon: '45',
    opcionesConvocatoriaOrdinaria: 'Opción 2',
    opcionesConvocatoriaExtraordinaria: 'Opción 3',
    nombreCarrera: 'Ingeniería Industrial',
    codigoCarrera: '101',
    modalidad: 'Presencial',
    CES: 'Universidad de Matanzas Camilo Cienfuegos',
    convocatoria: 'Convocatoria 2',
    SMA: 'Diferido'
  },
  {
    nombre: 'Juan',
    apellidos: 'Gómez',
    carnetIdentidad: '0102034567',
    provincia: 'Las Tunas',
    municipio: 'Las Tunas',
    direccion: 'Calle 123',
    sexo: 'Masculino',
    colorPiel: 'Moreno',
    escolaridadMadre: 'Preparatoria',
    ocupacionMadre: 'Comerciante',
    sectorLaboralMadre: 'Comercio',
    escolaridadPadre: 'Primaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'Trabajo',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'PrepaTec',
    provinciaPreuniversitario: 'Las Tunas',
    municipioPreuniversitario: 'Las Tunas',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '8.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '8.5',
    escalafon: '15',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Ingeniería Industrial',
    codigoCarrera: '002',
    modalidad: 'Presencial',
    CES: 'Universidad de Las Tunas',
    convocatoria: 'Convocatoria 1',
    SMA: 'Diferido'
  },
  {
    nombre: 'María',
    apellidos: 'López',
    carnetIdentidad: '970605432',
    provincia: 'Las Tunas',
    municipio: 'Las Tunas',
    direccion: 'Avenida 456',
    sexo: 'Femenino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Universidad',
    ocupacionMadre: 'Abogada',
    sectorLaboralMadre: 'Derecho',
    escolaridadPadre: 'Universidad',
    ocupacionPadre: 'Ingeniero',
    sectorLaboralPadre: 'Ingeniería',
    fuenteIngreso: 'Beca',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'PrepaTec',
    provinciaPreuniversitario: 'Las Tunas',
    municipioPreuniversitario: 'Jobabo',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '9.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '9.1',
    escalafon: '34',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Medicina',
    codigoCarrera: '001',
    modalidad: 'Presencial',
    CES: 'Universidad de Las Tunas',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Leonardo',
    apellidos: 'Pérez',
    carnetIdentidad: '00040533823',
    provincia: 'Matanzas',
    municipio: 'Matanzas',
    direccion: 'Calle 4',
    sexo: 'Masculino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Secundaria',
    ocupacionMadre: 'Ama de casa',
    sectorLaboralMadre: 'N/D',
    escolaridadPadre: 'Secundaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'Trabajo',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 4',
    provinciaPreuniversitario: 'Matanzas',
    municipioPreuniversitario: 'Matanzas',
    viaIngreso: 'Prueba de aptitud',
    procedenciaConcurso: 'N/D',
    situacionConcurso: 'N/D',
    indiceAcademico: '6.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '5.0',
    escalafon: '108',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'Opción 2',
    nombreCarrera: 'Pedagogía',
    codigoCarrera: '789',
    modalidad: 'Presencial',
    CES: 'Universidad de Matanzas Camilo Cienfuegos',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Luis',
    apellidos: 'La Rosa',
    carnetIdentidad: '99030688799',
    provincia: 'Matanzas',
    municipio: 'Limonar',
    direccion: 'Calle 45',
    sexo: 'Femenino',
    colorPiel: 'Negro',
    escolaridadMadre: 'Universitaria',
    ocupacionMadre: 'Ingeniera',
    sectorLaboralMadre: 'Ingeniería',
    escolaridadPadre: 'Universitaria',
    ocupacionPadre: 'Abogado',
    sectorLaboralPadre: 'Derecho',
    fuenteIngreso: 'Beca',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 5',
    provinciaPreuniversitario: 'Matanzas',
    municipioPreuniversitario: 'Matanzas',
    viaIngreso: 'Concurso',
    procedenciaConcurso: 'Otra universidad',
    situacionConcurso: 'Aprobado',
    indiceAcademico: '9.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '9.0',
    escalafon: '17',
    opcionesConvocatoriaOrdinaria: 'Opción 2',
    opcionesConvocatoriaExtraordinaria: 'Opción 3',
    nombreCarrera: 'Ingenieria Civil',
    codigoCarrera: '101',
    modalidad: 'Presencial',
    CES: 'Universidad de Matanzas Camilo Cienfuegos',
    convocatoria: 'Convocatoria 2',
    SMA: 'Diferido'
  },
  {
    nombre: 'Juan',
    apellidos: 'Gómez',
    carnetIdentidad: '0102345678',
    provincia: 'Artemisa',
    municipio: 'Alquizar',
    direccion: 'Calle 123',
    sexo: 'Masculino',
    colorPiel: 'Moreno',
    escolaridadMadre: 'Preparatoria',
    ocupacionMadre: 'Comerciante',
    sectorLaboralMadre: 'Comercio',
    escolaridadPadre: 'Primaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'Trabajo',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'PrepaTec',
    provinciaPreuniversitario: 'Artemisa',
    municipioPreuniversitario: 'Alquizar',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '8.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '8.5',
    escalafon: '130',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Ingeniería Industrial',
    codigoCarrera: '002',
    modalidad: 'Presencial',
    CES: 'Universidad de Artemisa Julio Díaz González',
    convocatoria: 'Convocatoria 1',
    SMA: 'Diferido'
  },
  {
    nombre: 'María',
    apellidos: 'Fernández',
    carnetIdentidad: '98070654321',
    provincia: 'Matanzas',
    municipio: 'Limonar',
    direccion: 'Avenida 456',
    sexo: 'Femenino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Universidad',
    ocupacionMadre: 'Abogada',
    sectorLaboralMadre: 'Derecho',
    escolaridadPadre: 'Universidad',
    ocupacionPadre: 'Ingeniero',
    sectorLaboralPadre: 'Ingeniería',
    fuenteIngreso: 'Beca',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'PrepaTec',
    provinciaPreuniversitario: 'Matanzas',
    municipioPreuniversitario: 'Limonar',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '9.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '9.2',
    escalafon: '88',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Medicina',
    codigoCarrera: '001',
    modalidad: 'Presencial',
    CES: 'Universidad de Ciencias Médicas de Matanzas',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Yulenka',
    apellidos: 'Ortiz',
    carnetIdentidad: '99081877653',
    provincia: 'Santiago de Cuba',
    municipio: 'Municipio 4',
    direccion: 'Dirección particular 4',
    sexo: 'Masculino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Secundaria',
    ocupacionMadre: 'Ama de casa',
    sectorLaboralMadre: 'N/D',
    escolaridadPadre: 'Secundaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'Trabajo',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 4',
    provinciaPreuniversitario: 'Santiago de Cuba',
    municipioPreuniversitario: 'Municipio 3',
    viaIngreso: 'Prueba de aptitud',
    procedenciaConcurso: 'N/D',
    situacionConcurso: 'N/D',
    indiceAcademico: '4.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '4.0',
    escalafon: '300',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'Opción 2',
    nombreCarrera: 'Carrera 3',
    codigoCarrera: '789',
    modalidad: 'Presencial',
    CES: 'Universidad de Oriente',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Katiuska',
    apellidos: 'Mendoza',
    carnetIdentidad: '98010188457',
    provincia: 'Santiago de Cuba',
    municipio: 'Santiago de Cuba',
    direccion: 'Calle 17',
    sexo: 'Femenino',
    colorPiel: 'Negro',
    escolaridadMadre: 'Universitaria',
    ocupacionMadre: 'Ingeniera',
    sectorLaboralMadre: 'Ingeniería',
    escolaridadPadre: 'Universitaria',
    ocupacionPadre: 'Abogado',
    sectorLaboralPadre: 'Derecho',
    fuenteIngreso: 'Beca',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 5',
    provinciaPreuniversitario: 'La Habana',
    municipioPreuniversitario: 'Municipio 4',
    viaIngreso: 'Concurso',
    procedenciaConcurso: 'Otra universidad',
    situacionConcurso: 'Aprobado',
    indiceAcademico: '7.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '6.0',
    escalafon: '78',
    opcionesConvocatoriaOrdinaria: 'Opción 2',
    opcionesConvocatoriaExtraordinaria: 'Opción 3',
    nombreCarrera: 'Ingeniería Eléctrica',
    codigoCarrera: '101',
    modalidad: 'Presencial',
    CES: 'Universidad de Oriente',
    convocatoria: 'Convocatoria 2',
    SMA: 'Diferido'
  },
  {
    nombre: 'Juan',
    apellidos: 'Gómez',
    carnetIdentidad: '0112034568',
    provincia: 'La Habana',
    municipio: 'Boyeros',
    direccion: 'Calle 123',
    sexo: 'Masculino',
    colorPiel: 'Moreno',
    escolaridadMadre: 'Preparatoria',
    ocupacionMadre: 'Comerciante',
    sectorLaboralMadre: 'Comercio',
    escolaridadPadre: 'Primaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'Trabajo',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'PrepaTec',
    provinciaPreuniversitario: 'La habana',
    municipioPreuniversitario: 'Boyeros',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '8.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '8.5',
    escalafon: '86',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Ingeniería Industrial',
    codigoCarrera: '002',
    modalidad: 'Presencial',
    CES: 'Universidad de La Habana',
    convocatoria: 'Convocatoria 1',
    SMA: 'Diferido'
  },
  {
    nombre: 'Mélani',
    apellidos: 'Espinoza',
    carnetIdentidad: '87061543218',
    provincia: 'La Habana',
    municipio: 'Playa',
    direccion: 'Avenida 456',
    sexo: 'Femenino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Universidad',
    ocupacionMadre: 'Abogada',
    sectorLaboralMadre: 'Derecho',
    escolaridadPadre: 'Universidad',
    ocupacionPadre: 'Ingeniero',
    sectorLaboralPadre: 'Ingeniería',
    fuenteIngreso: 'Beca',
    tipoPRE: 'Preparatoria',
    preuniversitario: 'PrepaTec',
    provinciaPreuniversitario: 'La Habana',
    municipioPreuniversitario: 'Playa',
    viaIngreso: 'Examen de admisión',
    procedenciaConcurso: 'N/A',
    situacionConcurso: 'N/A',
    indiceAcademico: '8.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'No Aplica',
    notaValida: '8.7',
    escalafon: '53',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'N/A',
    nombreCarrera: 'Medicina',
    codigoCarrera: '001',
    modalidad: 'Presencial',
    CES: 'Univercidad de Ciencias Médicas de La Habana',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Manuel',
    apellidos: 'Méndez',
    carnetIdentidad: '9803045567',
    provincia: 'Santiago de Cuba',
    municipio: 'Santiago',
    direccion: 'Dirección particular 4',
    sexo: 'Masculino',
    colorPiel: 'Blanco',
    escolaridadMadre: 'Secundaria',
    ocupacionMadre: 'Ama de casa',
    sectorLaboralMadre: 'N/D',
    escolaridadPadre: 'Secundaria',
    ocupacionPadre: 'Obrero',
    sectorLaboralPadre: 'Construcción',
    fuenteIngreso: 'Trabajo',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 4',
    provinciaPreuniversitario: 'Provincia 3',
    municipioPreuniversitario: 'Municipio 3',
    viaIngreso: 'Prueba de aptitud',
    procedenciaConcurso: 'N/D',
    situacionConcurso: 'N/D',
    indiceAcademico: '4.2',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '4.0',
    escalafon: '234',
    opcionesConvocatoriaOrdinaria: 'Opción 1',
    opcionesConvocatoriaExtraordinaria: 'Opción 2',
    nombreCarrera: 'Ingenieria en Ciencias Informáticas',
    codigoCarrera: '789',
    modalidad: 'Presencial',
    CES: 'Universidad de las Ciencias Informáticas',
    convocatoria: 'Convocatoria 1',
    SMA: 'Directo'
  },
  {
    nombre: 'Daniela',
    apellidos: 'Alfonso',
    carnetIdentidad: '00040577833',
    provincia: 'Guantánamo',
    municipio: 'Guantánamo',
    direccion: 'Dirección particular 5',
    sexo: 'Femenino',
    colorPiel: 'Negro',
    escolaridadMadre: 'Universitaria',
    ocupacionMadre: 'Ingeniera',
    sectorLaboralMadre: 'Ingeniería',
    escolaridadPadre: 'Universitaria',
    ocupacionPadre: 'Abogado',
    sectorLaboralPadre: 'Derecho',
    fuenteIngreso: 'Beca',
    tipoPRE: 'PRE-Universitario',
    preuniversitario: 'Preuniversitario 5',
    provinciaPreuniversitario: 'Provincia 4',
    municipioPreuniversitario: 'Municipio 4',
    viaIngreso: 'Concurso',
    procedenciaConcurso: 'Otra universidad',
    situacionConcurso: 'Aprobado',
    indiceAcademico: '4.5',
    resultadosConvocatoriaOrdinaria: 'Aprobado',
    resultadosConvocatoriaExtraordinaria: 'Aprobado',
    notaValida: '4.0',
    escalafon: '230',
    opcionesConvocatoriaOrdinaria: 'Opción 2',
    opcionesConvocatoriaExtraordinaria: 'Opción 3',
    nombreCarrera: 'Ingles',
    codigoCarrera: '101',
    modalidad: 'Presencial',
    CES: 'Universidad de Guantánamo',
    convocatoria: 'Convocatoria 2',
    SMA: 'Diferido'
  },
];



