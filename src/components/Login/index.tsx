import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import styles from './sessionForm.module.css';


const Index = () => {

  const auth = useAuth();
  const router = useRouter();
  const [formState, setFormState] = useState({
    username: '',
    password: ''
  });

  const signIn = async(event: any) => {
    event.preventDefault();
    try {
     await auth.signIn(formState.username,formState.password);
     router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form_session}>
        <div>
          <label className={styles.text_form_session}>
              Lista de la compra</label>
        </div>
        <form>
          <div>
            <input type="text" name="username" placeholder='Username' className={styles.input}
               value={formState.username} onChange={(e) =>
                setFormState({
                  ...formState,
                  username: e.target.value
                })
              } />
          </div>
          <div>
            <input type="password" name="password" placeholder='Contraseña' className={styles.input}
              value={formState.password} onChange={(e) =>
                setFormState({
                  ...formState,
                  password: e.target.value
                })
              } />
          </div>
          <div>
            <button type="submit" className={styles.btn_form_session}
            onClick={signIn}>
              Iniciar sesión
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
export default Index;