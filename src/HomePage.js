// UserProfile.js (or any relevant component)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userCal, setUserCal] = useState(null);
  const [userFitCal, setUserFitCal] = useState(null);
  const [error, setError] = useState(null);
  const [date, setDate] = useState("");
  const [food, setFood] = useState("");
  const [totalCalories, setTotalCalories] = useState("");
  const [dateCal, setDateCal] = useState("");
  const [showCal, setShowCal] = useState("");
  const [calDay, setCalDay] = useState("");
  const [calFitDay, setCalFitDay] = useState("");
  const [timeEat, setTimeEat] = useState("");
  const [dateFit, setDateFit] = useState("");
  const [activity, setActivity] = useState("");
  const [activityCal, setActivityCal] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const dateStorage = localStorage.getItem("date");
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/users/find-user/" + userId
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setError(null);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Something went wrong");
        setUser(null);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    const dataToSend = {
      user: userId,
      entries: [
        {
          date: date,
          time: timeEat,
          food: food,
          totalCalories: parseInt(totalCalories, 10),
        },
      ],
    };
    console.log(dataToSend);

    try {
      const response = await fetch("http://localhost:5000/calorie-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Calorie entry saved:", responseData);
        setDate("");
        setFood("");
        setTotalCalories("");
      } else {
        console.error("Failed to save calorie entry");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitFitness = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    const dataToSend = {
      user: userId,
      date: date,
      activity: activity,
      totalCalories: parseInt(activityCal, 10),
    };
    console.log(dataToSend);

    try {
      const response = await fetch("http://localhost:5000/fitness-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Fitness entry saved:", responseData);
        setActivity("");
        setActivityCal("");
      } else {
        console.error("Failed to save fitness entry");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCalDay = async (e) => {
    localStorage.setItem("date", dateCal);

    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    console.log(dateCal);
    try {
      const response = await fetch(
        `http://localhost:5000/users/total-calories/${userId}/${dateCal}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response");
      }
      let totalCaloriesDay = 0;
      const userData = await response.json();
      userData.forEach((user) => {
        user.entries.forEach((entry) => {
          totalCaloriesDay += entry.totalCalories;
        });
      });

      console.log("Total Calories for All Users: ", totalCaloriesDay);
      setUserCal(userData);
      setCalDay(totalCaloriesDay);
      setError(null);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      setError("Something went wrong");
      setUserCal(null);
    } finally {
      setShowCal(!showCal);
    }
  };

  const handleFitnessDay = async (e) => {
    localStorage.setItem("dateFit", dateFit);

    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    console.log(dateFit);
    try {
      const response = await fetch(
        `http://localhost:5000/users/total-calories/${userId}/2/${dateFit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response");
      }
      let fitCaloriesDay = 0;
      const userData = await response.json();
      userData.forEach((user) => {
        fitCaloriesDay += user.totalCalories;
      });
      console.log(userData);
      console.log("Total Calories for All Users: ", fitCaloriesDay);
      setUserFitCal(userData);
      setCalFitDay(fitCaloriesDay);
      setError(null);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      setError("Something went wrong");
      setUserFitCal(null);
    } finally {
      setShowCal(!showCal);
    }
  };

  const HandleGraph = async (e) =>{
    navigate('/Graph');
  }

  const HandleGraph2 = async (e) =>{
    navigate('/Graph2');
  }

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Height: {user.height}</p>
          <p>Weight: {user.weight}</p>
          <p>Email: {user.email}</p>
          {/* Display other user-specific data as needed */}
        </div>
      ) : (
        <p>{error || "Loading..."}</p>
      )}
      <h1>Food</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Food:
          <input
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="text"
            value={timeEat}
            onChange={(e) => setTimeEat(e.target.value)}
          />
        </label>
        <br />
        <label>
          Total Calories:
          <input
            type="number"
            value={totalCalories}
            onChange={(e) => setTotalCalories(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <form onSubmit={handleCalDay}>
        <label>
          Date:
          <input
            type="date"
            value={dateCal}
            onChange={(e) => setDateCal(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {userCal ? (
        userCal.map((user, userIndex) => (
          <div key={userIndex}>
            <p>User ID: {user.userid}</p>
            <ul>
              {user.entries.map((entry, entryIndex) => (
                <li key={entryIndex}>
                  <p>Date: {entry.date}</p>
                  <p>Time: {entry.time}</p>
                  <p>Food: {entry.food}</p>
                  <p>Calories: {entry.totalCalories}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>{error || "No entries on this date"}</p>
      )}
      <p>Total Calories this day: {calDay}</p>
      <h1>Fitness</h1>
      <form onSubmit={handleSubmitFitness}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Activity:
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Fitness Calories:
          <input
            type="number"
            value={activityCal}
            onChange={(e) => setActivityCal(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handleFitnessDay}>
        <label>
          Date:
          <input
            type="date"
            value={dateFit}
            onChange={(e) => setDateFit(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {userFitCal ? (
        userFitCal.map((user, userIndex) => (
          <div key={userIndex}>
            <p>User ID: {user.userid}</p>
            <p>Date: {user.date}</p>
            <p>Activity: {user.activity}</p>
            <p>Calories: {user.totalCalories}</p>
          </div>
        ))
      ) : (
        <p>{error || "No entries on this date"}</p>
      )}

      <button type="submit" onClick={HandleGraph}>
        Go to Graph
      </button>
      <button type="submit" onClick={HandleGraph2}>
        Go to Graph 2
      </button>
    </div>
  );
};

export default HomePage;
