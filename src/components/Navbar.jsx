import './Navbar.css'
const Navbar = () => (
  <nav className="navbar" aria-label="Main navigation">
    <a className="nav-logo" href="#top">WAYNE <span>TACTICAL OS</span></a>
    <div className="nav-links"><a href="#mission">Mission</a><a href="#gotham">Gotham</a><a href="#bruce">Batcave</a><a href="#rogues">Rogues</a><a href="#signal">Signal</a></div>
    <a className="nav-mobile" href="#mission" aria-label="Jump to mission">PROTOCOL ↓</a>
  </nav>
)
export default Navbar
