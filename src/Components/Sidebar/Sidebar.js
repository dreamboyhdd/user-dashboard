import React from 'react'
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        
        <Link to="/" className="brand-link text-center">
          <span className="brand-text font-weight-light">DEMO APP</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-header">SYSTEM</li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-user" />
                  <p>
                    User Managerment
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/user-list" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>List User</p>
                      </Link>
                    </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>

  )
}

