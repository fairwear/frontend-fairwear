import BrandBannerInfo from '@components/brand/BrandBannerInfo'
import './BrandPage.css'
import Topics from '@components/brand/Topics'
import PopularPosts from '@components/brand/PopularPosts'
export default function BrandPage() {
    return (
        <div className='page-container'>
            <BrandBannerInfo />
            <PopularPosts />
            <Topics/>
        </div>
    )
}

