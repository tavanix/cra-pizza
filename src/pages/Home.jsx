import React from 'react'
import axios from 'axios'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.filter.categoryId)
    const sortType = useSelector((state) => state.filter.sort)

    const [items, setItems] = React.useState([])
    const { searchValue } = React.useContext(SearchContext)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [isLoading, setIsLoading] = React.useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const category = categoryId === 0 ? '' : `category=${categoryId}`
    const search = searchValue ? `&search=${searchValue}` : ''

    React.useEffect(() => {
        setIsLoading(true)

        axios
            .get(
                `https://62d45328cd960e45d456a05c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortOption}&order=${sortType.sortOrder}${search}`
            )
            .then((response) => {
                setItems(response.data)
                setIsLoading(false)
            })

        window.scrollTo(0, 0)
    }, [category, sortType, searchValue, currentPage])

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))

    const pizzas = items.map((pizza) => (
        <PizzaBlock key={pizza.id} {...pizza} />
    ))

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    value={categoryId}
                    onClickCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home
