import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { useState } from "react";

type FormData = {
  nome: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const password = watch("password");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `http://localhost:3001/users?nome=${data.nome}&email=${data.email}`
      );
      const existingUsers = await response.json();

      const duplicate = existingUsers.find(
        (user: FormData) =>
          user.nome === data.nome || user.email === data.email
      );

      if (duplicate) {
        setErrorMessage("Nome de usuário ou email já cadastrados."); 
        return;
      }

      const postResponse = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          nomeUsuario: data.email.split("@")[0],
          password: data.password,
        }),
      });

      if (!postResponse.ok) throw new Error("Erro ao cadastrar usuário");

      setSuccessMessage("Usuário cadastrado com sucesso!");
    } catch (error) {
      setErrorMessage("Erro ao conectar ao servidor."); 
    }
  };

  return (
    <section className="grid min-h-screen place-content-center">
      <h1>Registro</h1>
      <form
        className="grid gap-4 bg-amber-50 p-4 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Seu nome"
            {...register("nome", { required: true, minLength: 2 })}
          />
          {errors.nome && (
            <span className="text-red-500">Nome é obrigatório</span>
          )}
        </div>

        <div className="grid gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Seu email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500">Email inválido</span>}
        </div>

        <div className="grid gap-2">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Crie uma senha"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <span className="text-red-500">
              Senha deve ter pelo menos 6 caracteres
            </span>
          )}
        </div>

        <div className="grid gap-2">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme sua senha"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Senhas não são iguais",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <p>
          Já tem conta? <Link to="/">Faça login</Link>
        </p>

        <button type="submit">Registrar</button>
      </form>
    </section>
  );
}

export { Register };
