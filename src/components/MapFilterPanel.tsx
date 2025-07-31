import { Card } from "./ui/card";
import { SelectScrollable } from "./ui/select-scrollable";

export function MapFilterPanel() {
  return (
    <Card className="p-4">
      {/* Select WHO Indicator */}
      <SelectScrollable />
    </Card>
  );
}
