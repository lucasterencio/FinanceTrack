import { FiUser } from "react-icons/fi";
import { HiOutlineWallet } from "react-icons/hi2";
import { Link, useNavigate } from "react-router";
import { PiSignOut } from "react-icons/pi";
import { signOut } from "firebase/auth";
import { auth } from "@/service/firebaseConnection";

export const Header = () => {

  const navigate = useNavigate()

  async function handleLogout() {
    await signOut(auth);
    navigate("/")
  }

  return (
    <header className="bg-white h-22 flex items-center border-b-2 border-gray-200 px-3">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="bg-[#0284C5] flex items-center justify-center w-10 h-10 rounded-lg"
          >
            <HiOutlineWallet color="#fff" size={25} />
          </Link>
          <div>
            <h2 className="font-bold text-xl">Finance Track</h2>
            <p className="text-sm">Organize suas finanças</p>
          </div>
        </div>

        <div className="flex items-center gap-7">
          <Link
            className="hover:bg-gray-100 transition duration-500 w-10 h-10 rounded-full flex items-center justify-center"
            to="/"
          >
            <FiUser size={23} />
          </Link>
          <button onClick={handleLogout} className="hover:bg-gray-100 cursor-pointer transition duration-500 w-10 h-10 rounded-full flex items-center justify-center">
            <PiSignOut size={23} />
          </button>
        </div>
      </nav>
    </header>
  );
};
