import './Navbar.css'
const Navbar = () => (
  <nav className="navbar" aria-label="Main navigation">
    <a className="nav-logo" href="#top">THE DARK <span>KNIGHT</span></a>
    <div className="nav-links">
      <a href="#gotham">Gotham</a><a href="#bruce">Bruce Wayne</a><a href="#rogues">The Rogues</a><a href="#mission">The Mission</a>
    </div>
    <a className="nav-mobile" href="#mission" aria-label="Jump to mission">MISSION ↓</a>
  </nav>
)
export default Navbar
