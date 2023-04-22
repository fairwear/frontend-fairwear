import { Button, Typography } from '@mui/material'
import './BrandComponents.css'
import ContributeButton from '@components/common/ContributeButton'
import '../Components.css'
export default function BrandBannerInfo() {
    return (
        <div className='brand-banner'>
            <div className='image-container'>
                <img className='image' src='src/assets/images/versace_logo.png' />
            </div>
            <div className='info-container'>
                <Typography variant="h2">Brand Name</Typography>
                <Typography variant="h6" className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus ornare suspendisse sed nisi lacus sed viverra. Vitae justo eget magna fermentum iaculis eu. Ultrices neque ornare aenean euismod elementum nisi quis. Ac felis donec et odio. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Pellentesque adipiscing commodo elit at imperdiet. Eget est lorem ipsum dolor. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Mattis enim ut tellus elementum sagittis.</Typography>
                <div className='button-container'>
                    <ContributeButton />
                    <Button className="signup-button" variant="outlined" >
                        <Typography className='button-text' >
                            View Items 
                        </Typography>
                    </Button>
                </div> 
            </div>
        </div>
    )
}

