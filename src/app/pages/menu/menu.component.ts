import { MenuService } from './../../_service/menu.service';
import { Menu } from './../../_model/menu';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'icono', 'url', 'acciones'];
  dataSource: MatTableDataSource<Menu>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private menuService: MenuService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    this.menuService.menuCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.menuService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.menuService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idMenu: number) {
    this.menuService.eliminar(idMenu).pipe(switchMap(() => {
      return this.menuService.listar();
    })).subscribe(data => {
      this.menuService.menuCambio.next(data);
      this.menuService.mensajeCambio.next('Se eliminó');
    });
  }
}

