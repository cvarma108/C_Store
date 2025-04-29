import { PaletteIcon } from "lucide-react";
import React from "react";
import { Themes } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSelector = () => {
  // const Theme = "forest";

  const { theme, setTheme } = useThemeStore();
  console.log(theme, "--theme");
  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-6" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 w-56 bg-base-200 backdrop-blur-lg rounded-2xl border border-base-content/10 "
      >
        {Themes.map((themeOption) => (
          <button
            key={themeOption.name}
            onClick={()=>setTheme(themeOption.name)}
            className={`flex items-center gap-3 px-3 py-4 w-full rounded-xl transition-colors ${
              themeOption.name == theme
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-content/5"
            }`}
          >
            <PaletteIcon className="size-4" />
            <span className="text-sm font-medium">{themeOption.label}</span>
            {/*Theme preview colors */}
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span
                  key={i}
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
