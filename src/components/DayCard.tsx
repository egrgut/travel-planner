import type {DayProgram} from '../types/types.ts';

type DayCardProps = {
    day: DayProgram;
};

function DayCard({day}:DayCardProps){
    return(
        <div>
            <h2> Day:{day.dayNumber}</h2>
            <p>Date:{day.date}</p>
            //TODO - Place []
            <p>Place:{day.place.length}</p>
        </div>
    )
}
export default DayCard;
