import { Link } from "react-router-dom";
import css from "./Header.module.css";
import clsx from "clsx";

export const Header = () => {
  return (
    <header className={css.header}>
      <Link className={clsx(css.link, css.linkOne)} to="/spools">
        In Stock
      </Link>
      <Link className={clsx(css.link, css.linkTwo)} to="/">
        Main
      </Link>
      <Link className={clsx(css.link, css.linkThree)} to="/orders">
        Orders
      </Link>
    </header>
  );
};
