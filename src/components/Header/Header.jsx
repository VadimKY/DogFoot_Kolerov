import s from './Header.module.css';
import cn from 'classnames';
import {Link} from "react-router-dom";
import { ReactComponent as FavouriteIcon } from  './img/favorites.svg';
import {CardContext} from "../../context/cardContext";
import {useContext} from "react";

const Header = ({user, updateUserHandle, children}) => {
    // const handleClickButtonEdit = (e) => {
    //     e.preventDefault();
    //     updateUserHandle({name: "Данила Нагорный", about: 'Препод'});
    // }

   const { favourites } = useContext(CardContext);

    return (
        <header className={cn(s.header, 'js-click')}>
            <div className="container">
                {/*{user?.email && <span>{user?.email}</span>}*/}
                {/*{user?.name ? <span>{user?.name}</span> : null}*/}

                {/*<button onClick={handleClickButtonEdit}>Изменить</button>*/}

                <div className={s.wrapper}>
                    {children}
                    <div className={s.iconsMenu}>
                        <Link className={s.favouritesLink} to={{pathname: '/favourites'}}>
                            <FavouriteIcon />
                            {favourites.length !== 0 && <span className={s.iconBubble}>{favourites.length}</span>}
                            {/*Если длинна массива не равна нолю отражаем массив с лайками*/}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;