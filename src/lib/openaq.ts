import {
  type OpenAQLocation,
  type OpenAQDateFilter,
  type OpenAQLocationsResponse,
  type OpenAQMeasurement,
  type OpenAQMeasurementsResponse,
  type OpenAQGranularity,
} from "./openaq.types.ts";

const BASE_URL = "https://corsproxy.io/?https://api.openaq.org/v3";

/**
 * Fetch locations within a bounding box, including sensors.
 * Supports optional date filters to find locations with data in the time range.
 */
export const fetchOpenAQLocations = async (
  bbox: [number, number, number, number],
  filters: OpenAQDateFilter = {}
): Promise<OpenAQLocation[]> => {
  const params = new URLSearchParams({
    bbox: bbox.join(","),
    include: "sensors",
    limit: "1000",
  });

  if (filters.dateFrom) params.append("datetime_from", filters.dateFrom);
  if (filters.dateTo) params.append("datetime_to", filters.dateTo);

  const response = await fetch(`${BASE_URL}/locations?${params}`);
  if (!response.ok)
    throw new Error(`Failed to fetch locations: ${response.status}`);
  const data: OpenAQLocationsResponse = await response.json();
  return data.results;
};

/**
 * Fetch measurements for a given sensor and granularity.
 * Supports optional date filters.
 */
export const fetchOpenAQMeasurements = async (
  sensorId: number,
  granularity: OpenAQGranularity,
  filters: OpenAQDateFilter = {}
): Promise<OpenAQMeasurement[]> => {
  const params = new URLSearchParams({
    sensor_id: sensorId.toString(),
    limit: "1000",
  });

  if (filters.dateFrom) params.append("date_from", filters.dateFrom);
  if (filters.dateTo) params.append("date_to", filters.dateTo);

  const url = `${BASE_URL}/measurements/${granularity}?${params}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch measurements: ${response.status}`);
  const data: OpenAQMeasurementsResponse = await response.json();
  return data.results;
};

/**
 * Fetch measurements for all sensors within a bounding box.
 * Supports optional date filters for both location selection and measurement retrieval.
 */
export const fetchOpenAQMeasurementsByBbox = async (
  bbox: [number, number, number, number],
  granularity: OpenAQGranularity,
  filters: OpenAQDateFilter = {}
): Promise<OpenAQMeasurement[]> => {
  const locations = await fetchOpenAQLocations(bbox, filters);
  const measurementsArrays = await Promise.all(
    locations.flatMap((location) =>
      location.sensors.map((sensor) =>
        fetchOpenAQMeasurements(sensor.id, granularity, filters)
      )
    )
  );
  return measurementsArrays.flat();
};

/**
 * Fetch measurements for all sensors in New York City.
 * Supports optional date filters.
 */
export const fetchOpenAQMeasurementsInNYC = async (
  granularity: OpenAQGranularity,
  filters: OpenAQDateFilter = {}
): Promise<OpenAQMeasurement[]> => {
  const bbox: [number, number, number, number] = [
    -74.269855, 40.493325, -73.687826, 40.91604,
  ];
  return fetchOpenAQMeasurementsByBbox(bbox, granularity, filters);
};
