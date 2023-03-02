import './index.css';
import Card from "../Card/Card";
import {useContext} from "react";
import {CardContext} from "../../context/cardContext";
import {UserContext} from "../../context/userContext";
import NotFound from "../NotFound/NotFound";
import {useNavigate} from "react-router-dom";
//import data from '../data.json'

const CardList = () => {
    const { user: currentUser, isLoading } = useContext(UserContext);
    const { cards, handleLike } = useContext(CardContext);
    const navigate = useNavigate()

    return (
        <>
            {!cards.length && !isLoading ? (
                <NotFound title="Простите, по вашему запросу ничего не найдено." buttonText="Назад" buttonAction={() => navigate(0)} />
            ): null}
        <div className='cards'>
            {cards.map(el => {
                return (
                <Card key={el._id} {...el} onProductLike={handleLike} currentUser={currentUser} />
                )
            }) }
        </div>
        </>
    );
};

export default CardList;
