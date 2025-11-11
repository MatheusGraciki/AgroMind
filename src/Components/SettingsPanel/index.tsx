import { useEffect } from "react";
import { X } from "lucide-react";
import ThemeSwitch from "Components/ThemeSwitch";
import "./styles.scss";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <div className={`settings-panel ${isOpen ? "open" : ""}`}>
      <div className="settings-panel__header">
        <h2>Settings</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close settings">
          <X size={20} />
        </button>
      </div>

      <div className="settings-panel__content">
        <div className="setting-item">
          <span>Theme</span>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}
