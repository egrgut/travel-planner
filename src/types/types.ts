export type TripStatus =
    | 'Business trip'
    | 'Vacation trip';

export type TodoStatus =
    | 'Complete'
    | 'Canceled'
    | 'Next time'

export type Places = {
    id: string,
    title: string,
    description?: string,
}

export type DayProgram = {
    id: string,
    title?: string;
    dayNumber: number,
    date: string,
    place: Places[],
}
export type TodoList = {
    id: string;
    title: string,
    description: string,
    status: TodoStatus,
}

export type Expense = {
    id: string,
    title: string,
    cost: number,
}

export type Trip = {
    id: string,
    status: TripStatus,
    persons: number,
    country: string,
    city: string,
    days: DayProgram[],
    todo: TodoList[],
    budget: number,
    expenses: Expense[],
    startDate: string,
    endDate: string,

}