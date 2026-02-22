import { DialogUpdateUserInfo } from "@/components/Dialog/DIalogUpdateUserInfo";

import { GoAlert } from "react-icons/go";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router";
import { DialogDeleteAccount } from "@/components/Dialog/DialogDeleteAcount";
import { MdOutlineEmail } from "react-icons/md";

export const Profile = () => {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <header className="bg-white h-22 flex items-center border-b-2 border-gray-200 px-3">
        <nav className="w-full mx-auto max-w-7xl flex items-center">
          <Link
            to="/dashboard"
            className="hover:opacity-65  flex items-center gap-4"
          >
            <IoMdArrowRoundBack size={25} color="#000" />
            <span>Voltar</span>
          </Link>

          <h1 className="text-3xl font-bold ml-44">Meu Perfil</h1>
        </nav>
      </header>
      <main className="px-5">
        <section className="w-full bg-white max-w-3xl mx-auto mt-10 flex flex-col p-4 rounded-lg border-2 border-gray-200">
          <div className="flex items-center gap-2">
            <FiUser size={23} />
            <h2 className="font-semibold text-2xl text-[#0F1729]">Informações do Básicas</h2>
          </div>
          <span className="text-[#0F1729]">Gerencie suas informações pessoais</span>

          <form className="mt-5 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[#0F1729]">Nome</label>
              <input
                className="border outline-0 p-1.5 rounded-md bg-[#F1F5F9] border-[#C8D3DF]"
                type="text"
                placeholder={`${user?.name}`}
                disabled
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#0F1729]">Email</label>
              <input
                className="border outline-0 p-1.5 rounded-md bg-[#F1F5F9] border-[#C8D3DF]"
                type="text"
                placeholder={`${user?.email}`}
                disabled
              />
            </div>
          </form>
        </section>

        <section className="w-full bg-white max-w-3xl mx-auto mt-10 flex flex-col p-4 rounded-lg border-2 border-gray-200">
          <div className="flex items-center gap-2">
            <MdOutlineEmail size={23}/>
            <h2 className="font-semibold text-2xl text-[#0F1729]">Email</h2>
          </div>
          <span className="text-[#0F1729]">Você tem a possibilidade de alterar seu email!</span>
          <p className="mt-5">Deseja alterar seu endereço de email?</p>

          <DialogUpdateUserInfo />
        </section>

        <section className="w-full bg-white max-w-3xl mx-auto mt-10 flex flex-col p-4 rounded-lg border-2 border-[#E7000B]">
          <div className="flex items-center gap-2">
            <GoAlert size={23} color="#E7000B"/>
            <h2 className="font-semibold text-2xl text-[#E7000B]">Zona de Perigo</h2>
          </div>
          <span className="text-[#0F1729]">Ações irreversíveis para sua conta</span>
          

          <DialogDeleteAccount />
        </section>
      </main>
    </div>
  );
};
