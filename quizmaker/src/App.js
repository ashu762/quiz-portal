import "./screens/LoginPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./screens/RegisterPage";
import HomeScreen from "./screens/HomeScreen";
import CreateQuiz from "./screens/CreateQuiz";
import QuizPage from "./screens/QuizPage";
import PostQuestions from "./screens/PostQuestions";
import MyQuiz from "./screens/MyQuiz";
import NotFound from "./screens/NotFound";
import Result from "./components/Result";
import FileUploadPage from "./screens/FileUploadPage";

import "./App.css";
// import Footer from "./components/Footer";
import QuizDetailsPage from "./screens/QuizDetailsPage";

function App() {
  return (
    <Router>
      <Header></Header>
      <div className="app-container">
        <div className="App">
          <Switch>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/home" component={HomeScreen} exact></Route>
            <Route path="/create" component={CreateQuiz} exact></Route>
            <Route path="/create/:id" component={PostQuestions} exact></Route>
            <Route path="/quiz/:id" component={QuizPage} exact></Route>
            <Route path="/myquiz" component={MyQuiz}></Route>
            <Route path="/quiz/result" component={Result}></Route>
            <Route path="/file/upload" component={FileUploadPage}></Route>
            <Route
              path="/quiz/details/:id"
              component={QuizDetailsPage}
              exact
            ></Route>
            <Route path="/" component={NotFound}></Route>
          </Switch>
        </div>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
