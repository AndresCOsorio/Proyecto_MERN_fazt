
import {useParams} from 'react-router-dom'
import CreateNote from './CreateNote';

export function EditNote(){
    const {id} = useParams();
    return (
        <CreateNote noteId={id}/>
    )
}