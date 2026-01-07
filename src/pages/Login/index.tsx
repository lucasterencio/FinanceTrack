import { HiOutlineWallet } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, type LoginData } from "./login-schema";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";

import { auth } from "../../service/firebaseConnection";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(schema), mode: "onSubmit" });

  function handleLogin(data: LoginData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("Logado com sucesso");
        navigate("/", { replace: true });
      })
      .catch(() => {
        toast.error("Erro ao logar");
      });
  }

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="px-5 flex flex-col border-2 border-gray-200 bg-white w-full max-w-120 rounded-lg">
        <div className="flex mt-6 items-center self-center justify-center w-15 h-15 rounded-full bg-blue-50">
          <HiOutlineWallet size={30} color="#0284C5" />
        </div>
        <h1 className="text-center font-bold text-3xl mt-5">
          Bem-vindo de volta
        </h1>
        <p className="text-center font-medium text-md">
          Entre na sua conta para continuar
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="w-full mt-12">
          <div className="">
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
            {errors && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
          </div>

        

          <button
            type="submit"
            className="text-white cursor-pointer mt-8 bg-blue-400 font-bold w-full h-8 rounded-lg"
          >
            Entrar
          </button>

          <p className="text-center my-6">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-[#0284C5] font-medium">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
