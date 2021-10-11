import styled from 'styled-components'

const StyledCalculator = styled.div`

    display: flex;
    justify-content: flex-start;
    column-gap: 1rem;

    height: auto;
    width: fit-content;
    margin: 2rem 0;
    padding: 1rem;
    border-radius: .5rem;
    background-color: #f3db9e;
    box-shadow: .1rem .1rem .5rem rgba(158, 158, 158, 0.3);
    
    * {
        color: #504426;
    }

    *:not(:first-child) {
        box-shadow: .2rem .2rem .5rem rgba(110, 96, 61, .3);
    }

    input {
        padding: .5rem;
        border-radius: .5rem;
        font-size: 2rem;

        &:first-of-type {
            border: none;
            color: white;
            background-color: #d6c089;
            box-shadow: .2rem .2rem .5rem rgba(110, 96, 61, .3) inset;
        }

        &:last-of-type {
            border: 1px solid white;
            background-color: #ffedc1;
        }
        

        &:focus {
            outline: none;
        }
    }

    button{
        height: 3.4rem;
        border: 1px solid white;
        border-radius: .5rem;
        background-color: #ffedc1;
        padding: 0 1rem 0 1rem;
        

        &:not(:last-of-type) {
            width: 3.4rem;
            border-radius: 5rem;
            padding: 0;
        }

        &:active {
            transform: scale(.95);
            box-shadow: .1rem .1rem .3rem rgba(110, 96, 61, .6);
        }
    }

`

export default StyledCalculator