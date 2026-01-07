import { HiOutlineWallet } from "react-icons/hi2";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";

import { ChartPieDonutActive } from "@/components/Chart/ChartPieDonutActive";
import { DialogAddTransaction } from "@/components/Dialog/DialogAddTransaction";
import type {
  FinanceCategoryProps,
  FinanceTypeProps,
} from "@/contexts/FinanceContext";
import { useContext, useEffect, useState } from "react";

import {
  doc,
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db } from "@/service/firebaseConnection";
import { formatedValue } from "@/components/helpers/formatPrice";
import { AuthContext } from "@/contexts/AuthContext";

interface FinanceProps {
  id: string;
  uid: string;
  category: FinanceCategoryProps;
  createdAt: string;
  description: string;
  email: string;
  name: string;
  type: FinanceTypeProps;
  value: string;
  valueFormated: string;
}

export const Home = () => {
  const [finance, setFinance] = useState<FinanceProps[]>([]);
  const [despesaTotalValue, setDespesaTotalValue] = useState<string>("");
  const [receitaTotalValue, setReceitaTotalValue] = useState<string>("");
  const [saldoValue, setSaldoValue] = useState<string>("");

  const { user } = useContext(AuthContext)

  
  useEffect(() => {

    if (!user || !user.uid) return;


    const docsRef = collection(db, "finance");
    const q = query(docsRef, orderBy("createdAt", "desc"), where("uid", "==", user.uid));

    const unsub = onSnapshot(q, (snapshot) => {
      let financeList: FinanceProps[] = [];

      snapshot.forEach((doc) => {
        financeList.push({
          id: doc.id,
          category: doc.data().category,
          createdAt: doc
            .data()
            .createdAt.toDate()
            .toLocaleDateString("pt-BR", { day: "numeric", month: "short" }),
          description: doc.data().description,
          email: doc.data().email,
          name: doc.data().name,
          type: doc.data().type,
          uid: doc.data().uid,
          valueFormated: doc.data().value.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          }),
          value: doc.data().value,
        });
      });

      setFinance(financeList);

      const despesa = financeList
        .filter((item) => item.type === "despesa")
        .reduce((acc, current) => acc + parseFloat(current.value), 0);

      const receita = financeList
        .filter((item) => item.type === "receita")
        .reduce((acc, current) => acc + parseFloat(current.value), 0);

      const total = receita - despesa;

      setDespesaTotalValue(formatedValue(despesa));
      setReceitaTotalValue(formatedValue(receita));
      setSaldoValue(formatedValue(total));
    });

    return () => unsub();
  }, [user?.uid]);

  async function deleteFinance(item: FinanceProps) {
    const docRef = doc(db, "finance", item.id);
    await deleteDoc(docRef);

    setFinance(finance.filter((fi) => fi.id !== item.id));
  }

  return (
    <main className="w-full max-w-7xl mx-auto mt-6">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-3 w-full">
        <div className="hover:shadow-lg transition duration-500 ease-in-out hover:-translate-y-1 flex items-center bg-white justify-between h-26 border border-gray-200 px-3 border-l-6 border-l-[#0284C5] rounded-lg">
          <div className="flex flex-col">
            <span className="text-md select-none">Seu total</span>
            <strong className="font-bold text-2xl">{saldoValue}</strong>
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
            <HiOutlineWallet size={24} color="#0284C5" />
          </div>
        </div>

        <div className="hover:shadow-lg transition duration-500 ease-in-out hover:-translate-y-1 flex items-center bg-white justify-between h-26 border border-gray-200 px-3 border-l-6 border-l-[#10B981] rounded-lg">
          <div className="flex flex-col">
            <span className="text-md select-none">Receita</span>
            <strong className="font-bold text-2xl text-[#10B981]">
              {receitaTotalValue}
            </strong>
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
            <IoIosTrendingUp size={24} color="#10B981" />
          </div>
        </div>

        <div className="hover:shadow-lg transition duration-500 ease-in-out hover:-translate-y-1 flex items-center bg-white justify-between h-26 border border-gray-200 px-3 border-l-6 border-l-red-600 rounded-lg">
          <div className="flex flex-col">
            <span className="text-md select-none">Seu total</span>
            <strong className="font-bold text-2xl text-red-600">
              {despesaTotalValue}
            </strong>
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
            <IoIosTrendingDown size={24} color="#DB2424" />
          </div>
        </div>
      </section>

      <div className="flex  items-center justify-start ml-3 mt-10 lg:justify-end lg:mr-3 lg:mt-6">
        <DialogAddTransaction />
      </div>

      <div className="w-full px-3 flex flex-col lg:flex-row mt-10 gap-5 mb-10">
        <section className="lg:w-1/2 w-full">
          <ChartPieDonutActive />
        </section>

        <section className="lg:w-1/2 w-full bg-white border-2 border-gray-200 rounded-lg h-200 overflow-y-auto">
          <h2 className="text-lg px-4 font-semibold mt-4">
            Transações Recentes
          </h2>

          {finance.length === 0 ? (
            <div className="flex flex-col items-center gap-10">
              <p className="text-xl font-bold mt-40">
                Nenhuma transação no momento
              </p>
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <GrTransaction color="#fff" />
              </div>
            </div>
          ) : (
            finance.map((item) => (
              <div key={item.id}>
                <div className="flex px-4 justify-between mt-5">
                  <div className="flex items-center gap-4">
                    {item.type === "despesa" ? (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                        <IoIosTrendingDown size={20} color="#DB2424" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <IoIosTrendingUp size={20} color="#10B981" />
                      </div>
                    )}
                    <div>
                      <p>{item.description}</p>
                      <span className="text-sm">
                        {item.category} - {item.createdAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.type === "despesa" ? (
                      <span className="text-red-600 font-semibold">
                        - {item.valueFormated}
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        + {item.valueFormated}
                      </span>
                    )}
                    <button
                      onClick={() => deleteFinance(item)}
                      className="cursor-pointer"
                    >
                      <CiTrash size={20} />
                    </button>
                  </div>
                </div>
                <div className="border border-gray-150 mt-3"></div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
};
