import type {DayProgram} from '../types/types.ts';
import {useParams} from "react-router";
import {useAppDispatch} from "../app/hooks.ts";
import {addPlace} from "../features/trip/tripSlice.ts";
import {useState} from "react";
import PlaceItem from "./PlaceItem.tsx";

type DayCardProps = {
    day: DayProgram;
};

function DayCard({day}: DayCardProps) {
    const {id} = useParams();
    const [placeTitle, setPlaceTitle] = useState('');
    const [placeDescription, setPlaceDescription] = useState('');
    const [isCreatingPlace, setIsCreatingPlace] = useState(false);
    const dispatch = useAppDispatch();
    const handleAddPlace = () => {
        if (!id) return;
        const newPlace = {
            id: crypto.randomUUID(),
            title: placeTitle,
            description: placeDescription,

        }
        dispatch(addPlace({tripId: id, dayId: day.id, place: newPlace}));
        setPlaceTitle('');
        setPlaceDescription('');
        setIsCreatingPlace(false);
    }

    return (
        <div>
            <h3>Day {day.dayNumber}: {day.date}</h3>
            {day.place.map((place, index) => (
                <PlaceItem key={place.id}
                           tripId={id ?? ''}
                           dayId={day.id}
                           place={place}
                           isFirst={index === 0} isLast={index === day.place.length - 1}
                />
            ))}
            {isCreatingPlace ? (
                <div>
                    <input
                        type="text"
                        placeholder="Place title"
                        value={placeTitle}
                        onChange={(e) => setPlaceTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={placeDescription}
                        onChange={(e) => setPlaceDescription(e.target.value)}
                    />
                    <button onClick={handleAddPlace}>Save</button>
                    <button onClick={() => setIsCreatingPlace(false)}>Cancel</button>
                </div>
            ) : (
                <button onClick={() => setIsCreatingPlace(true)}>Add Place</button>


            )}
        </div>
    )
}

export default DayCard;
