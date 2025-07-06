import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const EpisodeCard = (props) => {
    const getSeason = (code) => {
        const splittedCode = code.split('');
        const seasonStr = `${splittedCode[1]}${splittedCode[2]}`;
        return parseInt(seasonStr);
    }

    const getEpisode = (code) => {
        const splittedCode = code.split('');
        const episodeStr = `${splittedCode[4]}${splittedCode[5]}`;
        return parseInt(episodeStr);
    }

    return (
        <div className='d-flex justify-content-center align-items-center px-2'>
            <Card className='w-100' border="dark" >
                <Card.Body>
                    <Card.Title>{props.info.name}</Card.Title>
                    <Card.Text>
                        <div className='d-inline-block d-flex justify-content-start align-item-center'>
                            <div className='d-inline-block'>
                                <div>
                                    <b>Season:</b> {getSeason(props.info.episode)}
                                </div>
                                <div>
                                    <b>Episode:</b> {getEpisode(props.info.episode)}
                                </div>
                                <div>
                                    <b>Release Date:</b> {props.info.air_date}
                                </div>
                            </div>
                        </div>
                    </Card.Text>
                    <Button variant="primary">Episode Information</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default EpisodeCard