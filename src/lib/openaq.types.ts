export interface OpenAQApiMeta {
  name: string;
  website: string;
  page: number;
  limit: number;
  found: number;
}

export interface OpenAQCountry {
  id: number;
  code: string;
  name: string;
}

export interface OpenAQOwner {
  id: number;
  name: string;
}

export interface OpenAQProvider {
  id: number;
  name: string;
}

export interface OpenAQInstrument {
  id: number;
  name: string;
}

export interface OpenAQParameter {
  id: number;
  name: string;
  units: string;
  displayName: string;
}

export interface OpenAQSensor {
  id: number;
  name: string;
  parameter: OpenAQParameter;
}

export interface OpenAQCoordinates {
  latitude: number;
  longitude: number;
}

export interface OpenAQAttribution {
  name: string;
  url: string | null;
}

export interface OpenAQLicense {
  id: number;
  name: string;
  attribution: OpenAQAttribution;
  dateFrom: string;
  dateTo: string | null;
}

export interface OpenAQDatetime {
  utc: string;
  local: string;
}

export interface OpenAQLocation {
  id: number;
  name: string;
  locality: string | null;
  timezone: string;
  country: OpenAQCountry;
  owner: OpenAQOwner;
  provider: OpenAQProvider;
  isMobile: boolean;
  isMonitor: boolean;
  instruments: OpenAQInstrument[];
  sensors: OpenAQSensor[];
  coordinates: OpenAQCoordinates;
  licenses: OpenAQLicense[];
  bounds: [number, number, number, number];
  distance: number | null;
  datetimeFirst: OpenAQDatetime;
  datetimeLast: OpenAQDatetime;
}

export interface OpenAQMeasurement {
  value: number;
  flagInfo: {
    hasFlags: boolean;
  };
  parameter: {
    id: number;
    name: string;
    units: string;
    displayName: string | null;
  };
  period: {
    label: string;
    interval: string;
    datetimeFrom: {
      utc: string;
      local: string;
    };
    datetimeTo: {
      utc: string;
      local: string;
    };
  };
  coordinates: OpenAQCoordinates | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  summary: any | null;
  coverage: {
    expectedCount: number;
    expectedInterval: string;
    observedCount: number;
    observedInterval: string;
    percentComplete: number;
    percentCoverage: number;
    datetimeFrom: {
      utc: string;
      local: string;
    };
    datetimeTo: {
      utc: string;
      local: string;
    };
  };
}

export interface OpenAQLocationsResponse {
  meta: OpenAQApiMeta;
  results: OpenAQLocation[];
}

export interface OpenAQMeasurementsResponse {
  meta: OpenAQApiMeta;
  results: OpenAQMeasurement[];
}

export type OpenAQGranularity = "hours" | "days" | "months" | "years";

export interface OpenAQDateFilter {
  dateFrom?: string; // ISO string
  dateTo?: string; // ISO string
}
