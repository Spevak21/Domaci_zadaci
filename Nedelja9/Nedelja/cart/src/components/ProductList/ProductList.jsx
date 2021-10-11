import Product from "../Product/Product";
import StyledProductList from "./StyledProductList";

const ProductList = ({products, setQtyControl}) => {
    return (

        <StyledProductList>
            {products.map(product => <Product key={product.id} product={product} setQtyControl = {setQtyControl} />)}
        </StyledProductList>

    );
}
 
export default ProductList;