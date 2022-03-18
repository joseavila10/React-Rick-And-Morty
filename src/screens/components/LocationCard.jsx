import React from "react";
import "./styles/locationCard.css";

const LocationCard = (props) => {
    return(
        <div className="locationMainDiv">
            <div className="locationName">
                {props.info.name}
            </div>

            <div className="borderDiv"></div>

            <div className="locationType">
                <b>Type:</b> {props.info.type}
            </div>

            <div className="locationDimension">
                <b>Dimension:</b> {props.info.dimension}
            </div>

            <div className="locationResidentsNum">
                <b>Residents:</b> {props.info.residents.length}
            </div>
            
        </div>
    );
}

export default LocationCard;