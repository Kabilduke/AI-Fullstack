import React from 'react';

const CategorySelector = ({categories, onSelectCategory}) =>{
    return (
        <div className='category-selector'>
            <h2>Select a category</h2>
            <ul>
                {categories.map((category, index) =>(
                    <li key={index} onClick={() => onSelectCategory(category)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySelector;
