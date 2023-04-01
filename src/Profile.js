import { PureComponent } from "react";
import { saveUser } from "./API";
import Context from "./Context";

class Profile extends PureComponent {
    render() {
        return (
            <Context.Consumer>
                {
                    ({environment, setEnvironment, user, setUser}) => {
                        const handleSubmit = (event) => {
                            event.preventDefault();

                            const updatedUser = {
                                ...user,
                                profile: {
                                    id: parseInt(user.profile.id),
                                    name: event.target.name.value,
                                    birthdate: event.target.birthdate.value,
                                    address: event.target.address.value
                                }
                            };
                            setUser(updatedUser);
                            
                            saveUser(user.profile.id, updatedUser);
                            
                            setEnvironment({...environment, saved: true});
                        };
                        
                        return (
                            <form onSubmit={handleSubmit}>
                                {environment.saved && <div className="alert alert-success">Saved!</div>}
                                <div className="form-group ms-2 me-2">
                                    <label htmlFor="name">Name</label>
                                    <input className="form-control" id="name" name="name" defaultValue={user.profile.name}></input>
                                    <label htmlFor="birthdate">Birthdate</label>
                                    <input className="form-control" type="date" id="birthdate" name="birthdate" defaultValue={user.profile.birthdate}></input>
                                    <label htmlFor="address">Address</label>
                                    <input className="form-control" id="address" name="address" defaultValue={user.profile.address}></input>
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