import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";

type FormData = {
  userName: string;
  userEmail: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [_, setValue] = useLocalStorage("user", null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { userName, userEmail } = data;

    try {
      const response = await fetch(`http://localhost:3001/users`);

      if (!response.ok) throw Error(`${response.status}`);

      const users = await response.json();

      const filteredUsers = users.filter(
        (user: { nomeUsuario: string; email: string }) =>
          user.nomeUsuario === userName && user.email === userEmail,
      );

      if (filteredUsers.length) {
        console.log("Login successful:", users[0]);
        setValue(users[0]);
        window.location.reload();
      } else {
        throw Error("Invalid userName or userEmail.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="grid h-fit w-fit min-w-80 grid-cols-1 place-content-center gap-y-2 place-self-center rounded-lg border border-gray-100 bg-gray-50 px-6 py-4 shadow-2xl">
      <h1 className="justify-self-start text-2xl font-bold text-gray-900">
        Login
      </h1>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-1">
          <label
            htmlFor="userName"
            className="text-sm font-medium text-gray-800"
          >
            Usuário
          </label>
          <input
            type="text"
            placeholder="nome.sobrenome"
            id="userName"
            autoComplete="username"
            className="rounded-md border-2 border-indigo-500 px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            {...register("userName", {
              required: "Nome é obrigatório",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            })}
          />
          {errors.userName && (
            <span className="text-sm text-red-500">
              {errors.userName.message}
            </span>
          )}
        </div>
        <div className="grid gap-1">
          <label
            htmlFor="userEmail"
            className="text-sm font-medium text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="nome.sobrenome@mail.com"
            id="userEmail"
            autoComplete="email"
            className="rounded-md border-2 border-indigo-500 px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            {...register("userEmail", {
              required: "Email é obrigatório",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            })}
          />
          {errors.userEmail && (
            <span className="text-sm text-red-500">
              {errors.userEmail.message}
            </span>
          )}
        </div>
        <p className="text-base text-gray-600">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="text-indigo-500 hover:underline focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          >
            Registre-se
          </Link>
        </p>
        <button
          type="submit"
          className="w-fit justify-self-end rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export { Login };
