import type {Places} from "../types/types.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {deletePlace, editPlace, movePlace} from "../features/trip/tripSlice.ts";
import {useState} from "react";

type PlaceItemProps = {
    tripId: string;
    dayId: string;
    place: Places;
    isFirst: boolean;
    isLast: boolean;
};



function PlaceItem({tripId, dayId, place,isFirst,isLast}: PlaceItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(place.title);
    const [description, setDescription] = useState(place.description ?? '');
    const dispatch = useAppDispatch();
    const handleDeletePlace = (placeId: string) => {
        dispatch(deletePlace({tripId, dayId, placeId: placeId}));
    }
    const handleSavePlace = () => {
        dispatch(editPlace({
            tripId,
            dayId,
            place: {id: place.id, title, description: description}
        }))
        setIsEditing(false);

    }
    const handleMovePlace=(direction: 'up'|'down')=>{
        dispatch(movePlace({tripId, dayId, placeId: place.id, direction}));
    }

    return isEditing ? (
        <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={handleSavePlace}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
    ) : (
        <div>
            <h3>{place.title}</h3>
            <p>{place.description}</p>
            <button onClick={() => handleDeletePlace(place.id)}>Delete</button>
            <button disabled={isFirst} onClick={()=>handleMovePlace('up')}>↑</button>
            <button disabled={isLast} onClick={()=>handleMovePlace('down')}>↓</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>)
}

export default PlaceItem;
