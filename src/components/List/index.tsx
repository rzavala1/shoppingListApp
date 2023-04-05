import { useLazyQuery, useMutation } from '@apollo/client';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { CREATE_TASK, GET_ALL_TASKS } from '../../commons/apollo/task';
import Task from '../../commons/Task';
import styles from './list.module.css';
import sortIcon from '../../assets/icons/sort.svg';

const Index = () => {

    const [list, setList] = useState([]);
    const [input, setInput] = useState<string>("");
    const [createTask] = useMutation(CREATE_TASK);
    const [sort, setSort]=useState("ASC");
    const [getData] = useLazyQuery(GET_ALL_TASKS, {
        onCompleted: response => {
            setList(response?.getAllTasks);
        },
        fetchPolicy: 'no-cache',
        partialRefetch: true,
        returnPartialData: true,
    });

    useEffect(() => {
        getAllTasks(sort);
    }, []);

    const add = async () => {
        const response = await createTask({
            variables: {
                task: {
                    terminate: false,
                    title: input
                }
            },
        });
        if (response.errors) {
            throw response.errors;
        }
        setInput("");
        setList([...list, response?.data?.createTask]);
    }

    const getAllTasks=(sortLocal:string=sort)=>{
        getData({
            variables: {
                sorts: [{ field: 'title', sort: sortLocal }],
            }
        });
    }

    const sortTasks=()=>{
        let sortAux=sort;
        if(sort==="ASC"){
            sortAux="DESC";
            setSort("DESC");
        }else{
            sortAux="ASC";
            setSort("ASC");
        }
        getAllTasks(sortAux);
    }
    

    return (<>
        <div className={styles.main}>
            <div className={styles.add_main}>
                <div className={styles.input_main}>
                    <input type="" className={styles.input} value={input} onChange={(e) => {
                        setInput(e.target.value)
                    }} />
                </div>
                <div className={styles.button_main}>
                    <button onClick={add}>Agregar</button>
                </div>
            </div>
            <div className={styles.filters} onClick={sortTasks}>
                <div>
                    <Image src={sortIcon}  alt="" width={23}/>
                </div>
                <div>
                    Ordenar
                </div>
            </div>
            <div className={styles.list_main}>
                {
                    list.map((task) => {
                        return (
                            <Task terminate={task.terminate} title={task.title}
                                idTask={task.id} refetch={getAllTasks} />
                        );
                    })
                }
            </div>
        </div>
    </>)
}
export default Index;