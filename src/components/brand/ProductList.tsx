import ItemResponse from '@models/item/ItemResponse'
import Product from './Product'
import './BrandComponents.css'
import { Typography } from '@mui/material'
export default function ProductList() {
  const products: ItemResponse[] = [
    {
      id: 1,
      userId: 1,
      name: "Product 1",
      image: "src/assets/images/Product_Img.jpeg",
      brandId:
      {
        id: 1,
        name: "Brand 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      userId: 1,
      name: "Product 2",
      image: "src/assets/images/Product_Img.jpeg",
      brandId:
      {
        id: 1,
        name: "Brand 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 3,
      userId: 1,
      name: "Product 3",
      image: "src/assets/images/Product_Img.jpeg",
      brandId:
      {
        id: 1,
        name: "Brand 2",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 4,
      userId: 1,
      name: "Product 4",
      image: "src/assets/images/Product_Img.jpeg",
      brandId:
      {
        id: 1,
        name: "Brand 2",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 5,
      userId: 1,
      name: "Product 5",
      image: "src/assets/images/Product_Img.jpeg",
      brandId:
      {
        id: 1,
        name: "Brand 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ]

  let Products = products.map((product) => {
    return (
      <Product key={product.id} img={product.image} name={product.name} />
    )
  })
  
  return (
    <div className='product-section-container'>
      <div className='product-section-header'>
        <Typography variant='h1'>Products</Typography>
      </div>
      <div className='grid-container'>
        {Products}
      </div>
    </div>
  )
}

