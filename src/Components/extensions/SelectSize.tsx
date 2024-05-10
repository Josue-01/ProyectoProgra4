import { useContext } from 'react';
import { ProductContext } from '../context/ProductProvider';

const SelectSize = () => {
  const { pageSize, setPageSize } = useContext(ProductContext);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setPageSize(value);
  };

  return (
    <div>
      <select name="size" id="size" className='size-select' onChange={handleChange} value={pageSize}>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
    </div>
  );
};

export default SelectSize;