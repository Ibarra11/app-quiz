import * as Switch from "@radix-ui/react-switch";
export default function ToggleTheme() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-6 w-6 bg-sun-dark bg-cover"></span>
      <Switch.Root
        title="Toggles light & dark"
        aria-label="auto"
        aria-live="polite"
        className=" w-12 h-7 bg-blackA6 rounded-full relative bg-purple"
      >
        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full  transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-[24px]" />
      </Switch.Root>
      <span className="h-6 w-6 bg-moon-dark bg-cover"></span>
    </div>
  );
}
