import Context from "./Context";
import { PureComponent } from "react";
import Dragula from "dragula";
import "../src/Interests.css";
import { saveUser, addUserInterest, removeUserInterest } from "./API";

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
                ({environment, setEnvironment, user, setUser, interests, setInterests}) => {
                    const handleAdd = (event) => {
                        event.preventDefault();
                        const index = interests.remove.findIndex((int) => int === event.target.interest.value)
                        if (index === -1)
                            setInterests({add: [...interests.add, event.target.interest.value], remove: [...interests.remove]});
                        else {
                            let cpy = [...interests.remove];
                            cpy.splice(index, 1);
                            setInterests({add: [...interests.add], remove: [...cpy]});
                        }
                        setUser({...user, interests: [...user.interests,
                            {
                                taskName: event.target.interest.value,
                                subTasks: []
                            }
                        ]});
                    };

                    const handleRemove = (event, taskName) => {
                        event.preventDefault();
                        const removeInterest = (items) => {
                            const index = items.findIndex((item) => item.taskName === taskName);
                            let cpy = [...items];
                            if (index !== -1) {
                                cpy.splice(index, 1);
                                cpy = (index === -1) ? items : [ ...items[index].subTasks, ...cpy ];
                            }
                            return cpy && cpy.map((item) => {
                                return { taskName: item.taskName, subTasks: removeInterest(item.subTasks) };
                            });
                        }
                        const index = interests.add.findIndex((int) => int === taskName)
                        if (index === -1)
                            setInterests({add: [...interests.add], remove: [...interests.remove, taskName]});
                        else {
                            let cpy = [...interests.add];
                            cpy.splice(index, 1);
                            setInterests({add: [...cpy], remove: [...interests.remove]});
                        }
                        setUser({...user, interests: removeInterest(user.interests)});
                    };

                    const renderInterests = (tasks) => {
                      return (
                          <div className="nested" ref={this.dragulaDecorator}>
                              {
                                  tasks &&
                                  tasks.map((item) => (
                                      <div className="item" key={item.taskName}>
                                          <div className="d-flex justify-content-between">
                                              <div className="btn">{item.taskName}</div>
                                              <button className="btn" onClick={(e) => handleRemove(e, item.taskName)}>Remove</button>
                                          </div>
                                          {
                                              item.subTasks.length > 0 ? (
                                                  renderInterests(item.subTasks)
                                              ) : (
                                                  <div className="nested"></div>
                                              )
                                          }
                                      </div>
                                  ))
                              }
                          </div>
                      );
                    };

                    const handleSubmit = (event) => {
                        event.preventDefault();
                        
                        const htmlInterests = document.querySelector(".nested");
                        const parseInterests = (htmlSubInterests) => {
                            if (htmlSubInterests.childElementCount === 0)
                                return [];
                            return (
                                Object.values(htmlSubInterests.children).map((item) => {
                                    return {
                                        taskName: item.children[0].children[0].firstChild.data,
                                        subTasks: parseInterests(item.children[1])
                                    };
                                })
                            );
                        };
                        const updatedUser = {...user, interests: parseInterests(htmlInterests)};

                        interests.add && interests.add.map((int) => addUserInterest(user.profile.id, int));
                        interests.remove && interests.remove.map((int) => removeUserInterest(user.profile.id, int));
                        setInterests({add: [], remove: []});

                        saveUser(user.profile.id, updatedUser);
                        
                        setUser(updatedUser);
                        setEnvironment({...environment, saved: true});
                    };
                    
                    return (
                        <>
                            {environment.saved && <div className="alert alert-success">Saved!</div>}
                            <div className="container">
                                {renderInterests(user.interests)}
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