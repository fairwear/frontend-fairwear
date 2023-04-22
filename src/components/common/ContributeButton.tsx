import { Button, Typography } from '@mui/material'
import React from 'react'
import '../Components.css'

function ContributeButton() {
    return (
        <Button className="login" variant="contained">
            <Typography className="login button-text">
                Contribute
            </Typography>
        </Button>
    )
}

export default ContributeButton