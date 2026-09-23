import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div style={{height:'60vh',marginTop:'50px'}} className='d-flex align-items-center justify-content-center flex-column'>
      <img src="https://tse4.mm.bing.net/th/id/OIP.4rhE5qUBh2f2L8wpG3tv0AHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" width={300}/>

      <h5>Sorry,we couldn't find the page</h5>
      <Link to={'/'}className='btn btn-dark mt-4'>Back to Home</Link>
    </div>
  )
}

export default Pnf