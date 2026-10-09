import type {Trip} from "../types/types.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {addExpense, deleteExpense} from "../features/trip/tripSlice.ts";
import {useState} from "react";

type BudgetCardProps = {
    trip: Trip
}

function BudgetCard({trip}: BudgetCardProps) {
    const dispatch = useAppDispatch();
    const totalExpenses = trip.expenses.reduce((acc, expense) => acc + expense.cost, 0);
    const balance = trip.budget - totalExpenses;
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState(0);
    const handleAddExpense=()=>{
        const newExpense = {
            id: crypto.randomUUID(),
            title: title,
            cost:cost,
        }
        dispatch(addExpense({tripId: trip.id, expense: newExpense}))
        setTitle("");
        setCost(0);
    }
    const handleDeleteExpense = (expenseId: string) =>
        dispatch(deleteExpense({tripId: trip.id, expenseId: expenseId}))
    return (
        <div>
            <ul>
                {trip.expenses.map(expense =>
                    <li key={expense.id}>
                        {expense.title}-{expense.cost}$
                        <button onClick={() => handleDeleteExpense(expense.id)}>
                            Delete
                        </button>
                    </li>)}
            </ul>
            <input type="text" placeholder="add title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="add cost" value={cost} onChange={(e)=>setCost(Number(e.target.value))}/>$
            <button onClick={handleAddExpense}>Add Expense</button>

            <p>Budget: {trip.budget} $</p>
            <p>Total Expenses: {totalExpenses} $</p>
            <p>Balance: {balance} $</p>
        </div>
    )
}

export default BudgetCard;


