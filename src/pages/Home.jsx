import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'

import { SearchContext } from '../App'

import { useSelector, useDispatch } from 'react-redux'
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const { categoryId, currentPage } = useSelector((state) => state.filter)
    const sortType = useSelector((state) => state.filter.sort)
    const { items, status } = useSelector((state) => state.pizza)

    const { searchValue } = React.useContext(SearchContext)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {
        dispatch(
            fetchPizzas({
                currentPage,
                category,
                sortType,
            })
        )

        window.scrollTo(0, 0)
    }

    // if params changed and there've been first render
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortType: sortType.sortOption,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, searchValue, currentPage])

    // if there've been first render -> check url-params and save to redux
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(
                (obj) => obj.sortOption === params.sortType
            )
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            isSearch.current = true
        }
    }, [])

    // if there've been first render then fetch data
    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage])

    const category = categoryId === 0 ? '' : `category=${categoryId}`
    const search = searchValue ? `&search=${searchValue}` : ''

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
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>Произошла ошибка</h2>
                    <p>
                        К сожалению, не удалось получить пиццы... Попробуйте
                        повторить попытку позже.
                    </p>
                </div>
            ) : (
                <div className='content__items'>
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home
