import Login from "./views/Login";
import Profile from "./views/Profile";
import ResponsiveAppBar from "./components/AppBar";

const API_URL = "https//localhost:8000"

function App() {
    const isLogin = false
    const login = async (user) => {
        const res = await fetch(API_URL+"/login", {
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(user)
        })
        const data = await res.json()
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