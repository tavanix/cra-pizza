import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [sortType, setSortType] = React.useState({
        name: 'популярности (DESC)',
        sortOption: 'rating',
        sortOrder: 'desc',
    })

    const category = categoryId === 0 ? '' : `category=${categoryId}`

    React.useEffect(() => {
        setIsLoading(true)
        fetch(
            `https://62d45328cd960e45d456a05c.mockapi.io/items?${category}&sortBy=${sortType.sortOption}&order=${sortType.sortOrder}`
        )
            .then((response) => response.json())
            .then((data) => {
                setItems(data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [category, sortType])

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => setCategoryId(id)}
                />
                <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isLoading
                    ? [...new Array(6)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((pizza) => (
                          <PizzaBlock key={pizza.id} {...pizza} />
                      ))}
            </div>
        </div>
    )
}

export default Home
