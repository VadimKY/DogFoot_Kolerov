
//import Logo from '../Logo/Logo';
//import Search from '../Search/Search';
import s from './Header.module.css';
//import Search from "../Search/Search";
import cn from 'classnames';



const Header = ({user, updateUserHandle, children}) => {

    const handleClickButtonEdit = (e) => {
        e.preventDefault();
        updateUserHandle({name: 'Вадим Колеров', about: 'студент'});
    }

    return (
        <header className={cn(s.header, 'js-click')}>
            <div className="container">
                {user?.email && <span>{user?.email}</span>} {/* если левая часть true то выполнить правую*/}
                {user?.name ? <span>{user?.name}</span> : null} {/* тоже самое, в другой форме*/}


                <button onClick={handleClickButtonEdit}>Изменить</button>

                <div className={s.wrapper}>
                    {children}
                </div>
            </div>
        </header>
    )
}

export default Header;