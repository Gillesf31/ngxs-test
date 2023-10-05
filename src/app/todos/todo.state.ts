import {State, Action, StateContext, Selector} from '@ngxs/store';
import {AddTodo, UpdateFilled, UpdateValue} from './todo.actions';
import {Injectable} from "@angular/core";

export interface TodoStateModel {
    todos: string[];
    filled: boolean;
    value: number;
}

@State<TodoStateModel>({
    name: 'todosNameState',
    defaults: {
        todos: [],
        filled: false,
        value: 0
    }
})
@Injectable()
export class TodoState {
    @Selector()
    static getTodos(state: TodoStateModel): string[] {
        return state.todos;
    }

    @Selector()
    static getFilled(state: TodoStateModel): boolean {
        return state.filled;
    }

    @Selector()
    static value(state: TodoStateModel): number {
        return state.value;
    }

    @Action(AddTodo)
    add({getState, patchState}: StateContext<TodoStateModel>, { payload }: AddTodo) {
        console.warn('AddTodo action triggered ');
        const state = getState();
        patchState({
            todos: [...getState().todos, payload]
        });
    }

    @Action(UpdateFilled)
    updateFilled({getState, setState}: StateContext<TodoStateModel>) {
        console.warn('UpdateFilled action triggered ');
        setState({
            ...getState(),
            filled: getState().todos.length > 0
        });
    }

    @Action(UpdateValue)
    updateValue({getState, setState}: StateContext<TodoStateModel>) {
        console.warn('UpdateValue action triggered ');
        setState({
            ...getState(),
            value: getState().value + 1
        });
    }
}
