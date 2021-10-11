import styled from 'styled-components';

const StyledProductList = styled.div`
    
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    width: 117rem;
    padding: 2rem;

    background-color: white;

    @media only screen and (max-width: 1200px) {
        width: 60rem;
    }
`

export default StyledProductList