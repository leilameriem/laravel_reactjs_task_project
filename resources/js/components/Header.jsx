import React from 'react'
import {Link,useLocation} from 'react-router-dom'

export default function Header(){
const location = useLocation();
return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<Link className="navbar-brand" to="#">Laravel React Crud app</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarNav">
<ul className="navbar-nav">
  <li className="nav-item active">
    <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
    to="/">
    Home <i className="fas fa-home"></i><span className="sr-only">(current)</span>
    </Link>
  </li>
  <li className="nav-item">
    <Link className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`} to="/create">Create Task <i className="fas fa-edit"></i></Link>
  </li>

</ul>
</div>
</nav>
	)
}