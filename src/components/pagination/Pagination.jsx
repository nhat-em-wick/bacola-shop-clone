import React, {useEffect, useState} from 'react';
import Button,{ButtonCircle} from '../button/Button';
import './pagination.scss'

const Pagination = ({ productsPerPage, totalProducts, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [displayPages, setDisplayPage] = useState([])
  
  useEffect(() => {
    let dotsInit = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'
    let tempNumberOfPages = [...pageNumbers]
    if(pageNumbers.length < 6) {
      tempNumberOfPages = pageNumbers
    }
    else if(currentPage >= 1 && currentPage <= 2){
      tempNumberOfPages=[1,2,3 ,pageNumbers.length]
    }
    else if (currentPage === 3) {
      const sliced = pageNumbers.slice(0,4)
      tempNumberOfPages = [...sliced, pageNumbers.length]
    }
    else if(currentPage > 3 && currentPage < pageNumbers.length -2) {
      const sliced1 = pageNumbers.slice(currentPage - 2 , currentPage)
      const sliced2 = pageNumbers.slice(currentPage , currentPage + 1)
      tempNumberOfPages = [1, ...sliced1, ...sliced2, pageNumbers.length]
    }
    else if(currentPage > pageNumbers.length - 3){
      const sliced = pageNumbers.slice(pageNumbers.length - 4)
      tempNumberOfPages = [1 ,...sliced]
    }
    
    setDisplayPage(tempNumberOfPages)
  }, [currentPage])

  const handlePageChange = (newPage) => {
    if(onPageChange){
      onPageChange(newPage)
      setCurrentPage(newPage)
    }
  }

  return (  
    <nav>
      <ul className='pagination'>
        <li className='pagination__item'>
          <ButtonCircle 
            className={`pagination__item__link ${currentPage === 1 && 'disable'} `}
            onClick={() => handlePageChange(currentPage - 1)}
          >
          <i className='bx bx-chevron-left'></i>
            </ButtonCircle>
        </li>
        {displayPages.map((number, index) => (
          <li key={index} className='pagination__item'>
            <ButtonCircle 
              onClick={number === '...' || number === ' ...' || number === '... ' ? null :
              () => handlePageChange(number)
                } 
              className={`pagination__item__link ${currentPage === number && 'active'}`}>
              {number}
            </ButtonCircle>
          </li>
        ))}
        <li className='pagination__item'>
          <ButtonCircle className={`pagination__item__link ${currentPage === pageNumbers.length && 'disable'}`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
          <i className='bx bx-chevron-right'></i>
            </ButtonCircle>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
