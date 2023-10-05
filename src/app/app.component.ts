import {Component, inject, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Select, Store} from "@ngxs/store";
import {AddTodo, UpdateFilled, UpdateValue} from "./todos/todo.actions";
import {Observable} from "rxjs";
import {TodoState} from "./todos/todo.state";
import {AddAnimal, EditFirstAnimal} from "./animals/animals.action";
import {Animal, AnimalState, Features} from "./animals/animals.state";

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  @Select (TodoState.getTodos) todos$!: Observable<string[]>;
  @Select (TodoState.getFilled) filled$!: Observable<boolean>;
  @Select (TodoState.value) value$!: Observable<number>;
  @Select (AnimalState.animal) animal$!: Observable<Animal[]>;
  @Select (AnimalState.firstAnimal) firstAnimal$!: Observable<Animal>;
  @Select (AnimalState.firstAnimalAge) firstAnimalAge$!: Observable<number>;

  ngOnInit() {
    console.log('AppComponent ngOnInit');

    this.todos$.subscribe((todos) => {
        console.warn('todos selector : ', todos);
    });

    this.filled$.subscribe((filled) => {
        console.warn('filled selector : ', filled);
    });

    this.value$.subscribe((value) => {
      console.warn('value selector : ', value);
    });

    this.animal$.subscribe((animal) => {
      console.warn('animal selector : ', animal);
    });

    this.firstAnimal$.subscribe((firstAnimal) => {
      console.warn('firstAnimal selector : ', firstAnimal);
    });

    this.firstAnimalAge$.subscribe((firstAnimalAge) => {
      console.warn('firstAnimalAge selector : ', firstAnimalAge);
    });

    console.log('AppComponent ngOnInit before dispatch');

    this.store.dispatch(new AddTodo('Hello'));
    this.store.dispatch(new UpdateFilled);

    console.log('AppComponent ngOnInit after dispatch');
  }

  addTodo() {
    this.store.dispatch(new AddTodo('Hello again'));
  }

  updateFilled() {
    this.store.dispatch(new UpdateFilled);
  }

  updateValue() {
    this.store.dispatch(new UpdateValue);
  }

  addAnimal() {
    this.store.dispatch(new AddAnimal(this.generateRandomAnimal()));
  }

  editFirstAnimal() {
    this.store.dispatch(new EditFirstAnimal(Math.floor(Math.random() * 50)));
  }

  generateRandomAnimal(): Animal {
    const animalNames = ["Cat", "Dog", "Bird"];
    const animalTypes = ["Mammal", "Reptile", "Amphibian"];
    const animalDiets = ["Carnivore", "Herbivore", "Omnivore"];
    const animalHabitats = ["Domestic", "Wild", "Both"];
    const animalConservationStatuses = ["Least concern", "Near threatened", "Vulnerable", "Endangered", "Critically endangered"];

    const randomAnimalName = animalNames[Math.floor(Math.random() * animalNames.length)];
    const randomAnimalType = animalTypes[Math.floor(Math.random() * animalTypes.length)];
    const randomAnimalDiet = animalDiets[Math.floor(Math.random() * animalDiets.length)];
    const randomAnimalHabitat = animalHabitats[Math.floor(Math.random() * animalHabitats.length)];
    const randomAnimalConservationStatus = animalConservationStatuses[Math.floor(Math.random() * animalConservationStatuses.length)];

    return {
      age: Math.floor(Math.random() * 50),
      breed: "",
      features: this.generateRandomFeatures(),
      gender: "",
      species: randomAnimalType,
      weight: Math.floor(Math.random() * 250),
      name: randomAnimalName,
      diet: randomAnimalDiet,
      habitat: randomAnimalHabitat,
      conservationStatus: randomAnimalConservationStatus
    };
  }

  generateRandomFeatures(): Features {
    const features: Features = {
      furColor: '',
      eyeColor: '',
      tailLength: 0,
      featherColor: '',
      beakLength: 0,
      wingspan: 0,
    };

    // Generate a random fur color.
    const furColors = ["black", "white", "brown", "orange", "gray"];
    features.furColor = furColors[Math.floor(Math.random() * furColors.length)];

    // Generate a random eye color.
    const eyeColors = ["blue", "green", "brown", "yellow", "hazel"];
    features.eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];

    // Generate a random tail length.
    features.tailLength = Math.floor(Math.random() * 10) + 1;

    // Generate a random feather color.
    const featherColors = ["black", "white", "brown", "orange", "gray", "red", "blue", "green", "yellow"];
    features.featherColor = featherColors[Math.floor(Math.random() * featherColors.length)];

    // Generate a random beak length.
    features.beakLength = Math.floor(Math.random() * 10) + 1;

    // Generate a random wingspan.
    features.wingspan = Math.floor(Math.random() * 100) + 1;

    return features;
  }
}
