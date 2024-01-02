import ToggleTheme from "./ToggleTheme";

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="flex items-center">
      {children}
      <div className="ml-auto">
        <ToggleTheme />
      </div>
    </header>
  );
}
