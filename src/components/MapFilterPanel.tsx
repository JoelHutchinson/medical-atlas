import { useState } from "react";
import { Card } from "./ui/card";
import { SelectScrollable } from "./ui/select-scrollable";

export function MapFilterPanel(props: {
  indicator?: string;
  onIndicatorChange?: (val: string) => void;
}) {
  const [indicator, setIndicator] = useState<string>(props.indicator ?? "");

  const handleIndicatorChange = (val: string) => {
    setIndicator(val);
    props.onIndicatorChange?.(val);
  };

  return (
    <Card className="p-4">
      {/* Select WHO Indicator */}
      <SelectScrollable value={indicator} onValueChange={handleIndicatorChange} />
    </Card>
  );
}
