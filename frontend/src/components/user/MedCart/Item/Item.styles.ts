import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid lightblue;
    border-radius: 20px;
    height: 100%;

    button {
        border-radius: 0 0 20px 20px;
        background-color: #008CBA;
        color: black;
        
    }
        button {
  transition-duration: 0.4s;
}

button:hover {
  background-color: #04AA6D; /* Green */
  color: white;
}

    // img {
    //     max-height: 250px;
    //     object-fit: cover;
    //     border-radius: 20px 20px 0 0;
    // }

    div {
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
    }

    h3{
     color: #5F9EA0;
     font-family: "Raleway", sans-serif;
     background-color:#E0FFFF;
      border: 2px solid blue;
  border-radius: 5px;
  text-align: center;
    }

    p{
    
    }
`
