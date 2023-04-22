import BrandBannerInfo from '@components/brand/BrandBannerInfo'
import './BrandPage.css'
import Topics from '@components/brand/Topics'
export default function BrandPage() {
    return (
        <div className='page-container'>
            <BrandBannerInfo />
            <Topics/>
        </div>
    )
}

