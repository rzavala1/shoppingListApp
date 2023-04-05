
import Image from 'next/image';
import { useState } from 'react';
import { ID } from '../../types/UserType';
import deleteIcon from '../../assets/icons/delete.svg';
import styles from './task.module.css';
import { useMutation } from '@apollo/client';
import { DELETE_TASK, UPDATE_TASK } from '../apollo/task';


interface Props {
    title: string
    terminate: boolean
    idTask:ID
    refetch:(id:ID)=>void
}
const Task = (props: Props) => {
    const { terminate, title, idTask, refetch } = props;
    const [check, setCheck]=useState(terminate);
    const [deleteTask] = useMutation(DELETE_TASK);
    const [updateTask] = useMutation(UPDATE_TASK);

    const onDeleteTask = async () => {
        const response = await deleteTask({
            variables: {
                id:idTask
            }
        });
        if (response.errors) {
            throw response.errors;
        }
        refetch(null);
    }

    const onCheckTask = async () => {
        const response = await updateTask({
            variables: {
                id:idTask,
                task:{
                    title:title,
                    terminate:!check
                }
            }
        });
        if (response.errors) {
            throw response.errors;
        }
        setCheck(!check);
        refetch(idTask);
    }
    

    return (<>
        <div className={styles.task_main}>
            <div>
                <input type="checkbox" className={styles.check} checked={check}
                onChange={onCheckTask}/>
            </div>
            <div className={styles.name}>
                {title}
            </div>
            <div className={styles.delete_img}>
                <Image src={deleteIcon} alt="" width={15} onClick={onDeleteTask}/>
            </div>
        </div>
    </>);
}
export default Task;