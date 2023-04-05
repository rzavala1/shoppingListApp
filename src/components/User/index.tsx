import { useState } from 'react';
import styles from './user.module.css';
import Image from 'next/image';
import { UserI } from '../../types/UserType';
import { CURRENT_USER, UPDATE_USER } from '../../commons/apollo/user';
import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { useAlert } from "react-alert";

const User = () => {
    const [user, setUser] = useState<UserI>(null);
    const [updateUser] = useMutation(UPDATE_USER);
    const id = Cookies.get("user");
    const alert = useAlert();

    useQuery(CURRENT_USER, {
        variables: { id: id },
        onCompleted: (response) => {
            setUser(response.getUser);
        }
    });

    const save = async () => {
        const response = await updateUser({
            variables: {
                id: user.id,
                user: {
                    address: user.address,
                    city: user.city,
                    country: user.country,
                    phone: user.phone,
                    email: user.email,
                    photo: user.photo
                }
            }
        });

        if (response.errors) {
            alert.error("Ocurrio un error");
            console.info("error al editar");
        }

        alert.success("Modificación exitosa");
    }

    return (<>
        <div className={styles.main}>
            <div className={`${styles.option}`}>
                <div className={styles.photo}>
                    <Image src={user?.photo} alt='' width={110} height={110} />
                </div>
                <div>
                    <div className={styles.username}>
                        {user?.username}
                    </div>
                </div>
            </div>
            <div className={styles.option}>
                <div className={styles.title}>
                    Tus datos de perfil
                </div>
                <div>
                    <div className={styles.input}>
                        <div>Dirección</div>
                        <input type="text" value={user?.address}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    address: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className={styles.input}>
                        <div>Ciudad</div>
                        <input type="text" value={user?.city}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    city: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className={styles.input}>
                        <div>País</div>
                        <input type="text" defaultValue={user?.country}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    country: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className={styles.input}>
                        <div>Teléfono</div>
                        <input type="tel" value={user?.phone}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    phone: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className={styles.input}>
                        <div>Correo electrónico</div>
                        <input type="email" value={user?.email}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    email: e.target.value
                                })
                            }} />
                    </div>
                    <div>
                        <button className={styles.button_save} onClick={save}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default User;