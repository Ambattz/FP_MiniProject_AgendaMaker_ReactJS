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
  }

  // your methods goes here

  render() {
    return (
      <div>
        <h1 className="mx-5 mb-5">Agenda Manager</h1>
        {/* show/hide this following add agenda template */}
          <div className="container" role="addAgenda">
            <button className="btn btn-info" role="goToView">Click To View Agenda</button>
            <form>
              <div className="my-3">
                <label className="form-label">Title</label>
                {/* title */}
                <input type="text" name="newTitle" placeholder="Enter the title" className="form-control" role="inputTitle" />
                <small className="text-danger" data-testid="invalidTitle">
                  {/**
                   * show empty string if title input is valid
                   * else show 'Title is required'
                   */}
                </small>
              </div>
              <div className="my-3">
                <label className="form-label">Description</label>
                {/* description */}
                <input type="text" name="newDescription" placeholder="Enter the description" className="form-control" role="inputDescription" />
                <small className="text-danger" data-testid="invalidDescription">
                  {/**
                   * show empty string if description input is valid
                   * else show 'Description is required'
                   */}
                </small>
              </div>
              <div className="my-3 w-50">
                <label className="form-label">Enter topic</label>
                {/* topic */}
                <input type="text" name="newTopic" placeholder="Enter the topic" className="form-control" role="inputTopic" />
                <small className="text-danger" data-testid="invalidTopic">
                  {/**
                    * show empty string if topic input is valid
                    * else show 'Topic is required'
                    */}
                </small>
              </div>
              {/* on click should add topics and disable the button if invalid topic */}
              <button className="btn btn-success addAlign" role="addTopicBtn">+ Add Topic</button>
              {/* on click should add agenda details and disable the button if invalid inputs */}
              <button className="btn btn-success submitAlign" role="submitAgendaBtn">Submit Agenda</button>
            </form>
            {/* show if no topics added yet */}
            <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
              No Topics Added
            </div>
            {/* display the list of topics added using li */}
              <div className="card my-3">
                <div className="card-header">Added Topics</div>
                <div className="card-body">
                  <ul className="list-group">
                      <li className="list-group-item" role="topicList">{/* topics list */}</li>
                  </ul>
                </div>
                <div className="card-footer">Refer the topics you added</div>
              </div>
          </div>
        {/* show/hide this following view agenda template */}
          <div className="container" role="viewAgenda">
            <button className="btn btn-info" role="goToAdd">Click To Add Agenda</button>
            {/* iterate the agenda details to display */}
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
          </div>
      </div>
    );
  }

}

export default App;
