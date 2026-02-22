import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { auth } from "@/service/firebaseConnection";
import { useNavigate } from "react-router"
import { deleteUser, signOut } from "firebase/auth";
import toast from "react-hot-toast";

export function DialogDeleteAccount() {
  const navigate = useNavigate()
  const user = auth.currentUser;
  

  function deleteAcount() {
    deleteUser(user!)
    .then(() => {
      signOut(auth)
      .then(() => {
        toast.success("Conta excluída com sucesso!");
        navigate("/")
      })
    })
    .catch(() => {
      toast.error("Erro ao excluir conta");
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-[30%] cursor-pointer hover:opacity-90  text-white mt-3"
        >
          Encerrar conta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Conta</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir sua conta? Esta ação é irreversível.
          </DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
          Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá todos os seus dados de nossos servidores.
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" className="cursor-pointer">Cancelar</Button>
            <Button
              variant="destructive"
              className="cursor-pointer ml-5 hover:opacity-90  text-white mt-3"
              onClick={deleteAcount}
            >
              Sim, encerrar conta
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
