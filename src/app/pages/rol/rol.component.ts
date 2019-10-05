import { Component, OnInit, ViewChild } from '@angular/core';
import { Rol } from 'src/app/_model/rol';
import { MatSort, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  dataSource: MatTableDataSource<Rol>;
  displayedColumns = ['idRol', 'nombre', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  cantidad: number = 0;

  constructor(private rolteService: RolService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.rolteService.rolCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.rolteService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.rolteService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  mostrarMas(e: any) {
    this.rolteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idRol: number) {
    this.rolteService.eliminar(idRol).subscribe(() => {
      this.rolteService.listar().subscribe(data => {
        this.rolteService.rolCambio.next(data);
        this.rolteService.mensajeCambio.next('SE ELIMINO');
      });
    });
  }

}
