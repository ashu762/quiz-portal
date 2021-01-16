import "./screens/LoginPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./screens/RegisterPage";
import HomeScreen from "./screens/HomeScreen";
import WelcomePage from "./screens/WelcomePage";
import CreateQuiz from "./screens/CreateQuiz";
import QuizPage from "./screens/QuizPage";
import PostQuestions from "./screens/PostQuestions";
import MyQuiz from "./screens/MyQuiz";
function App() {
  return (
    <Router>
      <Header></Header>
      <div className="App">
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/register" component={RegisterPage}></Route>

        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/home" component={HomeScreen} exact></Route>
        <Route path="/create" component={CreateQuiz} exact></Route>
        <Route path="/create/:id" component={PostQuestions} exact></Route>
        <Route path="/quiz/:id" component={QuizPage}></Route>
        <Route path="/myquiz" component={MyQuiz}></Route>
      </div>
    </Router>
  );
}

export default App;
