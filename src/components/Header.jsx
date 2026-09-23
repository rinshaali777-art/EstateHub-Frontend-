import React from "react";
import {FaBuilding,FaSearch, FaBell,FaUserCircle} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import logo from '../assets/logo.png'

function Header({ search, setSearch }) {


  return (
    <nav
      className="navbar bg-white border-bottom shadow-sm"
      style={{padding: "15px 25px" }} >
      <div className="container-fluid"
        style={{display: "flex",alignItems: "center", justifyContent: "space-between",  gap: "20px",  flexWrap: "wrap" }} >

        {/* Logo */}
        <div className="d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="EstateHub"
            style={{
              width: "55px",
              height: "55px",
              objectFit: "contain"
            }}
          />

          <div>
            <h4
              className="mb-0 mt-2 fw-bold"
              style={{ color: "#1465e8" }}
            >
              Estate<span style={{ color: "#12345b" }}>Hub</span>
            </h4>

            <small className="text-muted">
              Find Your Perfect Place
            </small>
          </div>
        </div>


        {/* Search */}
        <div  style={{flex: "1",  maxWidth: "500px", minWidth: "250px" }}>
          <div className="input-group"
            style={{ borderRadius: "8px",overflow: "hidden" }}>
            <span className="input-group-text"
              style={{
                backgroundColor: "#f8f9fa", border: "1px solid #dee2e6", borderRight: "none" }} >
              <FaSearch style={{ color: "#6c757d" }}/>
            </span>

            <input type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              placeholder="Search properties..."
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderLeft: "none",
                boxShadow: "none" }} />
          </div>
        </div>


        {/* Right Side */}
        <div style={{
            display: "flex", alignItems: "center", gap: "25px" }} >

          {/* Notification */}
          {/* <button
            className="btn"
            style={{
              position: "relative",
              padding: "5px",
              border: "none",
              background: "transparent" }} >
            <FaBell style={{
                fontSize: "21px",
                color: "#6c757d" }}/>

            <span
              style={{
                position: "absolute",
                top: "-2px",
                right: "-5px",
                backgroundColor: "#dc3545",
                color: "white",
                borderRadius: "50%",
                fontSize: "9px",
                minWidth: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600"
              }}
            >
              3
            </span>
          </button> */}


          {/* Admin Dropdown */}
          <div className="dropdown">
            <button
              
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                background: "transparent",
                fontWeight: "600",
                color: "#212529"
              }}
            >
              <FaUserCircle
                style={{
                  fontSize: "25px",
                  color: "#0d6efd"
                }}
              />

              <span>Admin</span>

              {/* <IoIosArrowDown
                style={{
                  fontSize: "15px"
                }}
              /> */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;