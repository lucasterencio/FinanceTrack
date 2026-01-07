import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FinanceContext } from "@/contexts/FinanceContext";
import { useContext } from "react";

export function SelectCategory() {

  const { category, handleValueChange } = useContext(FinanceContext)

  return (
    <Select value={category} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione a categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="">
          
          <SelectItem value="alimentacao">Alimentação</SelectItem>
          <SelectItem value="transporte">Transporte</SelectItem>
          <SelectItem value="entretenimento">Entretenimento</SelectItem>
          <SelectItem value="saude">Saúde</SelectItem>
          <SelectItem value="contas">Contas</SelectItem>
          <SelectItem value="educacao">Educação</SelectItem>
          <SelectItem value="outros">Outros</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
