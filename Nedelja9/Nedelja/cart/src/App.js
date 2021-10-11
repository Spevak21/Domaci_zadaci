import { useEffect, useState } from 'react';
import './App.css';
import ProductForm from './components/ProductForm/ProductForm';
import ProductList from './components/ProductList/ProductList';
import Total from './components/Total/Total';
import { getAllProducts } from './service';

function App() {

  const [products, setProducts] = useState([]);
  const [qtyControl, setQtyControl] = useState(true);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllProducts().then(res => {
      console.log(res.data);

      setProducts(res.data);
      setTotal(calculatePrice(res.data));
    })
  }, [qtyControl])

  function calculatePrice(allProducts) {
    let sum = 0;
    allProducts.forEach(product => {
      sum += product.price * product.quantity;
    });
    return sum;
  }

  return (
    <div className="App">
      <ProductForm setQtyControl = {setQtyControl}/>
      <ProductList products = {products} setQtyControl = {setQtyControl}/>
      <Total total = {total} />
    </div>
  );
}

export default App;
