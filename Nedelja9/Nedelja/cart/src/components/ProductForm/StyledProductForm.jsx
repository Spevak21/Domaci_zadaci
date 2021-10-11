import styled from 'styled-components';

const StyledProductForm = styled.div`
    
    display: flex;
    flex-direction: column;
    /* justify-content: flex-start; */
    align-items: flex-start;
    row-gap: 1rem;

    width: 60rem;
    padding: 2rem;
    background-color: white;

    div {
        display: flex;
        justify-content: space-between;
        width: 100%;

        p {
            font-size: 1.8rem;
            line-height: 3rem;
        }

        input {
            width: 85%;
            padding: .5rem 1rem;
        }
    }
    
    button {
        margin-top: 1rem;
        padding: .5rem 1rem;
        align-self: flex-end;
        cursor: pointer;
    }
`

export default StyledProductForm