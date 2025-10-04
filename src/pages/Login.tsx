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
          user.nomeUsuario === userName && user.email === userEmail
      );

      if (filteredUsers.length) {
        console.log("Login successful:", users[0]);
        setValue(users[0]);
      } else {
        throw Error("Invalid userName or userEmail.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="grid gap-y-2 place-content-center grid-cols-1 py-4 px-6 w-fit rounded-lg bg-gray-50 shadow-2xl min-w-80 h-fit place-self-center border border-gray-100 ">
      <h1 className="text-2xl font-bold text-gray-900 justify-self-start">
        Login
      </h1>
      <form className="grid gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-1">
          <label
            htmlFor="userName"
            className="text-sm text-gray-800 font-medium"
          >
            Usuário
          </label>
          <input
            type="text"
            placeholder="nome.sobrenome"
            id="userName"
            autoComplete="username"
            className="border-2 border-indigo-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            {...register("userName", {
              required: "Nome é obrigatório",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            })}
          />
          {errors.userName && (
            <span className="text-red-500 text-sm">
              {errors.userName.message}
            </span>
          )}
        </div>
        <div className="grid gap-1">
          <label
            htmlFor="userEmail"
            className="text-sm text-gray-800 font-medium"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="nome.sobrenome@mail.com"
            id="userEmail"
            autoComplete="email"
            className="border-2 border-indigo-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            {...register("userEmail", {
              required: "Email é obrigatório",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            })}
          />
          {errors.userEmail && (
            <span className="text-red-500 text-sm">
              {errors.userEmail.message}
            </span>
          )}
        </div>
        <p className="text-base text-gray-600">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="text-indigo-500 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Registre-se
          </Link>
        </p>
        <button
          type="submit"
          className="w-fit justify-self-end px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export { Login };
