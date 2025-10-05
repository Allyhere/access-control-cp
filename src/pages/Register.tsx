import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { useState } from "react";

type FormData = {
  name: string;
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

  // Lê a password para validação de confirmação depois
    const password = watch("password");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `http://localhost:3000/users?name=${data.name}&email=${data.email}`
      );
      const existingUsers = await response.json();

      const duplicate = existingUsers.find(
        (user: FormData) =>
          user.name === data.name || user.email === data.email

    return (
      <section className="grid min-h-screen place-content-center">
        <h1>Registro</h1>
        <form
          className="grid gap-4 bg-amber-50 p-4 rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-2">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome"
              {...register("name", { required: true, minLength: 2 })}
            />
            {errors.name && (
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

          <p>
            Já tem conta? <Link to="/">Faça login</Link>
          </p>

          <button type="submit">Registrar</button>
        </form>
      </section>
    );
  }

  export { Register };
