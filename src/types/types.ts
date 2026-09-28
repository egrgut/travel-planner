export type TripStatus =
    | 'business trip'
    | 'vacation trip';

export type TodoStatus =
    | 'complete'
    | 'canceled'
    | 'next time'

export type Places = {
    title: string,
    description: string,
}

export type DayProgram = {
    id: string,
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
    title: string,
    cost: number,
}

export type Trip = {
    id: string,
    status: TripStatus,
    country: string,
    city: string,
    days: DayProgram[],
    todo: TodoList[],
    budget: number,
    expenses: Expense[],
    startDate: string,
    endDate: string,

}