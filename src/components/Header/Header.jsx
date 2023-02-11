
//import Logo from '../Logo/Logo';
//import Search from '../Search/Search';
import s from './Header.module.css';
//import Search from "../Search/Search";
import cn from 'classnames';



const Header = ({children}) => {
    return (
        <header className={cn(s.header)}>
            <div className="container">
                <div className={s.wrapper}>
                    {children}
                </div>
            </div>
        </header>
    )
}

export default Header;