
import SettingsPanel from "Components/SettingsPanel";
import ThemeSwitch from "Components/ThemeSwitch";
import { useState } from "react";

export default function Home() {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <SettingsPanel isOpen={isOpen} onClose={() => {  setIsOpen(prevIsOpen => !isOpen)}} />
  );    
}
