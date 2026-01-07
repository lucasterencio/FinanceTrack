

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FinanceContext } from "@/contexts/FinanceContext"
import { useContext } from "react"

export function SelectTypeTransiction() {

  const { financeType, handleSelectedType } = useContext(FinanceContext)
  return (
    <Select value={financeType} onValueChange={handleSelectedType}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione o tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="">
          
          <SelectItem value="despesa">Despesa</SelectItem>
          <SelectItem value="receita">Receita</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
