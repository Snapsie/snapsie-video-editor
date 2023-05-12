import { BiImages, BiVideo, BiText } from 'react-icons/bi';
import NavBarItem from './NavBarItem';

function NavBar() {
  return (
    <div className="flex flex-col h-full divide-y">
      <NavBarItem Icon={<BiImages size={32} />} Text="Images" />
      <NavBarItem Icon={<BiVideo size={32} />} Text="Videos" />
      <NavBarItem Icon={<BiText size={32} />} Text="Text" divideLast />
    </div>
  );
}

export default NavBar;
