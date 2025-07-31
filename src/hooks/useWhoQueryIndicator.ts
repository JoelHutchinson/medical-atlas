import { useQuery } from "@tanstack/react-query";

export const useQueryWhoIndicator = (indicator: string) => {
  return useQuery({
    queryKey: ["whoIndicator", indicator],
    queryFn: fetchWhoIndicator,
  });
};

const fetchWhoIndicator = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, indicator] = queryKey;
  // FIXME: Remove corsproxy for production
  const response = await fetch(
    `https://corsproxy.io/?https://ghoapi.azureedge.net/api/${indicator}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching WHO indicator: ${response.statusText}`);
  }

  const data = await response.json();

  console.log(data);

  return data.value.reduce(
    (
      acc: Record<string, number>,
      item: { SpatialDim: string; NumericValue: number }
    ) => {
      acc[item.SpatialDim] = item.NumericValue;
      return acc;
    },
    {}
  );
};
