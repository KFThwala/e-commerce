import React from 'react'

function PageHeader({children}: {children: React.ReactNode}) {
    return (
        <h1 className='text-4xl mb-4 font-bold'>{children}</h1>
    )
}

export default PageHeader