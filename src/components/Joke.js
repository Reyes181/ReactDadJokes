import React, { Component } from 'react';
import './joke.css';

class Joke extends Component {

    getBorderColor(){
        if(this.props.votes >= 15){
            return "#267F61";
        } else if (this.props.votes >= 12){
            return "#309343";
        } else if (this.props.votes >= 9){
            return "#69b764";
        } else if (this.props.votes >= 6){
            return "#9fcd99";
        } else if (this.props.votes >= 3){
            return "#ffdd71";
        } else if (this.props.votes >= 0){
            return "#ffc156";
        } else {
            return "#d82526";
        }
    }

    getBckColor(){
        if(this.props.votes >= 15){
            return "#267F61";
        } else if (this.props.votes >= 12){
            return "#309343";
        } else if (this.props.votes >= 9){
            return "#69b764";
        } else if (this.props.votes >= 6){
            return "#9fcd99";
        } else if (this.props.votes >= 3){
            return "#ffdd71";
        } else if (this.props.votes >= 0){
            return "#ffc156";
        } else {
            return "#d82526";
        }
    }

    getEmoji(){
        if(this.props.votes >= 15){
            return "em em-rolling_on_the_floor_laughing";
        } else if(this.props.votes >= 12){
            return "em em-laughing";
        } else if(this.props.votes >= 9){
            return "em em-face_with_hand_over_mouth";
        } else if(this.props.votes >= 6){
            return "em em-slightly_smiling_face";
        } else if(this.props.votes >= 3){
            return "em em-neutral_face";
        } else if(this.props.votes >= 0){
            return "em em-confused";
        } else if(this.props.votes >= -2) {
            return "em em-angry";
        }
        else {
            return "em em-face_with_symbols_on_mouth"
        }
    }

    render(){
        return (
            <div className="joke">
                <div className="joke_buttons">
                    <i className="fas fa-arrow-up" onClick={this.props.upVote}/>
                    <span className="joke_votes" style={{borderColor: this.getBorderColor(), background: this.getBckColor()}}>{this.props.votes}</span>
                    <i className="fas fa-arrow-down" onClick={this.props.downVote}/>
                </div>
                <div className="joke_text">{this.props.text}</div>
                <div className="joke_smiley">
                    <i className={this.getEmoji()}/>
                </div>
            </div>
        )
    }
}

export default Joke;