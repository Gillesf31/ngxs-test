import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Injectable} from "@angular/core";
import {AddAnimal, EditFirstAnimal} from "./animals.action";

export interface Features {
    furColor: string;
    eyeColor: string;
    tailLength: number;
    featherColor: string;
    beakLength: number;
    wingspan: number;
}

export interface Animal {
    name: string;
    age: number;
    weight: number;
    species: string;
    breed: string;
    gender: string;
    diet: string;
    habitat: string;
    conservationStatus: string;
    features: Features;
}

export interface AnimalStateModel {
    animal: Animal[];
}

@State<AnimalStateModel>({
    name: 'animalNameState',
    defaults: {
        animal: [],
    }
})
@Injectable()
export class AnimalState {
    @Selector([AnimalState])
    static animal(state: AnimalStateModel): Animal[] {
        return state.animal;
    }

    @Selector([AnimalState])
    static firstAnimal(state: AnimalStateModel): Animal {
        return state.animal[0];
    }

    @Selector([AnimalState.firstAnimal])
    static firstAnimalAge(animal: Animal): number | 0 {
        return animal?.age || 0;
    }

    @Action(AddAnimal)
    addAnimal({getState, setState}: StateContext<AnimalStateModel>, {animal}: AddAnimal) {
        console.warn('AddAnimal action triggered with ', animal);
        setState({
            ...getState(),
            animal: [...getState().animal, animal]
        });
    }

    @Action(EditFirstAnimal)
    editFirstAnimal({getState, setState}: StateContext<AnimalStateModel>, {age}: EditFirstAnimal) {
        console.warn('EditFirstAnimal action triggered with ', age);
        setState({
            ...getState(),
            animal: getState().animal.map((animal, index) =>
                index === 0 ? { ...animal, age } : animal
            )
        });
    }
}
