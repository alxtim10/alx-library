import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const tabs = [
    {
      label: "Home",
      description: "Exotic Rent, home of luxury cars",
      link: "home",
    },
    {
      label: "Rent",
      description: "Rent luxury cars with the best quality",
      link: "rent",
    },
    {
      label: "Pricing",
      description: "Subscribe exotic rent membership",
      link: "pricing",
    },
    {
      label: "Login",
      description: "Login to your account ",
      link: "signin",
    },
  ];

  return (
    <nav className="relative">
      <div className="flex items-center justify-between">
        <h1
          onClick={() => {
            navigate(`/`);
          }}
          className="text-2xl font-bold cursor-pointer"
        >
          Exotic Rent
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
                  <h1 className="text-sm font-semibold">{data.label}</h1>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
