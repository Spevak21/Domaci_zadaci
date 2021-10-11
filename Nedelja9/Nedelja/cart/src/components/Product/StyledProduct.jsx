import styled from "styled-components";

const StyledProduct = styled.div`
    
    display: flex;
    column-gap: 1rem;

    padding: 1rem;
    width: 56rem;
    border: 1px solid gray;

    background-color: #c9c9c9;
    transition: all 1s;

    &.new {
        background-color: #7cdf7c;
    }

    .left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 1rem;

        width: 50%;

        /* background-color: white; */

        button {
            padding: .5rem 1rem;
            cursor: pointer;
        }

        div {
            display: flex;
            justify-content: space-between;
            width: 8rem;

            button {
                height: 3rem;
                width: 3rem;
                border-radius: 10rem;
                border: 1px solid white;

                &:first-of-type {
                    color: gray;
                    border: 1px solid gray;
                    background-color: #c9c9c9;
                }
            }
        }
        
    }
    
    .right {
        width: 50%;
        padding-left: 1rem;
        border-radius: 0;
        border-left: 1px solid gray;
        visibility: hidden;

        /* background-color: white; */

        p:first-of-type {
            margin-bottom: 1rem;
        } 
    }

    .show {
        visibility: visible !important;
    }

    p {
        font-size: 1.6rem;

        
    }
    

`

export default StyledProduct