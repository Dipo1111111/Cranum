import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { animateGlow?: boolean }
>(({ className, value, animateGlow, ...props }, ref) => {
  const { currentTheme } = useTheme();

  let glowClass = "";
  if (animateGlow) {
    switch (currentTheme) {
      case 'miles': glowClass = 'venom-strike'; break;
      case 'isagi': glowClass = 'scan-active'; break;
      case 'jinwoo': glowClass = 'level-flash'; break;
      case 'akaza': glowClass = 'akaza-strike'; break;
      case 'zoro': glowClass = 'zoro-cut'; break;
      case 'sukuna': glowClass = 'sukuna-domain'; break;
      case 'ronaldo-united': glowClass = 'united-flare'; break;
      case 'ronaldo-portugal': glowClass = 'level-flash'; break;
      case 'messi-argentina': glowClass = 'level-flash'; break;
      default: glowClass = 'pulse-glow'; break;
    }
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-xp-track
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-xp-track", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-xp-fill
        className={cn("h-full w-full flex-1 bg-xp-fill transition-all", glowClass)}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          boxShadow: "var(--color-xp-bar-glow) 0px 0px 12px",
        }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
