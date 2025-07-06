import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CharacterCard = (props) => {
    const statusIconPath = props.info.status === "Alive" ? "/icons/heart.svg" : props.info.status === "Dead" ? "/icons/dead_skull.svg" : "/icons/question.svg"

  return (
    <div className='d-flex justify-content-center align-items-center'>
        <Card border="dark" >
            <Card.Img variant="top" src={props.info.image} />
            <Card.Body>
                <Card.Title>{props.info.name}</Card.Title>
                <Card.Text>
                    <div className='d-inline-block d-flex justify-content-start align-item-center'>
                        <div className='d-inline-block'>
                            <b>Status:</b>{' '}
                            <div className='d-inline-block'>
                                <img src={statusIconPath} alt="icon" height="20rem" />
                            </div>
                            <div>
                                <b>Gender:</b> {props.info.gender}
                            </div>
                            <div>
                                <b>Species:</b> {props.info.species}
                            </div>
                        </div>
                    </div>
                </Card.Text>
                <Button variant="primary">See Character</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CharacterCard;