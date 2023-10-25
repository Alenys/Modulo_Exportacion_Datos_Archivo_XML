import { TestBed } from '@angular/core/testing';

import { VisualizarestudianteService } from './visualizarestudiante.service';

describe('VisualizarestudianteService', () => {
  let service: VisualizarestudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizarestudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
