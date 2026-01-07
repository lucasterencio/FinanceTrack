import { createContext, useState, type ReactNode } from "react";

interface FinanceContextData {
  category: string;
  financeType: FinanceTypeProps;
  financeValue: string;
  financeDescription: string;

  handleValueChange: (newValue: FinanceCategoryProps) => void;
  handleSelectedType: (newType: FinanceTypeProps) => void;
  handleSetValue: (value: string) => void;
  handleSetDescription: (description: string) => void;
}

export type FinanceTypeProps = "despesa" | "receita";
export type FinanceCategoryProps = "alimentacao" | "transporte" | "entretenimento" | "saude" | "contas" | "educacao" | "outros";

export const FinanceContext = createContext({} as FinanceContextData);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [financeCategory, setFinanceCategory] = useState<FinanceCategoryProps>("outros");
  const [financeType, setFinanceType] = useState<FinanceTypeProps>("despesa");
  const [financeValue, setFinanceValue] = useState<string>("")
  const [financeDescription, setFinanceDescription] = useState<string>("")

  function handleValueChange(newValue: FinanceCategoryProps) {
    setFinanceCategory(newValue);
  }

  function handleSelectedType(newType: FinanceTypeProps) {
    setFinanceType(newType);

  }

  function handleSetValue(value: string){
    setFinanceValue(value)
  }

  function handleSetDescription(description: string){
    setFinanceDescription(description)
  }

  return (
    <FinanceContext
      value={{
        category: financeCategory,
        financeType,
        financeValue,
        financeDescription,
        handleSetValue,
        handleValueChange,
        handleSelectedType,
        handleSetDescription
      }}
    >
      {children}
    </FinanceContext>
  );
}
