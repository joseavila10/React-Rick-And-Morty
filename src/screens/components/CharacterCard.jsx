import React from 'react';
import './styles/characterCard.css';

const CharacterCard = (props) => {
    const statusIconPath = props.status === "Alive" ? "/icons/heart.svg" : props.status === "Dead" ? "/icons/dead_skull.svg" : "/icons/question.svg"

  return (
    <div className="mainDiv">
        <div className="charCard">
                <div className='charImgDiv'>
                    <img className="charImg" src={props.image} alt="character" />
                </div>
                <div className='charName'>{props.name}</div>
        </div>
        <div className="borderDiv"></div>
        <div className="additionalInfo">
            <div style={{display: "inline-block"}}>
                Status:
                <div className='infoIcon' style={{display: "inline-block"}}>
                    <div><img src={statusIconPath} alt="icon" height="20rem" /></div>
                </div>
            </div>
            <div>
                Species: {props.species}
            </div>
        </div>
    </div>
  )
}

export default CharacterCard;