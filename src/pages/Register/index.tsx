import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaPerson } from "react-icons/fa6";
import { HiOutlineWallet } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router";
import { schema, type RegisterData } from "./register-schema";

import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { auth } from "../../service/firebaseConnection";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function handleRegister(data: RegisterData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then( async(user) => {
      await updateProfile(user.user, { displayName: data.name })

      toast.success("Usuario criado com sucesso")
      navigate("/dashboard")
    })
    .catch(() => {
      toast.error("Erro ao cadastrar usuario")
      
    })
  }

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }

    handleLogout()
  }, [])

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="px-5 flex flex-col border-2 border-gray-200 bg-white w-full max-w-120 rounded-lg">
        <div className="flex mt-6 items-center self-center justify-center w-15 h-15 rounded-full bg-blue-50">
          <HiOutlineWallet size={30} color="#0284C5" />
        </div>
        <h1 className="text-center font-bold text-3xl mt-5">Criar conta</h1>
        <p className="text-center font-medium text-md">
          Comece a organizar suas finanças hoje
        </p>

        <form onSubmit={handleSubmit(handleRegister)} className="w-full mt-12">
          <div className="">
            <label>Nome</label>
            <div className="flex items-center bg-[#F1F5F9] rounded-lg mt-1">
              <div className="border h-8 rounded-l-lg flex items-center justify-center w-10 border-r-0 border-gray-200">
                <FaPerson />
              </div>
              <input
                type="text"
                className="border border-l-0 outline-0 rounded-r-lg w-full h-8 border-gray-200"
                placeholder="Seu nome"
                {...register("name")}
                name="name"
              />
            </div>
            {errors && <p className="text-red-500">{errors.name?.message}</p>}
          </div>

          <div className="mt-5">
            <label>Email</label>
            <div className="flex items-center bg-[#F1F5F9] rounded-lg mt-1">
              <div className="border h-8 rounded-l-lg flex items-center justify-center w-10 border-r-0 border-gray-200">
                <MdOutlineEmail />
              </div>
              <input
                type="text"
                className="border border-l-0 outline-0 rounded-r-lg w-full h-8 border-gray-200"
                placeholder="seu@email.com"
                {...register("email")}
                name="email"
              />
            </div>
            {errors && <p className="text-red-500">{errors.email?.message}</p>}
          </div>

          <div className="mt-5">
            <label>Senha</label>
            <div className="flex items-center bg-[#F1F5F9] rounded-lg mt-1">
              <div className="border h-8 rounded-l-lg flex items-center justify-center w-10 border-r-0 border-gray-200">
                <TbLockPassword />
              </div>
              <input
                type="password"
                className="border border-l-0 outline-0 w-full rounded-r-lg h-8 border-gray-200"
                placeholder="**********"
                {...register("password")}
                name="password"
              />
            </div>
            {errors && <p className="text-red-500">{errors.password?.message}</p>}
          </div>

          <div className="mt-5">
            <label>Confirmar senha</label>
            <div className="flex items-center bg-[#F1F5F9] rounded-lg mt-1">
              <div className="border h-8 rounded-l-lg flex items-center justify-center w-10 border-r-0 border-gray-200">
                <TbLockPassword />
              </div>
              <input
                type="password"
                className="border border-l-0 outline-0 w-full rounded-r-lg h-8 border-gray-200"
                placeholder="**********"
                {...register("confirmPassword")}
                name="confirmPassword"
              />
            </div>
            {errors && <p className="text-red-500">{errors.confirmPassword?.message}</p>}
          </div>

          <button
            type="submit"
            className="text-white cursor-pointer mt-6 bg-blue-400 font-bold w-full h-8 rounded-lg"
          >
            Criar conta
          </button>

          <p className="text-center my-6">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-[#0284C5] font-medium">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
