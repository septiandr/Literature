import Home from "../screen/home/Home";
import Search from "../screen/search/search";
import AddLiterature from "../screen/add-literature/add-literature";
import Profile from "../screen/profile/profile";
import MyCollection from "../screen/my-collection/my-collection";
import DetailLiterature from "../screen/detail-literature/detail-literature";
import SearchResult from "../screen/search-result/search-result";
import {Route, Switch} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {API,setAuthToken} from '../config/api'
import IndexOwner from '../screen/index-owner/index-owner'
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const isLogin = JSON.parse(sessionStorage.getItem('isLogin'))
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      if(state.user.status == "admin"){
        history.push('/index-owner')
      }
    }
  }, [state]);

  const checkUser = async () => {

    const id =sessionStorage.getItem('user')
    try {
      const response = await API.get(`/check-auth/${id}`);
      console.log(response)
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  console.log(isLogin)
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {isLogin && <Route path  ="/search" component={Search} />}
      {isLogin && <Route path  ="/add-literature" component={AddLiterature} />}
      {isLogin && <Route path  ="/profile/:id" component={Profile} />}
      {isLogin && <Route path  ="/my-collection" component={MyCollection} />}
      {isLogin && <Route path  ="/detail-literature/:id" component={DetailLiterature} />}
      {isLogin && <Route path  ="/search-result" component={SearchResult} />}
      {isLogin && <Route path  ="/index-owner" component={IndexOwner} />}
    </Switch>
  );
}

export default App;
