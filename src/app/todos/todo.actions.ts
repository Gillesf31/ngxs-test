export class AddTodo {
    static readonly type = '[Todo] Add';
    constructor(public payload: string) {}
}

export class UpdateFilled {
    static readonly type = '[Todo] Update Filled';
    constructor() {}
}

export class UpdateValue {
    static readonly type = '[Todo] Update Value';
    constructor() {}
}

