"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css"; // reutiliza o mesmo CSS

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleCadastro = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch("/api/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });
  const data = await res.json();
  if (data.success) {
    alert("Cadastro feito com sucesso!");
    router.push("/");
  } else {
    alert(data.error);
  }
};


  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Cadastro</h1>
        <form onSubmit={handleCadastro}>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>

        <button
          className={styles.signupButton}
          onClick={() => router.push("/")}
        >
          Já tem conta? <span>Faça login</span>
        </button>
      </div>
    </div>
  );
}
