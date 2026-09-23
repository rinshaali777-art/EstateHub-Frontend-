import React from "react";

function Pagination({ totalProperties, propertiesPerPage,setCurrentPage,currentPage}) {

  let pages = [];

  for ( let i = 1;i <= Math.ceil(totalProperties / propertiesPerPage);i++) {
    pages.push(i);
  }

  return (
    <div id="parent"
      className="d-flex justify-content-center align-items-center mt-4" >

      <button onClick={() => setCurrentPage(currentPage - 1)} className="btn mx-2 border shadow rounded px-3 py-2"
        disabled={currentPage === 1}>
        <i className="fa-solid fa-backward"></i>
      </button>


      
      {
        pages.map((page) => (
        <button key={page} onClick={() => setCurrentPage(page)}
          className={`btn mx-2 border shadow rounded px-3 py-2 ${ page === currentPage
              ? "btn-primary"
              : "btn-light"
          }`} >{page}
        </button>

      ))}


    
      <button onClick={() => setCurrentPage(currentPage + 1)}
        className="btn mx-2 border shadow rounded px-3 py-2"
        disabled={currentPage === pages.length} >
        <i className="fa-solid fa-forward"></i>
      </button>

    </div>
  );
}

export default Pagination;