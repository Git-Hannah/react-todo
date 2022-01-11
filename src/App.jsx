import React, { useState } from "react";
import Button from "../src/components/Button";

/* const todos = [
	{
		name: "Buy milk",
		isChecked: true,
	},
	{
		name: "clean kitchen",
		isChecked: false,
	},
	{
		name: "water plants",
		isChecked: false,
	},
]; */

const App = () => {
	const [value, setValue] = useState("");
	const [todos, setTodos] = useState([
		{
			name: "Buy milk",
			isChecked: true,
		},
	]);
	return (
		<div>
			<div>
				<h1>ToDo</h1>
				<input
					type="text"
					value={value}
					onChange={event_ => {
						setValue(event_.target.value);
					}} //here the video is blech!
				/>
				<button
					disabled={!value}
					onClick={() => {
						setTodos([...todos, { name: value, isChecked: false }]);
						setValue("");
					}}
				>
					Add
				</button>
			</div>

			<ul>
				{todos.map((todo, index) => {
					return (
						<li key={index}>
							<label>
								<input
									type="checkbox"
									checked={todo.isChecked}
									onChange={() => {
										console.log(`Item: ${index + 1}`);
										const update = [...todos];
										update[index].isChecked = !update[index].isChecked;
										setTodos(update);
									}}
								/>
								{todo.name}
							</label>
							<button
								onClick={() => {
									const update = [...todos];
									update.splice(index, 1);
									setTodos(update);
								}}
							>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default App;
