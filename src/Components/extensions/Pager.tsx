import { useContext } from 'react';
import { ProductContext } from '../context/ProductProvider';

const Pager = () => {
  const { setPageNumber } = useContext(ProductContext);

  const handleChangePage = (value: number) => {
    setPageNumber(value);
  };

  return (
    <div className='pager'>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <button
          key={item}
          onClick={() => handleChangePage(item)}>
          {item + 1}
        </button>
      ))}
    </div>
  );
};

export default Pager;