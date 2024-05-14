// import { Swal } from 'sweetalert2';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [
    {
      cid: '',
      title: '',
      description: '',
    },
  ];

  constructor(private _category: CategoryService) { }

  ngOnInit(): void {

    this._category.categories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "error in loading data", "error");
      })
  }


  // deleting category
  deleteCategory(cid: any) {

    Swal.fire({
      icon: 'warning',
      title: 'are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(cid).subscribe(
          (data: any) => {
          this.categories=this.categories.filter((category) => category.cid != cid)
          Swal.fire("Success", "Category Deleted", "success");
        }, (error) => {
          Swal.fire("Error", "First Delete Quizzes of this category", "error");
        })
      }
    });
  }

}
