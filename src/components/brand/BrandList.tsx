import BrandResponse from '@models/brand/BrandResponse'
import React from 'react'
import BrandComponent from './BrandComponent'
import '../home/HomeComponents.css';
import './BrandComponents.css';

export default function BrandList() {
    const brandResponses: BrandResponse[] = [
        {
            id: 1,
            name: 'Brand 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            id: 2,
            name: 'Brand 2',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            id: 3,
            name: 'Brand 3',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            id: 4,
            name: 'Brand 4',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            id: 5,
            name: 'Brand 5',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            id: 6,
            name: 'Brand 6',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            id: 7,
            name: 'Brand 7',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            id: 8,
            name: 'Brand 8',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
    ]
    const [brands, setBrands] = React.useState<BrandResponse[]>([])
    React.useEffect(() => {
        getBrands()
    }, [])
    const getBrands = async () => {
        // let brands = await BrandAPI.findAll();
        // let splitBrands = brands.slice(0, 6);
        // setBrands(splitBrands);
        setBrands(brandResponses)
    }

    const renderBrands = brands.map((brand) => {
        return (
            <div key={brand.id} className='brand-component-outer-container'>
                <BrandComponent
                    key={brand.id}
                    brand={brand}
                    imageUrl={'src/assets/images/versace_logo.png'} />
            </div>
        )})
        return (
            <div className='brand-list-container'>
                {renderBrands}
            </div>
        )
    }

