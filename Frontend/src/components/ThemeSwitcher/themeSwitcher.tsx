import React, { useEffect, useState } from "react";

const colorThemes = [
  { name: "Pink", class: "theme-pink", color: "#d946ef" },
  { name: "Blue", class: "theme-blue", color: "#3b82f6" },
  { name: "Green", class: "theme-green", color: "#22c55e" },
  { name: "Purple", class: "theme-purple", color: "#8b5cf6" },
  { name: "Orange", class: "theme-orange", color: "#f97316" },
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("");

  const applyTheme = (theme: string) => {
    colorThemes.forEach((t) => {
      document.documentElement.classList.remove(t.class);
    });
    document.documentElement.classList.add(theme);
    setCurrentTheme(theme);
    localStorage.setItem("color-theme", theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme") || "theme-purple";
    applyTheme(savedTheme);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Change Color Theme:</h2>
      <div className="flex gap-4">
        {colorThemes.map((t) => (
          <button
            key={t.class}
            onClick={() => applyTheme(t.class)}
            style={{ backgroundColor: t.color }}
            className={`w-10 h-10 rounded-full border-4 ${
              currentTheme === t.class
                ? "border-gray-800 dark:border-white"
                : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
