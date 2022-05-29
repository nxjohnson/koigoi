import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import StarRating from '../shared_components/StarRating.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import { ProdPageContext } from '../product_page.jsx';

const Carousel = (productDetails) => {
  const {prod_id, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent} = useContext(ProdPageContext);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const display = productDetails.slice(currentImageIdx, (currentImageIdx + 4)); // change to 4
  const maxDisplay = productDetails.length - 4; // change to 4
  const placeholder = 'http://placecorgi.com/260/180';

  const nextSlide = () => {
    setCurrentImageIdx(currentImageIdx === maxDisplay ? currentImageIdx : currentImageIdx + 1);
  };

  const prevSlide = () => {
    setCurrentImageIdx(currentImageIdx === 0 ? 0 : currentImageIdx - 1);
  };

  useEffect(() => {
    setCurrentImageIdx(0);
  }, [productDetails]);

  const handleModalClick = (id) => {
    // console.log(id); // gets the current product ID for clicked card
    // ComparisonModal(id);
    setModalHeaderContent('COMPARING')
    setModalBodyContent(<ComparisonModal mainId={prod_id} relatedId={id}/>);
    setShowModal(true);
  }

  return (
    <CarouselContainer>
      {currentImageIdx !== 0 ?
      <LeftArrow><FontAwesomeIcon icon={faAngleLeft} onClick={() => prevSlide()}/></LeftArrow>
      : null}
      <CarouselWrapper>
        {display.map((details) => {
          return (
            <IndividualCardStyle key={details.id}>
              <ImageStyle
                src={details.images === null ? placeholder : details.images}
              />
              <ButtonStyle onClick={() => handleModalClick(details.id)}> <FontAwesomeIcon icon={faStar} size='2xs' color='white'/></ButtonStyle>
              <CategoryStyle>{details.categories}</CategoryStyle>
              <NameStyle>{details.names}</NameStyle>
              <PriceStyle>${details.prices}</PriceStyle>
              <RatingsStyle>{StarRating(details.ratings.avgRating)}</RatingsStyle>
            </IndividualCardStyle>
          )
        })}
      </CarouselWrapper>
      {currentImageIdx === maxDisplay ? null :
      <RightArrow><FontAwesomeIcon icon={faAngleRight} onClick={() => nextSlide()}/></RightArrow>}
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 1000px;
  left: 50%;
  transform: translateX(-50%);
`;

const CarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const LeftArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 32px;
`;

const RightArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 32px;
`;

const IndividualCardStyle = styled.div`
  position: relative;
  border: 1px solid black;
  // min-width: 250px;
  width: 250px;
  height: fit-content;
  margin-right: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
  object-fit: cover;
`;

const ButtonStyle = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
`;

const ImageStyle = styled.img`
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 250px;
  position: relative;
`;

const CategoryStyle = styled.div`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 15px;
  padding-left: 5px;
`;

const NameStyle = styled.div`
  font-weight: bold;
  font-size: 17px;
  padding-left: 5px;
`;

const PriceStyle = styled.div`
  font-weight: normal;
  font-size: 15px;
  padding-left: 5px;
`;

const RatingsStyle = styled.div`
  font-weight: normal;
  font-size: 15px;
  padding-left: 5px;
`;

export default Carousel;