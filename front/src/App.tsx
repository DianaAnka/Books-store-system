import { useEffect } from "react";
import Routes from "./Routes";
import { getUser } from "./services/authService";
import useStore from "./store";

function App() {
  const store = useStore((state) => state);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        store.setUser({
          email: user.data.user.email,
          isLogged: true,
          profilePic: user.data.user.profilePic,
        });
      } catch (e) {
        store.setUser({
          email: "",
          isLogged: false,
        });
      }
    })();
  }, []);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
