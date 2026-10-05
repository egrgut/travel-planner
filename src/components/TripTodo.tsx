import type {TodoList, Trip, TodoStatus} from "../types/types.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {useState} from "react";
import {addTodo, deleteTodo, updateTodoStatus} from "../features/trip/tripSlice.ts";

type TripTodoProps = {
    trip: Trip;

}

function TripTodoCard({trip}: TripTodoProps) {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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
    return (
        <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={handleAddTodo}>Add</button>
            {
                trip.todo.map((todo) => (
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
                ))
            }
        </div>
    )
}

export default TripTodoCard;