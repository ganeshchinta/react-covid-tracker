import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core';
import './InfoBox.css'
import {printStyleStats} from '../../Utitl'
function InfoBox({title,cases,total,onClick,active,isRed}) {
    return (
        <Card  className={`infoBox ${active&&"infoBox__selected" } ${isRed&&"infoBox__red" }   `} onClick={onClick}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed&&"infoBox__green" }`}>{printStyleStats(cases)}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    Total Cases: {printStyleStats(total)}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
