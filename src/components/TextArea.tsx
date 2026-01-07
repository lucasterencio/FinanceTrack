import { Textarea } from "@/components/ui/textarea"
import { FinanceContext } from "@/contexts/FinanceContext"
import { useContext } from "react"

export function TextareaDemo() {
  const { financeDescription, handleSetDescription } = useContext(FinanceContext)

  return <Textarea  value={financeDescription} onChange={(e) => handleSetDescription(e.target.value)} placeholder="Ex: Mercado, Salário..." />
}
