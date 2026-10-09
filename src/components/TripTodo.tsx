import type {TodoList, Trip, TodoStatus} from "../types/types.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {useState} from "react";
import {addTodo, deleteTodo, updateTodoStatus} from "../features/trip/tripSlice.ts";

type TripTodoProps = {
    trip: Trip;

}
type TodoFilter = 'All' | TodoStatus;

function TripTodoCard({trip}: TripTodoProps) {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [filter, setFilter] = useState<TodoFilter>('All');

    const handleAddTodo = () => {
        const newTodo: TodoList = {
            id: crypto.randomUUID(),
            title: title,
            description: description,
            status: 'Waiting',
        }
        dispatch(addTodo({tripId: trip.id, todo: newTodo}))
        setTitle("")
        setDescription("")
    }
    const handleDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo({tripId: trip.id, todoId}))

    }
    const handleStatusChange = (todoId: string, newStatus: TodoStatus) => {
        dispatch(updateTodoStatus({tripId: trip.id, todoId, status: newStatus}))
    }
    const filtredTodos = trip.todo.filter((todo) => {
        if (filter === 'All') {
            return true;
        }
        return todo.status === filter;
    })
    return (
        <div>
            <input placeholder="add title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input placeholder="add description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={handleAddTodo}>Add</button>
            <select value={filter}
                    onChange={(e) => setFilter(e.target.value as TodoFilter)}>
                <option value="All">All</option>
                <option value="Waiting">Waiting</option>
                <option value="In progress">In progress</option>
                <option value="Complete">Complete</option>
                <option value="Next time">Next time</option>
                <option value="Canceled">Canceled</option>
            </select>

            {
                filtredTodos.map((todo) => (
                        <div key={todo.id}>
                            <div>{todo.title}</div>
                            <div>{todo.description}</div>

                            <select
                                value={todo.status}
                                onChange={(e) => handleStatusChange(todo.id, e.target.value as TodoStatus)}>
                                <option value="Waiting">Waiting</option>
                                <option value="In progress">In progress</option>
                                <option value="Complete">Complete</option>
                                <option value="Next time">Next time</option>
                                <option value="Canceled">Canceled</option>
                            </select>

                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default TripTodoCard;