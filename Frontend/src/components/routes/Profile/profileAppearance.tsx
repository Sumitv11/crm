"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

// Fonts
const fonts = [
  { name: "Manrope", class: "font-manrope", css: "Manrope, sans-serif" },
  { name: "Inter", class: "font-inter", css: "Inter, sans-serif" },
  { name: "Poppins", class: "font-poppins", css: "Poppins, sans-serif" },
  { name: "Roboto", class: "font-roboto", css: "Roboto, sans-serif" },
  { name: "Raleway", class: "font-raleway", css: "Raleway, sans-serif" },
];

// Color Themes
const colorThemes = [
  { name: "Blue", color: "#3b82f6", value: "theme-blue" },
  { name: "Green", color: "#10b981", value: "theme-green" },
  { name: "Purple", color: "#8b5cf6", value: "theme-purple" },
  { name: "Red", color: "#ef4444", value: "theme-red" },
];

const ProfileAppearance = () => {
  const { theme, setTheme } = useTheme();
  const [selectedFont, setSelectedFont] = useState("font-manrope");
  const [selectedColorTheme, setSelectedColorTheme] = useState("theme-blue");

  useEffect(() => {
    const savedFont = localStorage.getItem("font-class") || "font-manrope";
    const savedColor = localStorage.getItem("color-theme") || "theme-blue";

    applyFont(savedFont);
    applyColorTheme(savedColor);
  }, []);

  const applyFont = (fontClass: string) => {
    fonts.forEach((f) => {
      document.documentElement.classList.remove(f.class);
    });
    document.documentElement.classList.add(fontClass);
    localStorage.setItem("font-class", fontClass);
    setSelectedFont(fontClass);
  };

  const applyColorTheme = (themeClass: string) => {
    colorThemes.forEach((c) => {
      document.documentElement.classList.remove(c.value);
    });
    document.documentElement.classList.add(themeClass);
    localStorage.setItem("color-theme", themeClass);
    setSelectedColorTheme(themeClass);
  };

  const handleThemeSelect = (mode: "light" | "dark") => {
    setTheme(mode);
    localStorage.setItem("theme-mode", mode);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-1">Appearance</h2>
      <p className="text-muted-foreground mb-6">
        Customize the appearance of the app. Automatically switch between day
        and night themes.
      </p>

      <hr className="border-border mb-6" />

      <div className="space-y-8">
        {/* Font Section */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Font</h3>
          <p className="text-muted-foreground mb-3">
            Set the font you want to use in the dashboard.
          </p>
          <Select value={selectedFont} onValueChange={applyFont}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem
                  key={font.class}
                  value={font.class}
                  style={{ fontFamily: font.css }}
                >
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Theme Section */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Theme</h3>
          <p className="text-muted-foreground mb-3">
            Select the theme for the dashboard.
          </p>
          <div className="flex items-center gap-6">
            {/* Light */}
            <div
              onClick={() => handleThemeSelect("light")}
              className={`border-2 p-2 rounded-lg cursor-pointer transition-all ${
                theme === "light" ? "border-foreground" : "border-border"
              }`}
            >
              <div className="w-32 h-20 bg-white rounded-md p-2 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <p className="text-sm mt-2 text-center">Light</p>
            </div>

            {/* Dark */}
            <div
              onClick={() => handleThemeSelect("dark")}
              className={`border-2 p-2 rounded-lg cursor-pointer transition-all ${
                theme === "dark" ? "border-foreground" : "border-border"
              }`}
            >
              <div className="w-32 h-20 bg-[#0f172a] rounded-md p-2 space-y-2">
                <div className="h-3 bg-slate-500 rounded w-3/4"></div>
                <div className="h-3 bg-slate-500 rounded w-full"></div>
                <div className="h-3 bg-slate-500 rounded w-5/6"></div>
              </div>
              <p className="text-sm mt-2 text-center">Dark</p>
            </div>
          </div>
        </div>

        {/* Color Theme Section */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Color Theme
          </h3>
          <p className="text-muted-foreground mb-3">
            Choose the primary accent color for the dashboard.
          </p>
          <div className="flex gap-4 flex-wrap">
            {colorThemes.map((theme) => (
              <div
                key={theme.value}
                onClick={() => applyColorTheme(theme.value)}
                className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all ${
                  selectedColorTheme === theme.value
                    ? "border-foreground scale-110"
                    : "border-border"
                }`}
                style={{ backgroundColor: theme.color }}
              />
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button className="mt-4 px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:opacity-90 transition-all">
          Update preferences
        </button>
      </div>
    </div>
  );
};

export default ProfileAppearance;
