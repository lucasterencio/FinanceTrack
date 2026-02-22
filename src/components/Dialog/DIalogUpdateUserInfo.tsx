import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { auth } from "@/service/firebaseConnection"
import { signOut, verifyBeforeUpdateEmail } from "firebase/auth"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

export function DialogUpdateUserInfo() {

  const [novoEmail, setNovoEmail] = useState("")
  const navigate = useNavigate()

  const user = auth.currentUser;

  function changeEmailUser() {
    verifyBeforeUpdateEmail(user!, novoEmail)
    .then((() => {
      toast.success("Verifique seu email antes de confirmar a mudança e faça login novamente.");
      setNovoEmail("");
      signOut(auth).then(() => {
        navigate("/")
      })
    }))
    .catch(() => {
      toast.error("Erro ao atualizar email");
    });
  }


  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className="bg-[#F1F5F9] cursor-pointer mt-3">
          <Button variant="outline">Alterar email</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para atualizar seu email.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <label htmlFor="name-1">Novo email</label>
              <Input  id="name-1" name="name" placeholder="Digite o novo email" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button onClick={changeEmailUser} type="submit" className="cursor-pointer bg-[#0284C5]">Alterar email</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
