import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  const [_, setValue] = useLocalStorage("user", null);

  const password = watch("password");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `http://localhost:3001/users?nome=${data.nome}&email=${data.email}`,
      );
      const existingUsers = await response.json();

      const duplicate = existingUsers.find(
        (user: FormData) =>
          user.nome === data.nome || user.email === data.email,
      );

      if (duplicate) {
        setErrorMessage("Nome de usuário ou email já cadastrados.");
        return;
      }

      const payload = {
        nome: data.nome,
        email: data.email,
        nomeUsuario: data.email.split("@")[0],
        password: data.password,
      };

      const postResponse = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!postResponse.ok) throw new Error("Erro ao cadastrar usuário");

      setSuccessMessage("Usuário cadastrado com sucesso!");
      setValue(payload);
      window.location.reload();
    } catch (error) {
      setErrorMessage(`Erro ao conectar ao servidor - ${error}`);
    }
  };

  return (
    <section className="grid h-fit w-fit min-w-80 grid-cols-1 place-content-center gap-y-2 place-self-center rounded-lg border border-gray-100 bg-gray-50 px-6 py-4 shadow-2xl">
      <h1 className="justify-self-start text-2xl font-bold text-gray-900">
        Registro
      </h1>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-1">
          <label className="text-sm font-medium text-gray-800" htmlFor="nome">
            Nome
          </label>
          <input
            className="rounded-md border-2 border-indigo-500 px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            type="text"
            id="nome"
            placeholder="Seu nome"
            {...register("nome", {
              required: "Você precisa fornecer um nome",
              minLength: {
                value: 2,
                message: "Nome deve ter pelo menos 2 caracteres",
              },
            })}
          />
          {errors.nome && (
            <span className="text-sm text-red-500">{errors.nome.message}</span>
          )}
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium text-gray-800" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md border-2 border-indigo-500 px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            type="email"
            id="email"
            placeholder="Seu email"
            {...register("email", { required: "Inclua um e-mail" })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="grid gap-1">
          <label
            className="text-sm font-medium text-gray-800"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            className="rounded-md border-2 border-indigo-500 px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="Crie uma senha"
            {...register("password", {
              required: "Você precisa fornecer uma senha",
              minLength: {
                value: 6,
                message: "Senha deve ter pelo menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="grid gap-1">
          <label
            className="text-sm font-medium text-gray-800"
            htmlFor="confirmPassword"
          >
            Confirmar Senha
          </label>
          <input
            className="rounded-md border-2 border-indigo-500 px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirme sua senha"
            {...register("confirmPassword", {
              required: "Você precisa fornecer uma senha",
              validate: (value) =>
                value === password || "Senhas não são iguais",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <p className="text-base text-gray-600">
          Já tem conta?{" "}
          <Link
            to="/"
            className="text-indigo-500 hover:underline focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          >
            Faça login
          </Link>
        </p>

        <button className="w-fit justify-self-end rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 focus:outline-none">
          Registrar
        </button>
      </form>
    </section>
  );
}

export { Register };
