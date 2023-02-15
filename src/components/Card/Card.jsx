import './index.css';
//import save from "./save.svg";
import cn from "classnames";
import {ReactComponent as Save} from "./save.svg";



const Card = ({name, price, discount, wight, description, pictures, tags, currentUser, onProductLike, likes, _id}) => {
    const discountPrice = Math.round( price - price * discount / 100);
    const isLiked = likes.some(id => id === currentUser?.id);

    const handleLikeClick = () => {
        console.log('click', isLiked)
        onProductLike({_id, likes})
    };

  return (
      <div className='card'>
          <div className='card__sticky card__sticky_type_top-left'>
              {discount !== 0 && <span className='card__discount'>{`-${discount}%`}</span>}
              {tags && tags.map(tag => <span key={tag} className={cn('tag', {
                  //[`tag_type_${tag}`]: true
                  [`tag_type_new`]: tag === 'new',
                  [`tag_type_sale`]: tag === 'sale',
              })}>{tag}</span>)}
          </div>
              <div className='card__sticky card__sticky_type_top-right'>
                  <button className={cn('card__favorite', {
                      'card__favorite_is__active' : isLiked
                  })} onClick={handleLikeClick}>
                      {/*<img src={save} alt="Добавить в избранное" className='card__favorite'/>*/}
                      <Save className="card__favorite" />
                  </button>
              </div>
              <a href='#' className='card__link'>
                  <img src={pictures} className='card__image' alt={description}/>
                  <div className='card__desc'>
                      <span className={discount !== 0 ? 'card__old-price' : 'card__price'}>{price}&nbsp;P</span>
                      {discount !== 0 && <span className='card__price card__price_type_discount'>{discountPrice}&nbsp;Р</span>}
                      <span className='card__wight'>{wight}</span>
                      <p className='card__name'>{name}</p>
                  </div>
                  <a href='#' className='card__cart btn btn_type_primary'>В корзину</a>
              </a>
      </div>

  );
};

export default Card;
