import React, { Component } from "react";
import { QUESTIONS } from "./questions";


class App extends Component {
  state = {
    percent: 0,
    arr: Array(Object.keys(QUESTIONS).length).fill(null)
  };

  render() {
    const { percent } = this.state;
    return (
      <div className="main__wrap">
        <main className="container">
          <div>
            {Object.keys(QUESTIONS).map(key => {
              return this.renderQuestion(key, QUESTIONS[key])
            })}
          </div>
          <button className="btn-submit" onClick={this.onAnswerSubmit.bind(this)}>submit</button>
          <div className='avg-value'>Average Count: {percent}%</div>
        </main>
      </div>
    );
  }

  renderQuestion(key, value) {
    const { arr } = this.state;
    const yesclassNames = arr[key - 1] === 'Yes' ? "YesSelected" : '';
    const noClassName = arr[key - 1] === 'No' ? "NoSelected" : ''
    return (
      <div className='display-flex' key={key}>
        <label>
          {`${key}. ${value}`}
        </label>
        <div>
          <button className={yesclassNames} onClick={() => { this.handleSelection(key, 'Yes') }}>Yes</button>
          <button className={noClassName} onClick={() => { this.handleSelection(key, 'No') }}>No</button>
        </div>
      </div>
    )
  }

  handleSelection(index, type) {
    const { arr } = this.state;
    let newArray = [...arr];
    newArray[index - 1] = type;
    this.setState({ arr: newArray });
  }

  onAnswerSubmit() {
    const { arr } = this.state;
    const yesCount = arr.filter(i => i === 'Yes').length;
    const questionLength = Object.keys(QUESTIONS).length;
    const avg = (yesCount / questionLength) * 100;
    this.setState({ percent: avg });
  }
}

export default App;
