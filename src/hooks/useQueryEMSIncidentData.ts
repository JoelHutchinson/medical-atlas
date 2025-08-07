import { useQuery } from "@tanstack/react-query";

const EMS_DATA_URL = "https://data.cityofnewyork.us/resource/76xm-jjuj.json";

// Air pollution related EMS call types with labels
const AIR_POLLUTION_CALL_TYPES: { code: string; label: string }[] = [
  { code: "ASTHFC", label: "Asthma attack - fever & cough" },
  { code: "ASTHFT", label: "Asthma patient fever/travel" },
  { code: "ASTHMA", label: "Asthma A" },
  { code: "ASTHMB", label: "Asthma attack" },
  { code: "ASTHMC", label: "Asthma critical" },
  { code: "ASTHMP", label: "Asthma attack – peds <15 yrs old" },
  { code: "DIFFBR", label: "Difficult breather" },
  { code: "DIFFBC", label: "Difficult breather (critical)" },
  { code: "DIFFFC", label: "Difficult breathing - fever & cough" },
  { code: "DIFFFT", label: "Difficult breathing fever/travel" },
  { code: "RESPIR", label: "Respiratory distress" },
  { code: "RESPFC", label: "Respiratory distress - fever & cough" },
  { code: "RESPFT", label: "Respiratory distress fever/travel" },
  { code: "SOB", label: "Shortness of breath" },
  { code: "SOBC", label: "SOB (critical)" },
];

export const useQueryEMSIncidentData = (indicator: string) => {
  return useQuery({
    queryKey: ["emsIncident", indicator],
    queryFn: fetchEMSIncidentData,
  });
};

const fetchEMSIncidentData = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_key, indicator] = queryKey;

  if (indicator.toLowerCase() !== "air_pollution") {
    throw new Error("Unsupported indicator: " + indicator);
  }

  const callTypeCodes = AIR_POLLUTION_CALL_TYPES.map(
    ({ code }) => `'${code}'`
  ).join(",");
  const whereClause = `initial_call_type IN (${callTypeCodes}) AND incident_datetime > '2025-08-01T00:00:00'`;

  const params = new URLSearchParams({
    $where: whereClause,
    $limit: "500",
    $order: "incident_datetime DESC",
  });

  const res = await fetch(`${EMS_DATA_URL}?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch EMS incident data");
  }

  return res.json();
};
