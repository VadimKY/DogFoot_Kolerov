import React from 'react';
import CardList from "../../components/CardList/CardList";
import Sort from "../../components/Sort/Sort";
import {useContext} from "react";
import {CardContext} from "../../context/cardContext";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import {skeletonFakeArray} from "./CatalogPageData";


const CatalogPage = () => {
    const { cards } = useContext(CardContext);
    const  skeletonArray = skeletonFakeArray.map(() => <CardSkeleton />)

  return (
      <>
          <ContentHeader title="Каталог"/>
          <Sort />
          {cards.length === 0 ? (
              <div className='cards'>
                  {skeletonArray}
              </div>

          ) : (
              <CardList cards={cards} />
          )}

      </>
  );
};

export default CatalogPage;
