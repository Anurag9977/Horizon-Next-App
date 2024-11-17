import MainContainer from "../global/MainContainer";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";

function Navbar() {
  return (
    <nav className="border-b shadow-sm">
      <MainContainer className="grid grid-cols-2 sm:grid-cols-3 justify-between sm:justify-center items-center py-6">
        <Logo />
        <div className="hidden sm:block">
          <NavSearch />
        </div>
        <div className="flex justify-end items-center gap-x-4">
          <DarkMode />
          <LinksDropdown />
        </div>
      </MainContainer>
      <div className="sm:hidden mx-auto flex justify-center pb-6">
        <NavSearch />
      </div>
    </nav>
  );
}
export default Navbar;
