import { useQuery } from "@tanstack/react-query";

export const useQueryOpenAQData = (indicator: string) => {
  return useQuery({
    queryKey: ["openAQData", indicator],
    queryFn: fetchOpenAQData,
  });
};

const fetchOpenAQData = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {

};
