import React from 'react'
import './categoryItem.scss'
function CategoryItem(props) {
    
    return (
        <div className='categoryItem'>
            <div>{props.category.name}</div>
            <div>
                <input type='button' value='edit' onClick={() => props.editCategory(props.index)} />
                <input type='button' value='delete' onClick={() => props.deleteCategory(props.index)} />
            </div>
        </div>
    )
}

export default CategoryItem
