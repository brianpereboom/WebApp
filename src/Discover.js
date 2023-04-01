import { PureComponent } from "react";
import { addRsvp, removeRsvp } from "./API";
import Context from "./Context";

class Discover extends PureComponent {
    toString = (datetime) => {
        return (new Date(datetime)).toLocaleString("en-GB", {day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric"});
    }

    renderTopics = (tasks) => {
        const handleClick = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <div className="dropdown m-2">
                <div className="btn btn-light dropdown-toggle border-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={handleClick}>Topics</div>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {tasks.map((item) => <div className="dropdown-item" onClick={handleClick}>{item}</div>)}
                </div>
            </div>
        );
    }

    renderEvent = (task, user, setUser) => {
        const id = user.rsvp.indexOf(task.id);

        const handleClick = (event) => {
            event.preventDefault();
            if (id === -1) {
                setUser({...user, rsvp: [...user.rsvp, task.id]});
                addRsvp(task.id, user.profile.id);
            } else {
                let cpy = user.rsvp.slice();
                cpy.splice(id, 1);
                setUser({...user, rsvp: [...cpy]});
                removeRsvp(task.id, user.profile.id);
            }
            // Add rsvp functionality to API (update events to add/remove userId to/from rsvp attribute)
            // Instead of passing one interest at a time when updating the interests DB, pass all of them at the same time
            // Concurrent PUT requests can cause changes from one request to be dropped because the other request used the original data instead of the update
            // Set up a database and refactor the API to make requests to the database instead of a .json file
        };

        const renderInfo = () => {
            return (
                <>
                    <div>{task.id}</div>
                    <div>{this.toString(task.begin)}</div>
                    <div>{this.toString(task.end)}</div>
                    <div>Location: {task.location}</div>
                    <div>Ages: {task.minAge}-{task.maxAge}</div>
                    {task.topics && this.renderTopics(task.topics)}
                </>
            );
        };

        if (id === -1)
            return (
                <button className="btn col-2 border-secondary btn-light" onClick={handleClick}>
                    {renderInfo()}
                </button>
            );
        return (
            <button className="btn col-2 border-secondary btn-success" onClick={handleClick}>
                {renderInfo()}
            </button>
        );
    }
    
    render () {
        return (
            <Context.Consumer>
                {
                    ({user, setUser, recommended}) => {
                        return (
                            <div className="container text-center">
                                <div className="row row-cols-6 m-2">
                                    <div className="col-12">
                                        {recommended && recommended.map((item) => (this.renderEvent(item.details, user, setUser)))}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            </Context.Consumer>
        );
    }
}

export default Discover;