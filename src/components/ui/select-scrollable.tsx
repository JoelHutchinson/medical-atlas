import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable({
  value,
  onValueChange,
}: {
  value?: string;
  onValueChange?: (val: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select an indicator" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>HIV/AIDS</SelectLabel>
          <SelectItem value="HIV_ARTCOVERAGE">ART Coverage</SelectItem>
          <SelectItem value="HIV_0000000026">HIV Prevalence</SelectItem>
          <SelectItem value="HIV_MORTALITY">HIV Mortality</SelectItem>
          <SelectItem value="HIV_NEWINFECTIONS">New HIV Infections</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Tuberculosis</SelectLabel>
          <SelectItem value="UHC_TB_DT">TB Incidence</SelectItem>
          <SelectItem value="TB_MORTALITY">TB Mortality</SelectItem>
          <SelectItem value="TB_TREATMENTCOVERAGE">
            TB Treatment Coverage
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Malaria</SelectLabel>
          <SelectItem value="MALARIA_CASES">Malaria Cases</SelectItem>
          <SelectItem value="MALARIA_MORTALITY">Malaria Mortality</SelectItem>
          <SelectItem value="MALARIA_ITN_COVERAGE">ITN Coverage</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Hepatitis</SelectLabel>
          <SelectItem value="HEPB_PREVALENCE">
            Hepatitis B Prevalence
          </SelectItem>
          <SelectItem value="HEPC_PREVALENCE">
            Hepatitis C Prevalence
          </SelectItem>
          <SelectItem value="HEPB_VACC_COVERAGE">
            Hepatitis B Vaccine Coverage
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Other Infectious Diseases</SelectLabel>
          <SelectItem value="MEASLES_INCIDENTS">Measles Incidence</SelectItem>
          <SelectItem value="DENGUE_CASES">Dengue Cases</SelectItem>
          <SelectItem value="INFLUENZA_CASES">Influenza Cases</SelectItem>
          <SelectItem value="COVID19_CASES">COVID-19 Cases</SelectItem>
          <SelectItem value="COVID19_MORTALITY">COVID-19 Mortality</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
