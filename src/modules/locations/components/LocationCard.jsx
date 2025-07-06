import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const LocationCard = (props) => {
    return (
        <div className='d-flex justify-content-center align-items-center px-2'>
            <Card className='w-100' border="dark" >
                <Card.Body>
                    <Card.Title>{props.info.name}</Card.Title>
                    <Card.Text>
                        <div className='d-inline-block d-flex justify-content-start align-item-center'>
                            <div className='d-inline-block'>
                                <div>
                                    <b>Type:</b> {props.info.type}
                                </div>
                                <div>
                                    <b>Dimension:</b> {props.info.dimension}
                                </div>
                            </div>
                        </div>
                    </Card.Text>
                    <Button variant="primary">See Location</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default LocationCard;