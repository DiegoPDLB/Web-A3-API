import Login from "./views/Login";
import Profile from "./views/Profile";
import ResponsiveAppBar from "./components/AppBar";
import { set } from "mongoose";

const API_URL = "https//localhost:8000"

function App() {
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState({})
    const login = async (user) => {
        const res = await fetch(API_URL+"/login", {
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(user)
        })
        const data = await res.json()
        setIsLogin(data.isLogin)
        setUser(data.user)
        return data
    }
    return(
        <>
        <BrowserRouter>
        {isLogin && <ResponsiveAppBar />}
        </BrowserRouter>
        </>
    )
}