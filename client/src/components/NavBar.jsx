import React from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

const NavBar = () => {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname == "/";

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 max-h-[4rem] justify-between">
          {/*logo*/}
          <div className="flex-1 lg:flex-none">
            <Link className="hover:opacity-80 transition-opacity" to="/"> 
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="size9 text-primary" />
                <span className="text-2xl bg-transparent font-semibold text-transparent tracking-widest bg-clip-text font-mono bg-gradient-to-r from-primary to-secondary">
                  C STORE
                </span>
              </div>
            </Link>
          </div>
          {/*Right section */}
          <div className="flex items-center gap-4">
            <ThemeSelector />
            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full bg-base-200 transition-colors">
                  <ShoppingBagIcon className="size-5" />
                  <span className="indicator-item badge rounded-full badge-sm badge-primary">
                    8
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
