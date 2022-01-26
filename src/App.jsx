import React, { useState } from "react";
import Button from "../src/components/Button";
import styled from "@emotion/styled";
import {Title} from "./components/Typography";
import {v4 as uuid} from "uuid";

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
		},
	]);
	return (
		<Body>
			<Header>
				<Title>ToDo</Title>
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
			</Header>

			<ul>
				{todos.map((todo, index) => {
					return (
						<ListItem key={todo.id}>
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
