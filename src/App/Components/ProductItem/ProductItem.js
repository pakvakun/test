import React, { useState } from 'react'
import './ProductItem.scss'

function ProductItem(props) {
    const {name, price, date, category} = props.product;
    const [categoryValue, setCategoryValue] = useState('')
    return (
      <>
                <td className='ProductItem__row_item'>
                    <div>{name}</div>
                </td>
                <td className='ProductItem__row_item'>
                    <div>{price}</div>
                </td>
                <td className='ProductItem__row_item'>
                    <div>{date}</div>
                </td>
                <td className='ProductItem__row_item'>
                    <div>{
                        category
                            ?   category
                            :    <select value={categoryValue} onChange={(e) => {
                                    setCategoryValue(e.target.value)
                                    props.addCategory(props.index, e.target.value)
                                }}>
                                    <option value=''>add category</option>
                                    {
                                        props.addCategory().map((item, key) => (
                                            <option key={key} value={item.name}>{item.name}</option>
                                        ))
                                    }
                                </select>
                    }</div>
                </td>
                <td className='ProductItem__row_buttonBlock'>
                    <input type='button' value='edit' onClick={() => props.editProduct(props.index, props.product)} />
                    <input type='button' value='delete' onClick={() => props.deleteProduct(props.index)} />
                </td>
                </>
    )
}

export default ProductItem
