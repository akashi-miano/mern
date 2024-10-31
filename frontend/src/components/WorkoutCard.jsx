import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FaTrashAlt } from "react-icons/fa";

const WorkoutCard = ({ workout: { title, load, reps, createdAt, _id } }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const res = await fetch(`http://localhost:4000/api/workouts/${_id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };
  return (
    <div className="rounded-md p-4 shadow-lg bg-white relative">
      <header>
        <h2 className="font-bold text-green-600 mb-4 text-2xl">{title}</h2>
      </header>
      <p className="font-bold">Load (kg): {load}</p>
      <p className="font-bold">Reps: {reps}</p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <button onClick={handleClick} className="absolute top-5 right-5">
        <FaTrashAlt
          size={25}
          className="text-red-500 duration-300 hover:text-red-700"
        />
      </button>
    </div>
  );
};

export default WorkoutCard;
