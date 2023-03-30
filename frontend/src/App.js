import "./App.css";
import { useContext, useEffect, useRef, useState } from "react";
import Context from "./Context";
import Profile from "./Profile";
import Interests from "./Interests";
import Events from "./Events";
import Discover from "./Discover";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  View
} from "@aws-amplify/ui-react";

function App({signOut}) {
  const cachedEnvironment = JSON.parse(localStorage.getItem("environment")) || { saved: false };
  const [environment, setEnvironment] = useState(cachedEnvironment);

  const cachedPath = JSON.parse(localStorage.getItem("path")) || null;
  const [path, setPath] = useState(cachedPath);

  const cachedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(cachedUser);
  
  const cachedHosted = JSON.parse(localStorage.getItem("hosted")) || [];
  const [hosted, setHosted] = useState(cachedHosted);

  const userId = 5; // Get the url which corresponds with the user's data from the permissions granted by AWS Cognito
  const init = useRef(localStorage.getItem("init") || true);
  useEffect(() => {
    if (init.current === true) {
      const fetchPost = async () => {
        const userData = await fetch(`http://localhost:3000/api/users/${userId}`);
        const userJson = await userData.json();
        await setUser(userJson);
        const hostedEvents = await fetch(`http://localhost:3000/api/events/${userJson.profile.id}`);
        const hostedJson = await hostedEvents.json();
        await setHosted([...hostedJson]);
        await localStorage.setItem("init", false);
      };
      fetchPost();
    }
  }, []);
  
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const parseInterests = (interests) => {
          const parsed = interests && interests.map((int) => [...parseInterests(int.subTasks), int.taskName]);
          return parsed ? parsed.flat() : [];
      };
      const interests = parseInterests(user.interests);

      const recommendedEvents = await Promise.all(interests && interests.map(async (int) => {
        const fetched = await fetch(`http://localhost:3000/api/events/recommended/${int}`);
        const fetchedJson = fetched.json();
        return fetchedJson;
      }));
      await setRecommended([...new Map(recommendedEvents.flat().map((item) => [item.details.id, item])).values()]);
    };
    fetchPost();
  }, [user.interests]);
  
  const cachedEvents = JSON.parse(localStorage.getItem("events")) || [];
  const [events, setEvents] = useState(cachedEvents);
  
  const cachedEvent = JSON.parse(localStorage.getItem("newEvent")) || {host: userId, details: {}, rsvp: []};
  const [newEvent, setNewEvent] = useState(cachedEvent);

  const cachedInterests = JSON.parse(localStorage.getItem("interests")) || {add: [], remove: []};
  const [interests, setInterests] = useState(cachedInterests);

  const cachedTopics = JSON.parse(localStorage.getItem("topics")) || {add: [], remove: []};
  const [topics, setTopics] = useState(cachedTopics);

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
    localStorage.setItem("hosted", JSON.stringify(hosted));
  }, [hosted]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("newEvent", JSON.stringify(newEvent));
  }, [newEvent]);

  useEffect(() => {
    localStorage.setItem("interests", JSON.stringify(interests));
  }, [interests]);

  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);
  
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
  	<>
    		<Context.Provider value={{ environment, setEnvironment, path, setPath, user, setUser, hosted, setHosted, recommended, events, setEvents, newEvent, setNewEvent, interests, setInterests, topics, setTopics}}>
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
    </>
  );
}

export default withAuthenticator(App);
