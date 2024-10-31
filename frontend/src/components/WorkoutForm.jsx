import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const submitData = async (data, e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  const schema = z.object({
    title: z.string().min(3),
    load: z.coerce.number().positive(),
    reps: z.coerce.number().positive(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <form className="flow-content--m" onSubmit={handleSubmit(submitData)}>
      <header className="mb-4">
        <h3 className="font-bold text-2xl">Add a new workout</h3>
      </header>
      <div className="wrapper flow-content--m">
        <div className="">
          <label htmlFor="" className="font-bold">
            Exercise Title
          </label>
          <input
            type="text"
            className="w-full rounded-md p-2"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div className="">
          <label htmlFor="" className="font-bold">
            Load (in kg)
          </label>
          <input
            type="umber"
            className="w-full rounded-md p-2"
            {...register("load")}
          />
          {errors.load && (
            <span className="text-red-500">{errors.load.message}</span>
          )}
        </div>
        <div className="">
          <label htmlFor="" className="font-bold">
            Reps:{" "}
          </label>
          <input
            type="number"
            className="w-full rounded-md p-2"
            {...register("reps")}
          />
          {errors.reps && (
            <span className="text-red-500">{errors.reps.message}</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white rounded-md px-8 py-2 hover:bg-green-700 duration-300"
      >
        Add Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
