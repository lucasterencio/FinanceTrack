import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { SelectTypeTransiction } from "../Select/SelectTypeTransaction";
import { TextareaDemo } from "../TextArea";
import { Input } from "../ui/input";
import { SelectCategory } from "../Select/SelectCategory";
import { useContext } from "react";
import { FinanceContext } from "@/contexts/FinanceContext";
import { AuthContext } from "@/contexts/AuthContext";

import { db } from "@/service/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

import toast from "react-hot-toast";

export function DialogAddTransaction() {
  const {
    category,
    financeType,
    financeValue,
    financeDescription,
    handleSetDescription,
    handleValueChange,
    handleSetValue,
    handleSelectedType,
  } = useContext(FinanceContext);
  const { user } = useContext(AuthContext);

  function handleAddTransaction() {
    if (financeDescription === "") {
      toast.error("Adicione uma descrição");
      return;
    }

    if (financeValue === 0 || financeValue === undefined) {
      toast.error("Adicione um valor");
      return;
    }

    addDoc(collection(db, "finance"), {
      type: financeType,
      description: financeDescription,
      value: financeValue,
      category,
      uid: user?.uid,
      name: user?.name,
      email: user?.email,
      createdAt: new Date(),
    })
      .then(() => {
        toast.success("Transação realizada");
        handleSetDescription("");
        handleSetValue("");
        handleValueChange("outros");
        handleSelectedType("despesa");
      })
      .catch((err) => {
        console.log(err);
        console.log("Erro ao cadastrar ao banco");
      });
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="cursor-pointer hover:opacity-85 flex items-center bg-[#1A8FCB]"
            variant="outline"
          >
            <FaPlus color="#fff" />
            <span className="text-white">Nova Transação</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Adicionar Transação</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3 w-full">
              <label htmlFor="name-1">Tipo</label>
              <SelectTypeTransiction />
            </div>

            <div className="grid gap-3">
              <label htmlFor="username-1">Descrição</label>
              <TextareaDemo />
            </div>

            <div className="grid gap-3 w-full">
              <label htmlFor="name-1">Valor (R$)</label>
              <Input
                value={financeValue}
                onChange={(e) => handleSetValue(e.target.value)}
                type="number"
                placeholder="0,00"
              />
            </div>

            <div className="grid gap-3 w-full">
              <label htmlFor="name-1">Categoria</label>
              <SelectCategory />
            </div>
          </div>
          <DialogFooter className="w-full">
            {/* <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose> */}
            <Button
              onClick={handleAddTransaction}
              type="submit"
              className="w-full hover:opacity-85 cursor-pointer bg-[#1A8FCB] text-white"
            >
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
