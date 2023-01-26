import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import ContactBtn from "./contactBtn";
import WebFont from "webfontloader";

function TextAnimation({ isBlack }) {
  const blackArray = "Created by Lucas Song".split(" ");
  const instructionsArray = "Use the buttons on the grid!".split(" ");
  const whiteArray = "Lucas Song".split("");
  const [isOpen, setOpen] = useState({ isClick: false, isHover: false });
  const [isO, setO] = useState(false);

  const { isClick, isHover } = isOpen;
  if (isO ? true : isHover) {
    return (
      <>
        {" "}
        <WrapperW>
          {whiteArray.map((item, index) => (
            <span key={index}>{item} </span>
          ))}
        </WrapperW>
        <WrapperC>
          <span> Get in </span>
          <ContactBtn
            onMouseDown={() => setO(!isO)}
            onMouseEnter={() =>
              setOpen({
                isHover: !isHover & isClick,
                isClick: false,
              })
            }
            onMouseLeave={() => setOpen({ isClick: true })}
          />
        </WrapperC>
        <div></div>
      </>
    );
  } else {
    return !isBlack ? (
      <>
        <WrapperB>
          {blackArray.map((item, index) => (
            <span key={index} className="font-Montserrat-Black">
              {item}
            </span>
          ))}
        </WrapperB>
        <WrapperInstruction>
          {instructionsArray.map((item, index) => (
            <span key={index} className="font-Montserrat-Black">
              {item}
            </span>
          ))}
        </WrapperInstruction>
      </>
    ) : (
      <>
        {" "}
        <WrapperW>
          {whiteArray.map((item, index) => (
            <span key={index}>{item} </span>
          ))}
        </WrapperW>
        <WrapperC>
          <span> Get in </span>
          <ContactBtn
            onMouseDown={() => setO(!isO)}
            onMouseEnter={() =>
              setOpen({
                isHover: !isHover & isClick,
                isClick: false,
              })
            }
            onMouseLeave={() => setOpen({ isClick: true })}
          />
        </WrapperC>
      </>
    );
  }
}

const animation = keyframes`
0% {opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(5deg) rotateZ(5deg); filter: blur(10px); z-index: 200;}
25% {opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);z-index: 200;
75% {opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);z-index: 200;
100% {opacity: 0; transform: translateY(100px) skewY(10deg) skewX(5deg) rotateZ(5deg); filter: blur(10px);z-index: 200;}
`;
const animationW = keyframes`
85% {opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(5deg) rotateZ(0deg); filter: blur(10px);}
100% {opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);
`;

const animationButton = keyframes`
0% {opacity: 0; transform: translatex(-150px) skewX(5deg) rotateZ(0deg); filter: blur(10px); scale: 0.5}
100% {opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);
`;

const WrapperButton = styled.span`
display: inline-block;
button{
  color: black;
  opacity: 0;

  animation-name: ${animationButton};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  
  user-select: none
  
  font-family: "Menlo", monospace;
  position: fixed;
  bottom: 51vh;
  left: 70vw;
  height: 5vh;
  width: 10vw;
  z-index: 11;
  user-select: none;

  
}
button:nth-child(1){
  bottom: 51vh;
}
button:nth-child(2){
  bottom: 65vh;

}


`;

const WrapperC = styled.span`
display: inline-block;
span{
  color: white;
  opacity: 0;

  animation-name: ${animationW};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  
  user-select: none
  
  font-family: "Menlo", monospace;
  position: fixed;
  bottom: 41vh;
  left: 20vw;
  font-size: 3vw;
  z-index: 10;
  user-select: none;

}

`;

const WrapperW = styled.span`
display: inline-block;
span{
  color: white;
  opacity: 0;

  animation-name: ${animationW};
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  
  user-select: none
  
  font-family: "Menlo", monospace;
  position: fixed;
  margin-right: 50vw;
  bottom: 46.4vh;
  text-align: center;
  font-size: 5.8vw;
  z-index: -1;
  user-select: none;
  overflow: hidden;
}
span:nth-child(1){
  animation-delay:0.1s;
  right: 27vw;
}
span:nth-child(2){
  animation-delay:0.2s;
  right: 23.65vw;

}
span:nth-child(3){
  animation-delay:0.3s;
  right: 21vw;
}
span:nth-child(4){
  animation-delay:0.4s;
  right: 18.9vw;
}
span:nth-child(5){
  animation-delay:0.5s;
  right: 15vw;
}
span:nth-child(6){
  animation-delay:0.6s;
  right: 12vw;
}
span:nth-child(7){
  animation-delay:0.7s;
  right: 9.3vw;
}
span:nth-child(8){
  animation-delay:0.8s;
  right: 6.1vw;
}
span:nth-child(9){
  animation-delay:0.9s;
  right: 3.1vw;
}
span:nth-child(10){
  animation-delay:1s;
  right: 0vw;
}
`;

const WrapperB = styled.span`
  display: inline-block;

  span{
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    
    
    color: black;
    user-select: none

    font-family: Montserrat-Black;
    font-size: 4.5vh;

    position: absolute;
    right: 16px;
    bottom: 65vh;
    z-index: 2000;
    user-select: none;

  }
  span:nth-child(1){
    animation-delay:0.1s;
    right: 35vw;
  }
  span:nth-child(2){
    animation-delay:0.2s;
    right: 32vw;
  
  }
  span:nth-child(3){
    animation-delay:0.3s;
    right: 26.2vw;
  }
  span:nth-child(4){
    animation-delay:0.4s;
    right: 20.4vw;    
  }
  span:nth-child(5){
    animation-delay:0.5s;
    right: 15vw;
  }
  span:nth-child(6){
    animation-delay:0.6s;
    right: 12vw;
  }
  span:nth-child(7){
    animation-delay:0.7s;
    right: 9.3vw;
  }
  span:nth-child(8){
    animation-delay:0.8s;
    right: 6.1vw;
  }
  span:nth-child(9){
    animation-delay:0.9s;
    right: 3.1vw;
  }
  span:nth-child(10){
    animation-delay:0.9s;
    right: 0vw;
  }
`;

const WrapperInstruction = styled.span`
  display: inline-block;

  span{
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    
    
    color: black;
    user-select: none

    font-family: Montserrat-Black;
    font-size: 4.5vh;

    position: absolute;
    right: 16px;
    bottom: 65vh;
    z-index: -1;
    user-select: none;

  }
  span:nth-child(1){
    animation-delay:4.1s;
    right: 37vw;
  }
  span:nth-child(2){
    animation-delay:4.2s;
    right: 33.5vw;
  
  }
  span:nth-child(3){
    animation-delay:4.3s;
    right: 25.8vw;
  }
  span:nth-child(4){
    animation-delay:4.4s;
    right: 22.8vw;    
  }
  span:nth-child(5){
    animation-delay:4.5s;
    right: 19.2vw;
  }
  span:nth-child(6){
    animation-delay:4.6s;
    right: 14.6vw;
  }
  span:nth-child(7){
    animation-delay:4.7s;
    right: 9.3vw;
  }
  span:nth-child(8){
    animation-delay:0.8s;
    right: 6.1vw;
  }
  span:nth-child(9){
    animation-delay:0.9s;
    right: 3.1vw;
  }
  span:nth-child(10){
    animation-delay:0.9s;
    right: 0vw;
  }
`;

export default TextAnimation;
