import Context from "./Context";
import { PureComponent } from "react";
import "../src/Events.css";
import { addEventInterest, removeEventInterest, saveEvent, removeEvent } from "./API";

class Events extends PureComponent{
    toString = (datetime) => {
        return (new Date(datetime)).toLocaleString("en-GB", {day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric"});
    }

    renderInterests = (tasks, newEvent, setNewEvent, topics, setTopics) => {
        const handleClick = (event, topic) => {
            event.preventDefault();
            const addTopic = () => {
                const index = topics.remove.findIndex((t) => t === topic)
                if (index === -1)
                    setTopics({add: [...topics.add, topic], remove: [...topics.remove]});
                else {
                    let cpy = [...topics.remove];
                    cpy.splice(index, 1);
                    setTopics({add: [...topics.add], remove: [...cpy]});
                }
            };
            if (!("topics" in newEvent.details)) {
                addTopic();
                setNewEvent({...newEvent, details: { ...newEvent.details, topics: [topic]}});
            } else if (newEvent.details.topics.indexOf(topic) === -1) {
                addTopic();
                setNewEvent({...newEvent, details: {...newEvent.details, topics: [...newEvent.details.topics, topic]}});
            }
        };

        return (
            <>
                {tasks.map((item) => 
                    <>
                        <div className="dropdown-item" onClick={(e) => handleClick(e, item.taskName)}>{item.taskName}</div>
                        {item.subTasks && this.renderInterests(item.subTasks, newEvent, setNewEvent, topics, setTopics)}
                    </>
                )}
            </>
        );
    }

    renderEvents = (task, setNewEvent) => {
        const handleClick = (event) => {
            event.preventDefault();
            setNewEvent(task);
        };

        return (
            <button className="btn col-2 btn-light border-secondary" onClick={handleClick}>
                <div>{task.details.id}</div>
                <div>{this.toString(task.details.begin)}</div>
                <div>{this.toString(task.details.end)}</div>
                <div>Location: {task.details.location}</div>
                <div>Ages: {task.details.minAge}-{task.details.maxAge}</div>
                {task.details.topics && task.details.topics.map((topic) => (<div>{topic}</div>))}
            </button>
        );
    }

    render() {
        return (
            <Context.Consumer>
                {
                    ({user, setUser, hosted, setHosted, newEvent, setNewEvent, topics, setTopics}) => {
                        const handleClick = (event, item) => {
                            event.preventDefault();
                            const index = topics.add.findIndex((t) => t === item)
                            if (index === -1)
                                setTopics({add: [...topics.add], remove: [...topics.remove, item]});
                            else {
                                let cpy = [...topics.add];
                                cpy.splice(index, 1);
                                setTopics({add: [...cpy], remove: [...topics.remove]});
                            }
                            setNewEvent({...newEvent, details: { ...newEvent.details, topics: [...newEvent.details.topics.filter((id) => (id !== item))]}});
                        }

                        const handleSubmit = (event) => {
                            event.preventDefault();
                            setNewEvent({
                                ...newEvent,
                                details: {
                                    ...newEvent.details,
                                    begin: event.target.begin.value,
                                    end: event.target.end.value,
                                    location: event.target.location.value
                                }
                            });
                        };

                        const handleCreate = (event) => {
                            event.preventDefault();
                            const id = 10;
                            const cpy = {...newEvent, details: {...newEvent.details, id: id}};
                            if ("topics" in cpy.details) {
                                const addedTopics = [...cpy.details.topics];
                                console.log(addedTopics);
                                addedTopics.map((t) => addEventInterest(id, t));
                            }
                            setUser({...user, hosted: [...user.hosted, id: id]});
                            setHosted([...hosted, {...cpy}]);
                            setNewEvent({...cpy});
                            saveEvent(id, {...cpy});
                        };

                        const handleUpdate = (event) => {
                            event.preventDefault();
                            setHosted([...hosted.filter((item) => item.details.id !== newEvent.details.id), newEvent]);
                            topics.add && topics.add.map((t) => addEventInterest(newEvent.details.id, t));
                            topics.remove && topics.remove.map((t) => removeEventInterest(newEvent.details.id, t));
                            setTopics({add: [], remove: []});
                            saveEvent(newEvent.details.id, newEvent);
                        };

                        const handleDelete = (event) => {
                            event.preventDefault();
                            const id = newEvent.details.id;
                            let usrCpy = [...user.hosted];
                            const usrIdx = usrCpy.findIndex((item) => item === id);
                            let hostCpy = [...hosted];
                            const hostIdx = hostCpy.findIndex((item) => item.details.id === id);
                            if ("topics" in hostCpy[hostIdx].details) {
                                const removedTopics = [...hostCpy[hostIdx].details.topics];
                                removedTopics.map((t) => removeEventInterest(id, t));
                            }
                            removeEvent(id);
                            setTopics({add: [], remove: []});
                            usrCpy.splice(usrIdx, 1);
                            setUser({...user, hosted: [...usrCpy]});
                            hostCpy.splice(hostIdx, 1);
                            setHosted([...hostCpy])
                            setNewEvent({host: user.profile.id, details: {}, rsvp: []});
                        };

                        return (
                            <>
                                <div className="container text-center">
                                    <form className="border border-success border-3 p-2 m-2" onSubmit={handleSubmit}>
                                        <div className="row m-2">
                                            <div className="col-4">
                                                <label htmlFor="begin">Start time</label>
                                                <input className="form-control" type="datetime-local" id="begin" name="begin" defaultValue={newEvent.details.begin}/>
                                            </div>
                                            <div className="col-4">
                                                <label htmlFor="end">End time</label>
                                                <input className="form-control" type="datetime-local" id="end" name="end" defaultValue={newEvent.details.end}/>
                                            </div>
                                            <div className="col-2">
                                                <div className="dropdown m-4">
                                                    <button className="btn dropdown-toggle border-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Min age: {newEvent.details.minAge}</button>
                                                    <div className="dropdown-menu scrollable" aria-labelledby="dropdownMenuButton">
                                                        {[...Array(newEvent.details.maxAge ? newEvent.details.maxAge : 100)].map((e, i) => {return <div className="dropdown-item" onClick={() => {setNewEvent({...newEvent, details: {...newEvent.details, minAge: i}})}}>{++i}</div>})}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="dropdown m-4">
                                                    <button className="btn dropdown-toggle border-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Max age: {newEvent.details.maxAge}</button>
                                                    <div className="dropdown-menu scrollable" aria-labelledby="dropdownMenuButton">
                                                        {[...Array(newEvent.details.minAge ? 101 - newEvent.details.minAge : 100)].map((e, i) => {return <div className="dropdown-item" onClick={() => {setNewEvent({...newEvent, details: {...newEvent.details, maxAge: i + (newEvent.details.minAge || 1)}})}}>{i + (newEvent.details.minAge || 1)}</div>})}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="location">Location</label>
                                                <input className="form-control" type="address" id="location" name="location" defaultValue={newEvent.details.location}></input>
                                            </div>
                                        </div>
                                        <div className="row m-2">
                                            <div className="col-12 border border-primary border-2 mt-2">
                                                <div className="col-12">
                                                    <div className="dropdown m-2">
                                                        <button className="btn dropdown-toggle border-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Topics</button>
                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            {user.interests && this.renderInterests(user.interests, newEvent, setNewEvent, topics, setTopics)}
                                                        </div>
                                                    </div>
                                                </div>
                                                {newEvent.details.topics && newEvent.details.topics.map((item) => {return <button className="btn col-2 m-2 border-secondary" onClick={(e) => handleClick(e, item)}>{item}</button>})}
                                            </div>
                                        </div>
                                        <button className="btn btn-danger m-2" type="submit">Save</button>
                                        <button className="btn btn-success m-2" type="button" onClick={handleCreate}>{"Add new event"}</button>
                                        {newEvent.details.id &&
                                            <>
                                                <button className="btn btn-primary m-2" type="button" onClick={handleUpdate}>{"Update event " + newEvent.details.id}</button>
                                                <button className="btn btn-danger m-2" type="button" onClick={handleDelete}>{"Delete event " + newEvent.details.id}</button>
                                            </>
                                        }
                                    </form>
                                    <div className="row row-cols-6 m-2">
                                        <div className="col-12">
                                            {hosted && hosted.map((item) => (item && this.renderEvents(item, setNewEvent)))}
                                        </div>
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