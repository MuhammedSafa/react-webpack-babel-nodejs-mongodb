import React from "react";
import axios from 'axios';
import logo from "./logo.svg";
import "./App.css";

function App() {
	const [data, setData] = React.useState(null);
	const [name, setName] = React.useState("");
	const [nameToNode, setnameToNode] = React.useState("");
	const [nameFromServer, setNameFromServer] = React.useState("");
	const [receivedServerName, setreceivedServerName] = React.useState("");
	const [visible, setVisible] = React.useState(false);  

	function OnHandle(event) {
        //You can change localhost with your server IP address
		axios.get("http://localhost:3000/api")
			.then(res => {
				const persons = res.data;
				setData(persons.message);
			});
	}

	function handleChange(event) {
		setName(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();

		const user = { name: name };
        //You can change localhost with your server IP address
		axios.post("http://localhost:3000/post", user)
			.then(res => {
				console.log(res);
				console.log(res.data.message);
				setreceivedServerName(res.data.message);
			});
		setnameToNode(name);
		setName("");
		setVisible(true);
	}

	function handleGetName(event) {
		event.preventDefault();
        //You can change localhost with your server IP address
		axios.get("http://localhost:3000/getName?name=" + nameToNode)
			.then(res => {
				const persons = res.data;
				setNameFromServer(persons.message);
			});

	}


	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p onClick={OnHandle} >{!data ? "Loading... (Click Here)" : data}</p>

				<form className="form" onSubmit={handleSubmit}>
					<input name="name" placeholder="Name?" onChange={handleChange} value={name} ></input>
					<button type="submit" >Set My Name</button>
				</form>
				<div>
					{visible && <p onClick={handleGetName}  >{!nameFromServer ? "Your name has been saved. Click Here To Get Your Submitted Name from Server" : "Your name: " + nameFromServer}</p>}
				</div>
			</header>
		</div>
	);
}

export default App;