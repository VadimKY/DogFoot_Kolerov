import './index.css';
import Header from "../Header/Header";
import CardList from "../CardList/CardList";
import {useEffect, useState} from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import data from '../../assets/data.json';
import Footer from "../Footer/Footer";
import Button from "../Button/Button";

function Application() {
    const [cards, setCards] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        handleRequest();
    }, [searchQuery]);


    const handleRequest = () => { //запрос к серверу при поиске
        const filterCard = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
        setCards(filterCard);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        handleRequest();
    }

    const handleInputChange =(inputValue) => {
        setSearchQuery(inputValue);
    }
    return (
        <>
            <Header>
                <Logo className='logo logo_place_header' href='/'/>
                <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
            </Header>
            <main className='content container'>
                {/*<Button type='primary'>Купить</Button>
                <Button type='secondary'>Оплатить</Button>*/}
                <CardList goods = {cards}/>
            </main>
            <Footer />

        </>
    )
}

export default Application;