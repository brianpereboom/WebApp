import "./App.css";
import { useContext, useEffect, useRef, useState } from "react";
import Context from "./Context";
import Profile from "./Profile";
import Interests from "./Interests";
import Events from "./Events";
import Discover from "./Discover";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

import { Auth, API } from "aws-amplify";
import { createUser } from "./graphql/mutations";
import { listUsers, listEvents, eventsByOwner, interestsByOwner } from "./graphql/queries";

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  View,
} from "@aws-amplify/ui-react";

function App({ signOut }) {

  const cachedEnvironment = JSON.parse(localStorage.getItem("environment")) || { saved: false };
  const [environment, setEnvironment] = useState(cachedEnvironment);

  const cachedPath = JSON.parse(localStorage.getItem("path")) || null;
  const [path, setPath] = useState(cachedPath);

  const cachedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(cachedUser);

  const cachedInterests = JSON.parse(localStorage.getItem("interests")) || [];
  const [interests, setInterests] = useState(cachedInterests);
  
  const cachedHosted = JSON.parse(localStorage.getItem("hosted")) || [];
  const [hosted, setHosted] = useState(cachedHosted);

  const cachedRecommended = JSON.parse(localStorage.getItem("recommended")) || [];
  const [recommended, setRecommended] = useState(cachedRecommended);

  const init = useRef(JSON.parse(localStorage.getItem("init")) || true);
  useEffect(() => {
    if (init.current === true) {
      const fetchPost = async () => {
        const amplifyUserData = await Auth.currentUserInfo();
        const userData = await API.graphql({query: listUsers, variables: {owner: amplifyUserData.username, limit: 1}});
        let userObject = {owner: amplifyUserData.username, name: "", birthdate: "", address: ""};
        if (userData.data.listUsers.items.length === 0) {
          await API.graphql({query: createUser, variables: {input: userObject}});
        } else {
          userObject = {owner: amplifyUserData.username, name: userData.data.listUsers.items[0].name, birthdate: userData.data.listUsers.items[0].birthdate, address: userData.data.listUsers.items[0].address};
        }
        await setUser(userObject);
        const interestsData = await API.graphql({query: interestsByOwner, variables: {owner: amplifyUserData.username}});
        const interestsContent = await interestsData.data.interestsByOwner.items;
        await setInterests(interestsContent);
        const hostedData = await API.graphql({query: eventsByOwner, variables: {owner: amplifyUserData.username}});
        await setHosted(hostedData.data.eventsByOwner.items);
        if (interestsContent) {
          const recommendedData = await API.graphql({query: listEvents, authMode: 'API_KEY'});
          const filteredRecommended = await recommendedData.data.listEvents.items.filter((item) => interestsContent.some((int) => item.topics && item.topics.includes(int.topic)));
          await setRecommended(filteredRecommended);
        }
        await localStorage.setItem("init", false);
      };
      fetchPost();
    }
  }, []);
  
  const cachedEvents = JSON.parse(localStorage.getItem("events")) || [];
  const [events, setEvents] = useState(cachedEvents);
  
  const cachedEvent = JSON.parse(localStorage.getItem("newEvent")) || {owner: user.owner, begin: "", end: "", location: "", minAge: 0, maxAge: 100, topics: [], rsvps: []};
  const [newEvent, setNewEvent] = useState(cachedEvent);

  useEffect(() => {
    localStorage.setItem("environment", JSON.stringify(environment));
  }, [environment]);

  useEffect(() => {
    localStorage.setItem("path", JSON.stringify(path));
  }, [path]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("interests", JSON.stringify(interests));
  }, [interests]);

  useEffect(() => {
    localStorage.setItem("hosted", JSON.stringify(hosted));
  }, [hosted]);

  useEffect(() => {
    localStorage.setItem("recommended", JSON.stringify(recommended));
  }, [recommended]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("newEvent", JSON.stringify(newEvent));
  }, [newEvent]);

  const GetPage = () => {
    let state = useContext(Context);
    if (!state.path)
      return  <></>;
    if (state.path === "Profile")
      return <Profile/>;
    if (state.path === "Interests")
      return <Interests/>;
    if (state.path === "Events")
      return <Events/>;
    if (state.path === "Discover")
      return <Discover/>;
    return <></>;
  }

  return (
    <Context.Provider value={{ environment, setEnvironment, path, setPath, user, setUser, interests, setInterests, hosted, setHosted, events, setEvents, newEvent, setNewEvent, recommended, setRecommended}}>
      <header>
        <nav className="navbar bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand nav-title" href="/">IRL</a>
            <ul className="navbar-nav me-auto list-group-horizontal flex-wrap">
              <li><button className="nav-item navbar-toggler" onClick={() => {setPath("Profile"); setEnvironment({...environment, saved: false})}}>Profile</button></li>
              <li><button className="nav-item navbar-toggler" onClick={() => {setPath("Interests"); setEnvironment({...environment, saved: false})}}>Interests</button></li>
              <li><button className="nav-item navbar-toggler" onClick={() => {setPath("Events"); setEnvironment({...environment, saved: false})}}>Events</button></li>
              <li><button className="nav-item navbar-toggler" onClick={() => {setPath("Discover"); setEnvironment({...environment, saved: false})}}>Discover</button></li>
            </ul>
            <View className="App">
              <Button onClick={signOut}>Sign Out</Button>
            </View>
          </div>
        </nav>
      </header>
      <GetPage></GetPage>
    </Context.Provider>
  );
}

export default withAuthenticator(App);
