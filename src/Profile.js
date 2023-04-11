import { PureComponent } from "react";
import Context from "./Context";
import { API } from "aws-amplify"
import { updateUser } from "./graphql/mutations";

class Profile extends PureComponent {
    render() {
        return (
            <Context.Consumer>
                {
                    ({environment, setEnvironment, user, setUser}) => {
                        const handleSubmit = (event) => {
                            event.preventDefault();

                            const updatedUser = {
                                owner: user.owner,
                                name: event.target.name.value,
                                birthdate: event.target.birthdate.value,
                                address: event.target.address.value
                            };
                            async function updateUsr(usr) {
                              await API.graphql({query: updateUser, variables: {input: usr}});
                            };
                            updateUsr(updatedUser);

                            setUser(updatedUser);
                            
                            setEnvironment({...environment, saved: true});
                        };
                        
                        return (
                            <form onSubmit={handleSubmit}>
                                {environment.saved && <div className="alert alert-success">Saved!</div>}
                                <div className="form-group ms-2 me-2">
                                    <label htmlFor="name">Name</label>
                                    <input className="form-control" id="name" name="name" defaultValue={user.name}></input>
                                    <label htmlFor="birthdate">Birthdate</label>
                                    <input className="form-control" type="date" id="birthdate" name="birthdate" defaultValue={user.birthdate}></input>
                                    <label htmlFor="address">Address</label>
                                    <input className="form-control" id="address" name="address" defaultValue={user.address}></input>
                                    <button className="btn btn-success mt-2" type="submit">Save</button>
                                </div>
                            </form>
                        );
                    }
                }
            </Context.Consumer>
        );
    }
}

export default Profile;