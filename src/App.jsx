import React, { useState } from "react";
import Button from "../src/components/Button";
import styled from "@emotion/styled";
import { Title } from "./components/Typography";
import { v4 as uuid } from "uuid"; // Library für id, einfach die aktuelle Version ins package.json eintragen, und hier die version 4 eingeben

const Body = styled.div`
	background: yellow;
	margin: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 80%;
`;

const Header = styled.div`
	background: pink;
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const ListItem = styled.li`
	list-style: none;
`;

const App = () => {
	const [value, setValue] = useState("");
	const [todos, setTodos] = useState([
		{
			name: "Buy milk",
			isChecked: true,
			id: uuid(),
		},
	]);
	return (
		<Body>
			<Header>
				<Title>ToDo</Title>
				<h2>{value}</h2>
				<form // onClick wird zu onSubmit und so kann auch Enter zum adden gedrückt werden
					onSubmit={event_ => {
						event_.preventDefault();
						setTodos([...todos, { name: value, isChecked: false, id: uuid() }]);
						setValue("");
					}}
				>
					<input
						type="text"
						value={value}
						onChange={event_ => {
							setValue(event_.target.value);
						}}
					/>
					<button disabled={!value} type="submit">
						Add
					</button>
				</form>
			</Header>

			<ul>
				{todos.map((todo, index) => {
					return (
						<ListItem key={todo.id}>
							{/* performanter als {index}, da nur ein konkretes Element neu gerendert */}
							wird
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
						</ListItem>
					);
				})}
			</ul>
		</Body>
	);
};

export default App;

// This was the hard coded list from the setup in the beginning:
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
]; 
// Das <div> bevor es ein <form> wurde:
<div>
					<input
						type="text"
						value={value}
						onChange={event_ => {
							setValue(event_.target.value);
						}}
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
*/
