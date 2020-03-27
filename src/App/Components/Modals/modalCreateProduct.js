import React, { useState, useEffect } from 'react'
import './modals.scss'
import { getItemLS, setItemLS } from '../../Controller/localStorEvents';
import moment from 'moment';
function ModalCreateProduct(props) {
    const   [modalProductName, setModalProductName] = useState(''),
            [modalProductPrice, setModalProductPrice] = useState(''),
            [modalProductDate, setModalProductDate] = useState(moment().format('YYYY-MM-DD')),
            [modalProductCategory, setModalProductCategory] = useState(''),
            [modalProductCategoriesOpt, setModalProductCategoriesOpt] = useState([]);

    const createProduct = (e) => {
        e.preventDefault();
        let product = {
            name: modalProductName,
            price: modalProductPrice,
            date: modalProductDate,
            category: modalProductCategory
        }
        let productsList = getItemLS('productsList');
        if (!productsList) {
            productsList = []
        }
        if (props.edittedProduct) {
            productsList.splice(props.edittedProduct.index, 1, product)
        }else{
            productsList.push(product);
        }
        props.resetEditProduct()
        setItemLS('productsList', productsList)
        props.setModal(false)
    }
    const getCategories = () => {
        return getItemLS('categories')
    }
    const closeModal = e => {
        if (e.target.id === 'modal') {
            setModalProductCategoriesOpt(getCategories())
            resetForm()
            props.resetEditProduct()
            props.setModal(false)
        }
    }
    const resetForm = () => {
        setModalProductName('')
        setModalProductPrice('')
        setModalProductDate(moment().format('YYYY-MM-DD'))
        setModalProductCategory('')
    }
    useEffect(() => {
            if (props.edittedProduct) {
                setModalProductName(props.edittedProduct.product.name)
                setModalProductPrice(props.edittedProduct.product.price)
                setModalProductDate(props.edittedProduct.product.date)
                setModalProductCategory(props.edittedProduct.product.category)
                
            }
            setModalProductCategoriesOpt(getCategories())
    }, [props.modalCategory, props.edittedProduct])
    
    return (
        <div id='modal' className={props.modal ? 'modal modal__show' : 'modal modal__hide'}  onClick={closeModal}>
            <div className='modal__content'>
                <form onSubmit={createProduct}>
                    <div className='modal__content_field'>
                        <label htmlFor='productName'>name</label>
                        <input required id='productName' placeholder='name' type='text' value={modalProductName} onChange={e => setModalProductName(e.target.value)} />
                    </div>
                    <div className='modal__content_field'>
                        <label htmlFor='productPrice'>price</label>
                        <input required id='productPrice' placeholder='price' type='number' min={1} value={modalProductPrice} onChange={e => setModalProductPrice(e.target.value)}  />
                    </div>
                    <div className='modal__content_field'>
                        <label htmlFor='productDate'>date</label>
                        <input required id='productDate' type='date' min={modalProductDate} value={modalProductDate} onChange={e => setModalProductDate(e.target.value)} />
                    </div>
                    <div className='modal__content_field'>
                        <div>
                            <label htmlFor='productCategory'>category</label>
                            <input required type='button' className='buttonEdit' value='edit category' onClick={() => props.setModalCategory(true)}/>
                        </div>
                        <select required id='productCategory' type='text' value={modalProductCategory} onChange={e => setModalProductCategory(e.target.value)}>
                            <option value=''>Категория не выбрана</option>
                            {
                                modalProductCategoriesOpt.length &&
                                    modalProductCategoriesOpt.map((cat, index) => (
                                        <option key={index} value={cat.name}>{cat.name}</option>
                                    ))
                            }
                            
                        </select>
                    </div>
                    <div>
                        <input type='submit' value={'create product'} />
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default ModalCreateProduct
