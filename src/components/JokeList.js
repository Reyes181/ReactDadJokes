import React, {Component} from 'react';
import './jokelist.css';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from './Joke';

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = { 
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false,
            sorted: false
        };
        this.seenJokes = new Set(this.state.jokes.map(joke => joke.joke))
    }
    componentDidMount(){
        if(this.state.jokes.length === 0){
            this.getJokes();
        }
        
    }

    async getJokes(){
        try{
            let jokes = [];
            while(jokes.length < this.props.numJokesToGet){
                let res = await axios.get("https://icanhazdadjoke.com/", {
                    headers: {Accept: "application/json"}
                });  
                if(!this.seenJokes.has(res.data.joke)){
                    jokes.push({id: uuid(), joke: res.data.joke, votes: 0});
                } else {
                    console.log('Duplicate Found');
                    console.log(res.data.joke)
                }
                
            }
            this.setState(
                st => ({
                    loading: false,
                    jokes: [...st.jokes, ...jokes]
                }),
                () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
            );
            window.localStorage.setItem("jokes", JSON.stringify(jokes));
        }
        catch(error){
            alert(error)
        }
    }

    handleVote = (id, delta) => {
        this.setState(
            st => ({
                jokes: st.jokes.map(joke =>
                    joke.id === id ? {...joke, votes: joke.votes + delta} 
                    : 
                    joke
                )
            }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        )
    }

    handleClick = () => {
        this.setState({
            loading: true
        },
            this.getJokes
        )
        
    }

    handleSort = () => {
        this.setState({
            sorted: !this.state.sorted
        })
    }

    render(){
        return (
            <div className="jokelist">
                <div className="jokelist_sidebar">
                    <h1 className="jokelist_title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8929/9a8f2cc0-f446-46a7-a673-4ef1d45f2291.svg" alt="emoji"/>
                    <button className="jokelist_getmore" onClick={this.handleClick}>More Jokes</button>
                    <button className="jokelist_sort" onClick={this.handleSort}>{this.state.sorted ? <p>stop sorting jokes</p> : <p>keep jokes sorted</p> }</button>
                </div>
                
                <div className="jokelist_jokes">
                    {this.state.loading ? 
                        <div className="jokelist_spinner">
                            <i className="fas fa-8x fa-spinner fa-spin"/>
                        </div>
                        :
                        <div>
                            {this.state.sorted ? 
                                <div>
                                    {this.state.jokes.sort((a,b) => b.votes - a.votes).map(joke => (
                                        <Joke 
                                            key={joke.id} 
                                            text={joke.joke} 
                                            votes={joke.votes}
                                            upVote={() => this.handleVote(joke.id, 1)}
                                            downVote={() => this.handleVote(joke.id, -1)}
                                        />
                                    ))}
                                </div>
                                :
                                <div>
                                    {this.state.jokes.map(joke => (
                                        <Joke 
                                            key={joke.id} 
                                            text={joke.joke} 
                                            votes={joke.votes}
                                            upVote={() => this.handleVote(joke.id, 1)}
                                            downVote={() => this.handleVote(joke.id, -1)}
                                        />
                                    ))}
                                </div>
                            }
                            
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default JokeList