import { useState } from "react";
import { addNewProduct } from "../../service";
import StyledProductForm from "./StyledProductForm";

const ProductForm = ({setQtyControl}) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [info, setInfo] = useState('');
    let quantity = 0;

    function resetForm() {
        setName('');
        setPrice('');
        setInfo('');
    }

    return (

        <StyledProductForm>
            <>
            <div>
                <p>Name:</p>
                <input value={name} type="text" placeholder="e.g.) lolipop" onChange={event => {
                    setName(event.target.value);
                }} />
            </div>
            <div>
                <p>Price:</p>
                <input value={price} type="text" placeholder="e.g.) 1" onChange={event => {
                    if(!isNaN(Number(event.target.value))) {
                        setPrice(Number(event.target.value));
                    }
                }} />
            </div>
            <div>
                <p>Info:</p>
                <input value={info} type="text" placeholder="e.g.) product of Chupachups" onChange={event => {
                    setInfo(event.target.value);
                }} />
            </div>
            <button onClick={() => {
                if(name !== '' && price !== '' && price > 0 && info !== '') {
                    addNewProduct({name, price, info, quantity}).then(res => {
                        console.log(res)
                        setQtyControl(prev => !prev);
                        resetForm();

                        // Experiment obojenja novih proizvoda dok se ne refreshuje stranica
                        setTimeout(() => {
                            let lastItem = document.querySelectorAll('.item')[document.querySelectorAll('.item').length-1];
                            lastItem.classList.add('new');
                        }, 500);
                        

                    })
                }
            }}>Create Product</button>
            </>
        </StyledProductForm>

    );
}
 
export default ProductForm;