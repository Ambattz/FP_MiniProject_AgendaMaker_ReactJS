/* eslint-disable jsx-a11y/aria-role */
import React, { Component } from "react";

class App extends Component {

  /**
 * keep this following data as default data in agenda details as it is required for testing
 * [
      {
        title: "Angular",
        description: "Some description about the angular",
        topics: ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
      },
      {
        title: "Vue",
        description: "Some description about the vue",
        topics: ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
      },
    ],
 */

  state = {
    // your data goes here
    agenda: [],
    inputs: {},
    topics: [],

    titleIsValid: true,
    descriptionIsValid: true,
    topicIsValid: true,

    submitAgenda: false,
    addTopic: false,

    togView: false,
  }

  // your methods goes here
  togView() {
    this.setState(prevState => ({
      togView: !prevState.togView
    }));
  }
  handleChange(input, e) {
    let inputs = this.state.inputs;
    inputs[input] = e.target.value;
    this.setState({ inputs });
    if (!inputs["newTitle"] || inputs["newTitle"].trim().length === 0) {
      this.setState({
        titleIsValid: false
      });
    } else {
      this.setState({
        titleIsValid: true
      });
    }
    if (!inputs["newDescription"] || inputs["newDescription"].trim().length === 0) {
      this.setState({
        descriptionIsValid: false
      });
    } else {
      this.setState({
        descriptionIsValid: true
      });
    }
    if (!inputs["newTopic"] || inputs["newTopic"].trim().length === 0) {
      this.setState({
        topicIsValid: false
      });
    } else {
      this.setState({
        topicIsValid: true
      });
    }
    if (this.state.topicIsValid) {
      this.setState({
        addTopic: true
      });
    }
    else {
      this.setState({
        addTopic: false
      });
    }
    if (this.state.descriptionIsValid && this.state.titleIsValid && (this.state.topics.length > 0)) {
      this.setState({
        submitAgenda: true
      });
    }
    else {
      this.setState({
        submitAgenda: false
      });
    }
  }
  addT(e) {
    e.preventDefault();
    this.setState(prevState => ({
      topics: [...prevState.topics, this.state.inputs["newTopic"]],
      inputs: { ...prevState.inputs, newTopic: '' }
    }));
    this.setState({
      addTopic: false
    });
    if (this.state.descriptionIsValid || this.state.titleIsValid || (this.state.topics.length > 0)) {
      this.setState({
        submitAgenda: true
      });
    }
    else {
      this.setState({
        submitAgenda: false
      });
    }
  }
  subT(e) {
    e.preventDefault();
    this.setState(prevState => ({
      agenda: [...prevState.agenda,
      {
        title: this.state.inputs["newTitle"],
        description: this.state.inputs["newDescription"],
        topics: this.state.topics
      }],
      topics: [],
      inputs: { newDescription: '', newTitle: '', newTopic: '' }
    }));
    this.setState({
      submitAgenda: false
    });

  }


  render() {
    return (
      <div>
        <h1 className="mx-5 mb-5">Agenda Manager</h1>
        {
          !this.state.togView && (
            <div className="container" role="addAgenda">
              <button className="btn btn-info" role="goToView" onClick={() => { this.togView() }}>Click To View Agenda</button>
              <form>
                <div className="my-3">
                  <label className="form-label">Title</label>
                  {/* title */}
                  <input type="text" name="newTitle" placeholder="Enter the title" className="form-control" role="inputTitle"
                    onChange={this.handleChange.bind(this, "newTitle")}
                    value={this.state.inputs["newTitle"]}
                  />
                  <small className="text-danger" data-testid="invalidTitle">
                    {!this.state.titleIsValid && 'Title is required'}
                  </small>
                </div>
                <div className="my-3">
                  <label className="form-label">Description</label>
                  {/* description */}
                  <input type="text" name="newDescription" placeholder="Enter the description" className="form-control" role="inputDescription"
                    onChange={this.handleChange.bind(this, "newDescription")}
                    value={this.state.inputs["newDescription"]}
                  />
                  <small className="text-danger" data-testid="invalidDescription">
                    {!this.state.descriptionIsValid && 'Description is required'}
                  </small>
                </div>
                <div className="my-3 w-50">
                  <label className="form-label">Enter topic</label>
                  {/* topic */}
                  <input type="text" name="newTopic" placeholder="Enter the topic" className="form-control" role="inputTopic"
                    onChange={this.handleChange.bind(this, "newTopic")}
                    value={this.state.inputs["newTopic"]}
                  />
                  <small className="text-danger" data-testid="invalidTopic">
                    {!this.state.topicIsValid && 'Topic is required'}
                  </small>
                </div>
                {/* on click should add topics and disable the button if invalid topic */}
                <button className="btn btn-success addAlign" role="addTopicBtn" disabled={!this.state.addTopic}
                  onClick={(e) => { this.addT(e) }}>+ Add Topic</button>
                {/* on click should add agenda details and disable the button if invalid inputs */}
                <button className="btn btn-success submitAlign" role="submitAgendaBtn" disabled={!this.state.submitAgenda}
                  onClick={(e) => { this.subT(e) }}>Submit Agenda</button>
              </form>
              {
                Object.keys(this.state.topics).length === 0 ? (
                  <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
                    No Topics Added
                  </div>
                ) : (
                  <div className="card my-3">
                    <div className="card-header">Added Topics</div>
                    <div className="card-body">
                      <ul className="list-group">
                        {
                          this.state.topics.map((topic, index) => <li key={index} className="list-group-item" role="topicList">{topic}</li>)
                        }
                      </ul>
                    </div>
                    <div className="card-footer">Refer the topics you added</div>
                  </div>
                )
              }
            </div>
          )
        }
        {
          this.state.togView && (
            <div className="container" role="viewAgenda">
              <button className="btn btn-info" role="goToAdd" onClick={() => { this.togView() }}>Click To Add Agenda</button>{

                (this.state.agenda.length > 0) ? (
                  this.state.agenda.map((ag, index) => (
                    <div className="card my-3" role="cards" key={index}>
                      <div className="card-header" >
                        {ag.title}
                      </div>
                      <div className="card-body">
                        <ul className="list-group" >
                          {
                            ag.topics.map((topic, index) => <li key={index} className="list-group-item" role="topicList">{topic}</li>)
                          }
                        </ul>
                      </div>
                      <div className="card-footer" >
                        {ag.description}
                      </div>
                    </div>))
                ) : (
                  <div className="card my-3" role="cards">
                    <div className="card-header">
                      {/* {title} */}
                    </div>
                    <div className="card-body">
                      <ul className="list-group">
                        {/* iterate the topics to display */}
                        <li className="list-group-item">
                          {/* {topic} */}
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer">
                      {/* {description} */}
                    </div>
                  </div>
                )}

            </div>
          )
        }
      </div>
    );
  }

}

export default App;
