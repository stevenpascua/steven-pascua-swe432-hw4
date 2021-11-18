import React, { Component } from 'react';
import './App.css';


/** App header component

 */
function AppHeader()  
{

    return (
      <div className="Header">
          <div>
            <h1>Super Smash Bros Skill Simulator</h1>
            <p>This webapp takes a persons kill count in super smash bros and decides who is the better player using complex math and statistics! Enter the player's kill count below to get started! </p>
          </div>
          </div>
      );    
}
/** Will list all players ( Passed an array as props) */
function ListPlayers(props)
{
	const players = props.players;
	const listItems = players.map((players) =>
		<li key={players.toString()}>
		{players}
		</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}
/** Returns a random string about how anthony is bad at super smahs bors */
function Result(){
	const resultMessage = ["Anthony sucks yo lmao", "Idk who got the most skillz but Anthoy def has the least lmao.","Anthony Sucks at smash bros", "Anthony is not good with Rosalina and Luma", "Anthony got no skills bro", "Anthony is trash at Smash dawg","Somebody tell Anthony to stop playing villager because he's not good with him."]
	var randomNum = Math.floor(Math.random() * resultMessage.length);
	return (
		<b>{resultMessage[randomNum]}</b>
	)

}
/** Slowly outputs Calculating by using useEffect */
function Calculation(){
  const [numberSequence, numberHolder] = React.useState('');

  let numbers = 'Calculating............... Done',
  index = React.useRef(0);

  React.useEffect(() => {
    function iterate() {
      numberHolder(prev => prev + numbers[index.current]);
      index.current++;
    }
    if (index.current < numbers.length) {
      let addChar = setInterval(iterate, 50);
      return () => clearInterval(addChar);
    }
  }, [numberSequence]);

  return (
    <div>
		{numberSequence}<br>
		</br>
		{index.current == numbers.length-1?
		<div>
			<p> Result: </p>
			<Result />
		</div>
			:null
		}
    </div>
  )
}
/** This component displays the characters and gives the user input for their kill count.



 */
class KillCount extends Component {
	
	constructor(props)
	{
		super(props);
		this.state = {
		    stevenCount: '',		//Steven's kill count
		    gabeCount: '',			//Gabes's kill count
		    liganCount: '',			//Ligan's kill count
			anthonyCount: '',		//Anthony's kill count
			players: [],			// Will countain each player and their kill count
			countSubmit: false,		// if the submit button was pressed this will turn true
		};
		
		this.labelChangedS = this.labelChangedS.bind(this);
		this.labelChangedL = this.labelChangedL.bind(this);
		this.labelChangedG = this.labelChangedG.bind(this);
		this.labelChangedA = this.labelChangedA.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	
	}
	labelChangedS(event)
	{
		this.setState({stevenCount:event.target.value})	
	}
	labelChangedL(event)
	{
		this.setState({liganCount:event.target.value})	
	}
	labelChangedG(event)
	{
		this.setState({gabeCount:event.target.value})	
	}
	labelChangedA(event)
	{
		this.setState({anthonyCount:event.target.value})	
	}
	handleSubmit(event) 
	{
		// This big condiontional checks that each entered kill count is both a number and not null. For each player.
		if ((isNaN(this.state.stevenCount) || this.state.stevenCount == '') || (isNaN(this.state.gabeCount) || this.state.gabeCount == '') || (isNaN(this.state.liganCount) || this.state.liganCount == '') || (isNaN(this.state.anthonyCount) || this.state.anthonyCount == ''))
		{
			alert("Error: all players need at least one number and just one number.")
		}
		// if all are numbers then set submit button pressed to true and set all players into player[] for the list
	 	else
		{
			this.setState({countSubmit:true,players:["Steven: " + String(this.state.stevenCount),"Gabe: " + String(this.state.gabeCount),"Ligan: " + String(this.state.liganCount),"Anthony: " + String(this.state.anthonyCount)]});
		}
		event.preventDefault();
 	} 
	
	render(){
		const messages = ["fetching from sources...", "loading account..."];
			return (
			<div className="App">
				<div>
					<h3> Highest Count: </h3>
					<h3> Lowest Count: </h3>
					{!this.state.countSubmit ?
					<div>
						<h2> Enter each players kill count: </h2>
							<label>
							Steven: <input type = "text" value = {this.state.stevenCount} onChange={this.labelChangedS}/> <br>
							</br>
							Ligan: <input type = "text" value = {this.state.liganCount} onChange={this.labelChangedL}/> <br>
							</br>
							Gabe: <input type = "text" value = {this.state.gabeCount} onChange={this.labelChangedG}/> <br>
							</br>
							Anthony: <input type = "text" value = {this.state.anthonyCount} onChange={this.labelChangedA}/>
							</label>
						<form onSubmit={this.handleSubmit}>
							<input type="submit" value="Submit" />
						</form>
							<div className="Pepe">
								<img src={require('./images/pepe.jpg').default}/>
							</div>
					</div>
					:
					<div>
						<ListPlayers players={this.state.players} />
						<div className="mathContainer">
						<Calculation />
						</div>
					</div> 
				}
			
			
			 	</div>
		 	</div>
	
			)	
		}
}


export {AppHeader, KillCount};
