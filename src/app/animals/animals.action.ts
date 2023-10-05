import {Animal} from "./animals.state";

export class AddAnimal {
    static readonly type = '[Animals] Add Animal';
    constructor(public animal: Animal) {}
}

export class EditFirstAnimal {
    static readonly type = '[Animals] Edit First Animal';
    constructor(public age: number) {}
}

