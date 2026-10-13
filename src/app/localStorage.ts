export const loadState  = ()=>{
    try{
        const serializedState = localStorage.getItem('travel_planner_state');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error){
        console.error('Error loading state from local storage', error);
        return undefined;
    }
};

export const saveState = (state: any) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('travel_planner_state', serializedState);
    } catch (error){
        console.error('Error saving state to local storage', error);
    }
};