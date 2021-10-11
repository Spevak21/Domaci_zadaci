import StyledTotal from "./StyledTotal";

const Total = ({total}) => {

    let tax = Math.round((total / 100 * 15) * 100) / 100;
    let totalWithTax = total + tax;

    return (

        <StyledTotal>
            <p>Total Price: ${total}</p>
            <p>Tax(15%): ${tax}</p>
            <p>Total including tax: ${totalWithTax}</p>
        </StyledTotal>

    );
}
 
export default Total;