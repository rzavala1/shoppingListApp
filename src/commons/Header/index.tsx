
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserI } from '../../types/UserType';


const Header = () => {

    const aut = useAuth();
    const [user, setUser] = useState(null);

    aut.getCurrentUser().then((response: UserI) => {
        setUser(response)
    })

    return (<>
        <header>
            <div className="main">
                <div className='text'>
                    <Link href="/">
                        Lista de la compra
                    </Link>
                </div>
                <div className='user_link'>
                    <div>
                        <Link href="/user">{user?.username ? user?.username : ""}</Link>
                    </div>
                    <div>
                        <Image src={user?.photo ? user?.photo : ""} alt='' width={50} height={50} />
                    </div>
                </div>
            </div>
        </header>
    </>);
}
export default Header;