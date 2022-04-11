import React, { useState, useEffect } from "react";
import "./styles/episodeCard.css"

const EpisodeCard = (props) => {
  return (
    <div className="episodeCardMainDiv">
        <div className="episodeName">
            {props.data.name}
        </div>
        
        <div className="episodeExtraInfo">

            <div className="episodeReleased">
                <span className="boldText">Released: </span> {props.data.air_date}
            </div>

            <div className="episodeSeason">
            Season: <span className="boldText">{props.data.episode.substr(1, 2)} </span> 
            Episode: <span className="boldText">{props.data.episode.substr(4, 2)} </span> 
            </div>

        </div>  
    </div>
  )
}

export default EpisodeCard;