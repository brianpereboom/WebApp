import Context from "./Context";
import { PureComponent } from "react";
import Dragula from "dragula";
import "../src/Interests.css";
import { API } from "aws-amplify"
import { createInterest, updateInterest, deleteInterest } from "./graphql/mutations";

class Interests extends PureComponent {
  componentDidMount() {
    Dragula([].slice.apply(document.querySelectorAll(".nested")), {
      moves: function (el, source, handle, sibling) {
        return true; // elements are always draggable by default
      },
      accepts: function (el, target, source, sibling) {
        return true; // elements can be dropped in any of the `containers` by default
      }
    });
  }
  
  render() {
    return (
        <Context.Consumer>
            {
                ({user, environment, setEnvironment, interests, setInterests}) => {
                    async function createInt(int) {
                        return await API.graphql({query: createInterest, variables: {input: {owner: user.owner, topic: int.topic, parent: int.parent}}});
                    };
                    async function updateInt(int) {
                        return await API.graphql({query: updateInterest, variables: {input: {id: int.id, owner: int.owner, topic: int.topic, parent: int.parent}}});
                    };
                    async function deleteInt(id) {
                        await API.graphql({query: deleteInterest, variables: {input: {id: id}}});
                    };

                    const handleAdd = (event) => {
                        event.preventDefault();
                        setInterests([...interests, {topic: event.target.interest.value, parent: null}]);
                    };

                    const handleRemove = (event, item) => {
                        event.preventDefault();
                        if (item.id !== "")
                            deleteInt(item.id);
                        const updatedInterests = [...interests.map((i) => {
                            if (i.parent === item.topic) {
                                const newParent = {...i, parent: item.parent};
                                updateInt(newParent);
                                return newParent;
                            }
                            return {...i};
                        })];
                        setInterests([...updatedInterests.filter((i) => i.topic === item.topic && i.parent === item.parent)]);
                    };

                    const renderInterests = (parent, tasks) => {
                        const cpy = [...tasks.filter((item) => item.parent === parent)];
                        return (
                            <div className="nested" ref={this.dragulaDecorator}>
                                {
                                    cpy &&
                                    cpy.map((item) => (
                                        (item.parent === parent) && (
                                            <div className="item" key={item.topic}>
                                                <div className="d-flex justify-content-between">
                                                    <div className="btn" id={item.id}>{item.topic}</div>
                                                    <button className="btn" onClick={(e) => handleRemove(e, item)}>Remove</button>
                                                </div>
                                                {renderInterests(item.topic, tasks)}
                                            </div>
                                        )
                                    ))
                                }
                            </div>
                        );
                    };

                    const handleSubmit = (event) => {
                        event.preventDefault();
                        
                        const htmlInterests = document.querySelector(".nested");
                        const parseInterests = (parent, htmlSubInterests) => {
                            if (htmlSubInterests.childElementCount === 0)
                                return [];
                            return (
                                Array.prototype.concat(...Object.values(htmlSubInterests.children).map((item) => {
                                    const topicElement = item.firstChild.firstChild;
                                    const topic = topicElement.firstChild.data
                                    return [
                                        {topic: topic, parent: parent, id: topicElement.id},
                                        ...parseInterests(item.firstChild.firstChild.firstChild.data, item.children[1])
                                    ];
                                }))
                            );
                        };

                        const updatedInterests = parseInterests(null, htmlInterests);
                        updatedInterests.map((int, idx) => {
                            if (int.id === "")
                                updatedInterests[idx] = createInt(int);
                            else if (!interests.some((i) => (i.id === int.id) && (i.topic === int.topic) && (i.parent === int.parent)))
                                updatedInterests[idx] = updateInt(int);
                            return null;
                        });
                        
                        setInterests([...updatedInterests]);
                        setEnvironment({...environment, saved: true});
                    };
                    
                    return (
                        <>
                            {environment.saved && <div className="alert alert-success">Saved!</div>}
                            <div className="container">
                                {interests && renderInterests(null, interests)}
                                <form onSubmit={handleAdd}>
                                    <button className="btn btn-secondary mt-2" type="submit">Add interest</button>
                                    <input className="form-control" id="interest" name="interest" required maxLength={25}></input>
                                </form>
                                <form onSubmit={handleSubmit}>
                                    <button className="btn btn-success mt-2" type="submit">Save</button>
                                </form>
                            </div>
                        </>
                    );
                } 
            }
        </Context.Consumer>
    );
  }
}

export default Interests;