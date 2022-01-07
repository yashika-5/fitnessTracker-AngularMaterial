import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-trainings',
  templateUrl: './new-trainings.component.html',
  styleUrls: ['./new-trainings.component.css']
})
export class NewTrainingsComponent implements OnInit {

 exercises : Exercise[] = [];
  @Output() onnewTraining = new EventEmitter<void>();
  constructor(private trainingService : TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.availableExercises;
  }

  onSubmit(form : NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
}
