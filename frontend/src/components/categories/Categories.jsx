import React from 'react'
import "./categories.css"
const Categories = () => {
  return (
    <>
    <div className="Bhulgaya">
        <h1>Categories</h1>
    <div className="categoriesbody">
        <img className='imgForpointer' src="./pointing.png" alt="pointing"  />
        <div className="categoriesbox">
            <div className="containerForEachCategorie">
                <img  className='imgofcategories' src="./house.png" alt=""  />
                <p>Home & Garden</p>
            </div>
            <div className="containerForEachCategorie">
                <img className='imgofcategories' src="./device.png" alt=""  />  
                <p>electronics</p>
            </div>
            <div className="containerForEachCategorie">
                <img className='imgofcategories' src="./book.png" alt=""  />
                <p>Books</p>
            </div>
            <div className="containerForEachCategorie">
                <img className='imgofcategories' src="./brand.png" alt=""  />
                <p>Clothing</p>
            </div>
            <div className="containerForEachCategorie">
                <img  className='imgofcategories' src="./application.png" alt=""  />
                <p>Others</p>
            </div>
        </div>
    </div></div>
    </>
  )
}

export default Categories