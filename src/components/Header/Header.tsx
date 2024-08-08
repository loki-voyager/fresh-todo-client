import { NavData } from "../../data/Nav";
import { Navigation } from "./Navigation";

const Header = () => {
  return (
    NavData && (
      <header>
        <Navigation NavData={NavData} />
      </header>
    )
  );
};

export { Header };
