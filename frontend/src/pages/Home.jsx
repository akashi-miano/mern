import { useEffect } from "react";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("http://localhost:4000/api/workouts");
      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <section className="bg-gray-200 py-12 hero">
      <div className="container grid md:grid-cols-2 gap-12">
        <div className="wrapper flow-content--m">
          {workouts &&
            workouts.map((w) => <WorkoutCard key={w._id} workout={w} />)}
        </div>
        <div className="wrapper order-[-1] md:order-[0]">
          <WorkoutForm />
        </div>
      </div>
    </section>
  );
};

export default Home;
