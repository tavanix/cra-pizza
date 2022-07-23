import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={500}
        viewBox='0 0 280 500'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
    >
        <rect x='0' y='269' rx='10' ry='10' width='280' height='22' />
        <rect x='0' y='312' rx='10' ry='10' width='280' height='89' />
        <rect x='56' y='458' rx='0' ry='0' width='4' height='1' />
        <rect x='0' y='425' rx='10' ry='10' width='95' height='34' />
        <rect x='124' y='421' rx='25' ry='25' width='152' height='45' />
        <circle cx='140' cy='125' r='123' />
    </ContentLoader>
)

export default Skeleton
