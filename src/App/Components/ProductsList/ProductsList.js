import React, { useEffect, useState } from 'react'

import './ProductsList.scss'
import { getItemLS, setItemLS } from '../../Controller/localStorEvents'
import ProductItem from '../ProductItem/ProductItem'
import ModalCreateProduct from '../Modals/modalCreateProduct';
import ModalCategory from '../Modals/modalCategory';
import { createNewArray } from '../../Controller/helpers';

function ProductsList() {
    const   [products, setProducts] = useState([]),
            [categories, setCategories] = useState([]),
            [edittedProduct, setEdittedProduct] = useState(false),
            [modal, setModal] = useState(false),
            [modalCategory, setModalCategory] = useState(false);
         

    const getProducts = () => {
        return getItemLS('productsList')
    }
    const getCategories = () => {
        return getItemLS('categories')
    }
    const addProductItem = () => {
        setModal(true)
    }
    const isCategory = category => {
        let categories = getCategories()
        let compareArr = categories.filter(item => {
            return item.name === category
        }) 
        
       return !!compareArr.length
    }
    
    const deleteProduct = (index) => {
        let newProducts = createNewArray(products);
        newProducts.splice(index, 1)
        setProducts(newProducts)
        setItemLS('productsList', newProducts)
    }
    const editProduct = (index, product, newCategory) => {
        if (!newCategory) {
            setEdittedProduct({index, product, newCategory})
            setModal(true)
        }else{

        }
    }
    const addCategory = ( index, category ) => {
        console.log(index, {category});
        
        if (!category) {
            return categories
        }else{
            let newProducts = createNewArray(products)
            newProducts[index].category = category;
            setItemLS('productsList', newProducts)
            setProducts(newProducts)
        }
    }
    const resetEditProduct = () => {
        setEdittedProduct(false)
    }
    const renderProductList = () => {
        return (
            <table className='ProductItem'>
                <thead>
                    <tr className='ProductItem__row'>
                        <th className='ProductItem__row_item'>name</th>
                        <th className='ProductItem__row_item'>price</th>
                        <th className='ProductItem__row_item'>date</th>
                        <th className='ProductItem__row_item'>category</th>
                        <th className='ProductItem__row_buttonBlock'>edit/del</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) =>{
                            if (!isCategory(product.category)) {
                                delete product.category
                            }
                            return(
                                <tr className='ProductItem__row' key={index}>
                                    <ProductItem product={product}  index={index} deleteProduct={deleteProduct} editProduct={editProduct} addCategory={addCategory} />
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            
        )
    }
    useEffect(() => {
        setProducts(getProducts())
        setCategories(getCategories())
    }, [modal])
    
    return (
        <div className='productList'>
            {
                !!products &&
                products.length 
                    ?   renderProductList()
                    :   <div>Products list is empty</div>
            }
            <input type='button' value='add product' onClick={addProductItem} className='productList__button_add' />
            {/* MODAL */}
            <ModalCreateProduct modal={modal} setModal={setModal} setModalCategory={setModalCategory} modalCategory={modalCategory} edittedProduct={edittedProduct} resetEditProduct={resetEditProduct}/>
            <ModalCategory modalCategory={modalCategory} setModalCategory={setModalCategory} />
        </div>
    )
}

export default ProductsList
