import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";

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

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <section className="grid min-h-screen place-content-center">
      <h1>Login</h1>
      <form
        className="grid gap-4 bg-amber-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="userName"
            {...register("userName", {
              required: true,
              minLength: 2,
            })}
          />
          {errors.userName && (
            <span className="text-red-500">Campo obrigatório</span>
          )}
        </div>
        <label htmlFor="userEmail" className="grid gap-2">
          Email
          <input
            type="email"
            placeholder="Email"
            id="userEmail"
            {...register("userEmail", { required: true, minLength: 3 })}
          />
        </label>
        <p>
          Não tem uma conta? <Link to="/register">Registre-se</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export { Login };
