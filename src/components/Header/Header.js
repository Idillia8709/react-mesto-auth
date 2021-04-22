import logo from '../../images/logo.svg';

export default function Header(props) {
  return (
    <header className="header header_position">
      <img 
      className="logo logo_position" 
      src={logo} 
      alt={logo} />
    </header>
  )
}