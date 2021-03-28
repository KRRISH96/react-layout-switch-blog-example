import * as React from 'react';
import { useState, useContext } from 'react';

interface ComponentWithChildrenProps {
  children: (React.ReactNode & { type: { name: string } })[];
}
interface LayoutSwitchProps extends ComponentWithChildrenProps {
  defaultLayout: string;
}

interface LayoutButtonProps {
  children: React.ReactNode;
  layoutPreference: string;
  title: string;
}

interface LayoutContextState {
  activeLayout: string;
  setActiveLayout: (prevLayout: string) => void;
}

const LayoutContext = React.createContext<LayoutContextState | null>(null);

function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      `LayoutSwitch compound components cannot be rendered outside the LayoutSwitch component`
    );
  }
  return context;
}

function Button({ children, layoutPreference, title }: LayoutButtonProps) {
  const { activeLayout, setActiveLayout } = useLayoutContext();
  return (
    <button
      className={`layout-btn ${
        activeLayout === layoutPreference ? 'active' : ''
      }`}
      onClick={() => setActiveLayout(layoutPreference)}
      title={title}
    >
      {children}
    </button>
  );
}

function Options({ children }: ComponentWithChildrenProps) {
  return (
    <div className="layout-switch-container">
      {children.map(child => {
        if (!React.isValidElement(child)) return null;
        if (child.type.name !== Button.name) {
          throw new Error(
            `${
              child.type.name || child.type
            } cannot be rendered inside LayoutSwitch
            Valid Components are [${Button.name}]`
          );
        }

        return child;
      })}
    </div>
  );
}

function Content({ children }: ComponentWithChildrenProps) {
  const { activeLayout } = useLayoutContext();
  return (
    <React.Fragment>
      {children.map(child => {
        if (!React.isValidElement(child)) return null;
        if (child.props.activeLayout !== activeLayout) return null;

        return child;
      })}
    </React.Fragment>
  );
}

function LayoutSwitch({ children, defaultLayout }: LayoutSwitchProps) {
  const [activeLayout, setActiveLayout] = useState(defaultLayout);
  const value: LayoutContextState = {
    activeLayout,
    setActiveLayout,
  };
  return (
    <LayoutContext.Provider value={value}>
      {children.map(child => {
        if (!React.isValidElement(child)) return null;
        if (![Options.name, Content.name].includes(child.type.name)) {
          throw new Error(
            `${
              child.type.name || child.type
            } cannot be rendered inside LayoutSwitch
            Valid Components are [${Options.name}, ${Content.name}]`
          );
        }

        return child;
      })}
    </LayoutContext.Provider>
  );
}

LayoutSwitch.Button = Button;
LayoutSwitch.Options = Options;
LayoutSwitch.Content = Content;

export default LayoutSwitch;
