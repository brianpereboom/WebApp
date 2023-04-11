import { PureComponent } from "react";
import { API } from "aws-amplify";
import { updateEvent } from "./graphql/mutations";
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

    renderEvent = (owner, task, recommended, setRecommended) => {
        const handleClick = (event) => {
            const rsvped = task.rsvps === null ? {id: task.id, rsvps: [owner]} : task.rsvps.includes(owner) ? {id: task.id, rsvps: [...task.rsvps.filter((r) => r !== owner)]} : {id: task.id, rsvps: [...task.rsvps, owner]};
            API.graphql({query: updateEvent, variables: {input: rsvped}});
            setRecommended([...recommended.filter((r) => r.id !== task.id), {...task, rsvps: [...rsvped.rsvps]}]);
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

        if (task.owner === owner)
            return (
                <button className="btn col-2 border-secondary btn-primary">
                    {renderInfo()}
                </button>
            );
        if (task.rsvps && task.rsvps.includes(owner))
            return (
                <button className="btn col-2 border-secondary btn-success" onClick={handleClick}>
                    {renderInfo()}
                </button>
            );
        return (
            <button className="btn col-2 border-secondary btn-light" onClick={handleClick}>
                {renderInfo()}
            </button>
        );
    }

    render () {
        return (
            <Context.Consumer>
                {
                    ({user, recommended, setRecommended}) => {
                        return (
                            <div className="container text-center">
                                <div className="row row-cols-6 m-2">
                                    <div className="col-12">
                                        {recommended && recommended.map((item) => (this.renderEvent(user.owner, item, recommended, setRecommended)))}
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