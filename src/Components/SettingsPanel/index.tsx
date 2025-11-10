import { X } from "lucide-react";
import "./styles.scss";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function SettingsPanel({ isOpen, onClose, children }: SettingsPanelProps) {
  return (
    <>
      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>

      <aside className={`settings-panel ${isOpen ? "open" : ""}`}>
        <header className="settings-panel__header">
          <h2>Settings</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </header>

        <div className="settings-panel__content">
          {children}
        </div>
      </aside>
    </>
  );
}
