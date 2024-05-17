import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const tabs = [
    {
      label: "Home",
      description: "Home of books",
      link: "",
    },
    {
      label: "Books",
      description: "Input books dashboard",
      link: "input-books",
    },
    {
      label: "Students",
      description: "Input students dashboard",
      link: "input-students",
    },
    {
      label: "Bookshelf",
      description: "Input bookshelf dashboard",
      link: "input-bookshelf",
    },
  ];

  return (
    <nav className="relative">
      <div>
      <div className="h-16 flex items-center justify-between">
        <h1
          onClick={() => {
            navigate(`/`);
          }}
          className="text-xl font-bold cursor-pointer"
        >
          ALX LIBRARY
        </h1>
        <div
          onClick={() => {}}
          className="md:hidden bg-[#dfdfdf] rounded-xl py-1 px-3 hover:bg-gray-300 transition-all cursor-pointer"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJUlEQVR4nGNgGAUjCvynMqa/BaNg4MH/0VQ0CigGo6loFAxSAADz7neJCOmgHgAAAABJRU5ErkJggg=="
            alt="Hamburger Menu"
          />
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-5">
            {tabs.map((data, i) => {
              return (
                <li
                  onClick={() => {
                    navigate(`/${data.link}`);
                  }}
                  key={i}
                >
                  <h1 className="text-sm font-semibold cursor-pointer">
                    {data.label}
                  </h1>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
