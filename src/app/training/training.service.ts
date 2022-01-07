import { isNull } from "@angular/compiler/src/output/output_ast";
import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";

export class TrainingService{

    excerciseChanged = new Subject<Exercise>();

    availableExercises : Exercise[] = [
        {id : 'crunches', name : 'Crunches', duration : 30, calories : 8},
        {id : 'touch-toes', name : 'Touch Toes', duration : 180, calories : 18},
        {id : 'side-lunges', name : 'Side Lunges', duration : 120, calories : 20},
        {id : 'burpees', name : 'Burpees', duration : 60, calories : 8}
    ];

    private runningExercise: Exercise | undefined;
    private exercises : Exercise[] = [];
  

    getAvailableExercises(){
        this.availableExercises.slice();
    }

    startExercise(selectedId : string){
     this.runningExercise =  this.availableExercises.find(ex => ex.id === selectedId);
        console.log(this.runningExercise);    
        this.excerciseChanged.next({ ...this.runningExercise });
    }

    getRunningExercise(){
        return {...this.runningExercise };
    }

    completeExercise(){
        this.exercises.push({...this.runningExercise,
             date : new Date(),
             state : 'Completed',
             name : this.runningExercise?.name
        });
        this.runningExercise = null ;
        this.excerciseChanged.next(this.runningExercise);
    }

    cancelExercise(progress : number){
        this.exercises.push({...this.runningExercise,
            duration : Number(this.runningExercise?.duration) * (progress / 100),
            calories : Number(this.runningExercise?.calories) * (progress / 100),
            date : new Date(),
            state : 'Cancelled',
            name : this.runningExercise?.name
       });
       this.runningExercise = null ;
       console.log(this.runningExercise);
       
      this.excerciseChanged.next(this.runningExercise)
    }

    getCompletedOrCancelled(){
      return  this.exercises.slice();
    }
}