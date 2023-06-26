import React, { useEffect } from "react";
import { useState } from "react";

	const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

		const createUser = async () => {
			try {
			const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/smch",
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
				"Content-Type": "application/json",
				},
			}
			);
			const data = await response.json();
			console.log(data);
			} catch (error){
				console.log (error)
			}
		};

		const getTodos = async () => {
			try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/smch"
			);
			const data = await response.json();
			setTodos(data);
			} catch (error) {
			console.log(error);
			}
		};

		const UpdateTodos = async () => {
			try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/smch",
				{
					method: "PUT",
					body: JSON.stringify(todos),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			console.log(response.ok); 
			console.log(response.status); 
			console.log(data);
			} catch (error) {
			console.log(error);
			}
		};

		useEffect(() => {
			if (!createUser) {
			createUser();
			}
		}, []);

		useEffect(() => {
			getTodos();
		}, []);

		useEffect(() => {
			UpdateTodos();
		}, [todos]);

		const addTodo = (e) => {
			if (e.key === "Enter" && inputValue.trim() !== "") {
			setTodos([...todos, { label: inputValue, done: false }]);
			setInputValue("");
			}
		};

		const deleteTodo = (id) => {
			setTodos(todos.filter((task, index) => index !== id));
		};

		const deleteAll = async () => {
			try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/smch",
				{
				  method: "DELETE",
				  headers: {
					"Content-Type": "application/json",
				  },
				}
			  );
			  const data = await response.json();
			  console.log(data);
			  setTodos([])
			} catch (error) {
			  console.log(error);
			}
		  };

		return (
				<div className="container">		
				<h1>My Todo List 📝</h1>
					
				<ul>
					<li>
						<input 
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyUp={addTodo} 
							placeholder="Tasks To Be Done"></input>
					</li>
					{todos.map((task, id) => (
					<li key={id}>{task.label}{" "}<i className="fas fa-trash-alt" onClick={() =>deleteTodo(id)}></i>
					</li>
					))
					}
				</ul>
			<div>{todos.length===0 ? <h4>No tasks, add one!</h4> : <h5>You have {todos.length} tasks to complete</h5>}</div>
					
					<button onClick={ () => deleteAll()}>Delete All Todos ⚠️</button> 

			</div>
		);
		};

export default Home;