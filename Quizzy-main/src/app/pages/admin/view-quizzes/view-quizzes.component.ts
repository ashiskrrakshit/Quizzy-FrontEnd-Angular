import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [
    {
      qid: 23,
      title: 'Basic Java Quiz',
      description: 'The word Core describes the basic concept of something, and here, the phrase Core Java defines the basic Java that covers the basic concept of Java programming language.',
      maxMarks: '50',
      noOfQuestions: '20',
      active: '',
      category: {
        title: 'programming',
      }
    },
  
  ];


  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe((data:any)=>{
      this.quizzes = data;
      console.log(this.quizzes);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !","Error in loading data !","error");
      
    });
  }

  //delete quiz...
  // Swal.fire("Success","Quizz Deleted","success");


  deleteQuiz(qId:any){
   

    Swal.fire({
      icon:'warning',
      title:'are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
    
          this.quizzes = this.quizzes.filter((quiz)=>quiz.qid != qId);
          Swal.fire("Success","Quiz Deleted","success");
        },
        (error)=>{
          Swal.fire("Error","error in deleting quiz","error");
    
        });
      }
    });
  }

}
