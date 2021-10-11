import { changeQuantity } from "../../service";
import StyledProduct from "./StyledProduct";

const Product = ({product, setQtyControl}) => {

    return (

        <StyledProduct className="item">
            <div className="left">
                <p>{product.name}: ${product.price}</p>
                <p>Qty: {product.quantity}</p>
                
                <button onClick={event => {
                    event.target.parentElement.nextSibling.classList.toggle('show');
                }}>Show info</button>
                <div>
                    <button onClick={() => {
                        let tmp = {...product};
                        
                        if(tmp.quantity > 0) {
                            tmp.quantity -= 1;
                            changeQuantity(tmp.id, tmp.quantity).then(res => {
                                // console.log(res)
                                setQtyControl(prev => !prev);
                            })
                        }else {
                            tmp.quantity=0
                        }
                    }}>&#8211;</button>

                    <button onClick={() => {
                        let tmp = {...product};
                        tmp.quantity += 1;
                            changeQuantity(tmp.id, tmp.quantity).then(res => {
                                // console.log(res)
                                setQtyControl(prev => !prev);
                            })
                    }}>+</button>
                </div>
            </div>
            <div className="right">
                <p>Informations:</p>
                <p>{product.info}</p>
            </div>
            
        </StyledProduct>

    );
}
 
export default Product;