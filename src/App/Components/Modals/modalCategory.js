import React, { useEffect, useState } from 'react'
import { getItemLS, setItemLS } from '../../Controller/localStorEvents'
import CategoryItem from '../CategoryItem/categoryItem'
import './modals.scss'
import { createNewArray } from '../../Controller/helpers'

function ModalCategory(props) {
    const [categories, setCategories] = useState([]),
          [newCategory, setNewCategory] = useState(''),
          [errorAddNewCategory, setErrorAddNewCategory] = useState(false)

    const getCategories = () => {
        let categories = getItemLS('categories')
        if (!!categories) {
            return categories
        } else {
            return []
        }
    }
    
    const setCategory = categoryArr => {
        setItemLS('categories', categoryArr)
    }
    const editCategory = index => {
        let newCategories = createNewArray(categories),
            edittedCat    = newCategories.splice(index, 1)[0]

        if (newCategory.length === 0) {
            setCategories(newCategories)
            setNewCategory(edittedCat.name)
        }
    }
    const deleteCategory = index => {
        let newCategories = createNewArray(categories)
            newCategories.splice(index, 1);

        setCategory(newCategories)
        setCategories(newCategories)
    }
    const addNewCategory = (e) => {
        if (newCategory.length) {
            let newCategories = createNewArray(categories)
            newCategories.push({name: newCategory})
            setCategory(newCategories)
            setCategories(newCategories)
            setNewCategory('')
        }else{
            setErrorAddNewCategory(true)
        }
    }
    useEffect(() => {
        setCategories(getCategories())
    }, [])
    
    return (
        <div id='modalCategory' 
             className={props.modalCategory ? 'modalCategory modal__show' : 'modalCategory modal__hide'}  
             onClick={(e) => e.target.id === 'modalCategory' ? props.setModalCategory(false) : null}
        >
            <div className='modalCategory__content'>
                <h3>Categories</h3>
                <hr />
                <div className='modalCategory__content_add'>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <input  className={ errorAddNewCategory ? 'modalCategory__content_addInput error' : 'modalCategory__content_addInput' }
                                value={newCategory} 
                                onChange={(e) => {
                                    setNewCategory(e.target.value);
                                    if (errorAddNewCategory) {
                                        setErrorAddNewCategory(false)   
                                    }
                                }}
                                name='addCategory'
                        />
                        
                    </div>
                    <div>
                        <input  className='modalCategory__content_addButton'
                                type='button'
                                value='add category'
                                onClick={ addNewCategory}
                        />
                    </div>
                </div>
                {
                    errorAddNewCategory &&
                        <div for='addCategory' >Заполните все поля</div>
                }
                <hr />
                {
                        categories.map((category, key) => (
                            <CategoryItem category={category} key={key} index={key} editCategory={editCategory} deleteCategory={deleteCategory} />
                        ))
                }
            </div>
        </div>
    )
}

export default ModalCategory
