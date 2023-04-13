import Context from "./Context";
import { PureComponent } from "react";
import "../src/Events.css";
import { API } from 'aws-amplify';
import { createEvent, updateEvent, deleteEvent } from './graphql/mutations';

class Events extends PureComponent{
    constructor () {
        super();
        this.state = {
            focus: false,
            datetimeChange: false
        };
    };

    toString = (datetime) => {
        return (new Date(datetime)).toLocaleString("en-GB", {day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric"});
    }

    renderEvents = (task, setNewEvent) => {
        const handleClick = (event) => {
            event.preventDefault();
            setNewEvent(task);
        };
        return (
            <button className="btn col-2 btn-light border-secondary" onClick={handleClick}>
                <div>{task.id}</div>
                <div>{this.toString(task.begin)}</div>
                <div>{this.toString(task.end)}</div>
                <div>Location: {task.location}</div>
                <div>Ages: {task.minAge}-{task.maxAge}</div>
                {task.topics && task.topics.map((topic) => (<div>{topic}</div>))}
            </button>
        );
    }

    render() {
        return (
            <Context.Consumer>
                {
                    ({user, interests, hosted, setHosted, newEvent, setNewEvent}) => {
                        async function createEvnt(evnt) {
                            const created = await API.graphql({query: createEvent, variables: {input: {owner: user.owner, begin: evnt.begin, end: evnt.end, location: evnt.location, minAge: evnt.minAge, maxAge: evnt.maxAge, topics: evnt.topics, rsvps: evnt.rsvps, status: evnt.status}}});
                            return created.data.createEvent;
                        };
                        async function updateEvnt(evnt) {
                            return await API.graphql({query: updateEvent, variables: {input: {id: evnt.id, owner: evnt.owner, begin: evnt.begin, end: evnt.end, location: evnt.location, minAge: evnt.minAge, maxAge: evnt.maxAge, topics: evnt.topics, rsvps: evnt.rsvps, status: evnt.status}}});
                        };
                        async function deleteEvnt(id) {
                            await API.graphql({query: deleteEvent, variables: {input: {id: id}}});
                        };
                        
                        const handleAddTopic = (event, topic) => {
                            event.preventDefault();
                            if (newEvent.topics === null)
                                setNewEvent({...newEvent, topics: [topic]});
                            else
                                setNewEvent({...newEvent, topics: [...newEvent.topics.filter((t) => t !== topic), topic]});
                        };

                        const handleRemoveTopic = (event, item) => {
                            event.preventDefault();
                            setNewEvent({...newEvent, topics: [...newEvent.topics.filter((id) => (id !== item))]});
                        }

                        const handleSave = (event) => {
                            event.preventDefault();
                            setNewEvent({
                                ...newEvent,
                                begin: event.target.begin.value,
                                end: event.target.end.value
                            });
                            this.setState({unsavedChanges: false});
                        };

                        const handleFocus = (event) => {
                            this.setState({focus: true});
                        };

                        const handleLocation = (event) => {
                            if (this.state.focus) {
                                setNewEvent({
                                    ...newEvent,
                                    location: event.target.value
                                });
                                this.setState({focus: false});
                            }
                        };

                        const handleCreate = async (event) => {
                            event.preventDefault();
                            if (newEvent.topics.length === 0)
                                alert("No topics have been selected for this event.\nPlease add topics and update the event.");
                            const createdEvent = await createEvnt(newEvent);
                            setHosted([...hosted, createdEvent]);
                            setNewEvent(createdEvent)
                        };

                        const handleUpdate = (event) => {
                            event.preventDefault();
                            if (newEvent.topics.length === 0)
                                alert("No topics have been selected for this event. Nobody will see this event until topics have been added.");
                            setHosted([...hosted.filter((item) => item.id !== newEvent.id), newEvent]);
                            updateEvnt(newEvent);
                        };

                        const handleDelete = (event) => {
                            event.preventDefault();
                            const id = newEvent.id;
                            deleteEvnt(id);
                            setHosted([...hosted.filter((host) => host.id !== id)]);
                        };

                        return (
                            <>
                                <div className="container text-center border border-success border-3 p-2 m-2">
                                    <form onSubmit={handleSave}>
                                        <div className="row m-2">
                                            <div className="col-6">
                                                <label htmlFor="begin">Start time</label>
                                                <input className="form-control" type="datetime-local" id="begin" name="begin" onChange={() => this.setState({datetimeChange: true})} defaultValue={newEvent.begin} required/>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="end">End time</label>
                                                <input className="form-control" type="datetime-local" id="end" name="end" onChange={() => this.setState({datetimeChange: true})} defaultValue={newEvent.end} required/>
                                            </div>
                                        </div>
                                        {this.state.datetimeChange &&
                                            <div className="row m-2">
                                                <div className="col-2 mt-4">
                                                    <button className="btn btn-danger" type="submit">Save</button>
                                                </div>
                                                <div className="col-2 mt-4">
                                                    <button className="btn btn-primary" onClick={() => {this.setState({datetimeChange: false}); setNewEvent({...newEvent});}}>Revert</button>
                                                </div>
                                            </div>
                                        }
                                    </form>
                                    <form onSubmit={handleCreate}>
                                        {
                                            !this.state.datetimeChange &&
                                            <>
                                                <div className="row m-2">
                                                    <div className="col-2">
                                                        <div className="dropdown m-4">
                                                            <button className="btn dropdown-toggle border-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Min age: {newEvent.minAge}</button>
                                                            <div className="dropdown-menu scrollable" aria-labelledby="dropdownMenuButton">
                                                                {[...Array(newEvent.maxAge ? newEvent.maxAge + 1 : 101)].map((_, i) => {return <div className="dropdown-item" onClick={() => setNewEvent({...newEvent, minAge: i})}>{i}</div>})}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="dropdown m-4">
                                                            <button className="btn dropdown-toggle border-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Max age: {newEvent.maxAge}</button>
                                                            <div className="dropdown-menu scrollable" aria-labelledby="dropdownMenuButton">
                                                                {[...Array(newEvent.minAge ? 101 - newEvent.minAge : 101)].map((e, i) => {return <div className="dropdown-item" onClick={() => {setNewEvent({...newEvent, maxAge: i + (newEvent.minAge || 0)})}}>{i + (newEvent.minAge || 0)}</div>})}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <label htmlFor="location">Location</label>
                                                        <input className="form-control" type="address" id="location" name="location" onFocus={handleFocus} onBlur={handleLocation} defaultValue={newEvent.location} required></input>
                                                    </div>
                                                    <div className="row m-2">
                                                        <div className="col-12 border border-primary border-2 mt-2">
                                                            <div className="col-12">
                                                                <div className="dropdown m-2">
                                                                    <button className="btn dropdown-toggle border-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Topics</button>
                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        {interests && interests.map((item) => <div className="dropdown-item" onClick={(e) => handleAddTopic(e, item.topic)}>{item.topic}</div>)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {newEvent.topics && newEvent.topics.map((item) => {return <button className="btn col-2 m-2 border-secondary" onClick={(e) => handleRemoveTopic(e, item)}>{item}</button>})}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-success m-2" type="submit">{"Add new event"}</button>
                                            </>
                                        }
                                        {newEvent.id && !this.state.datetimeChange &&
                                            <>
                                                <button className="btn btn-primary m-2" type="button" onClick={handleUpdate}>{"Update event " + newEvent.id}</button>
                                                <button className="btn btn-danger m-2" type="button" onClick={handleDelete}>{"Delete event " + newEvent.id}</button>
                                            </>
                                        }
                                    </form>
                                </div>
                                <div className="row row-cols-6 m-2">
                                    <div className="col-12">
                                        {hosted && hosted.map((item) => (item && this.renderEvents(item, setNewEvent)))}
                                    </div>
                                </div>
                            </>
                        );
                    }
                }
            </Context.Consumer>
        );
    }
}

export default Events;