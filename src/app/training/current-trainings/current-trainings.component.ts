import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-trainings',
  templateUrl: './current-trainings.component.html',
  styleUrls: ['./current-trainings.component.css']
})
export class CurrentTrainingsComponent implements OnInit {

  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: any;
  constructor(private Dialog: MatDialog, private trainingService : TrainingService) { 
  }

  ngOnInit(): void {
  this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    const step = Number(this.trainingService.getRunningExercise().duration);
    const p = step/100 * 1000;
    this.timer = setInterval(()=>{
      this.progress = this.progress + 5;
      if(this.progress >=100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, p);
  }
  onStop(){
    clearInterval(this.timer);
   const dialogRef =  this.Dialog.open(StopTrainingComponent,{
      data : {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log(result);
      if(result){
      this.trainingService.cancelExercise(this.progress);
      }
      else{
      this.startOrResumeTimer();
      }
    });
  }
}
