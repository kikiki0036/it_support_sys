import React from 'react'
import { any } from 'prop-types'

const Example = ({children}) => {
  return (
    <div className='example'>
      <div className='example_preview'>
        {children}
      </div>
    </div>
  )
}
Example.propTypes = {
  // code: string,
  children: any
}
export default Example

