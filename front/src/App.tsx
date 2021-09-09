import { useEffect } from "react";
import Routes from "./Routes";
import { getUser } from "./services/authService";
import useStore from "./store";


function App() {
  const store = useStore((state) => state);

  useEffect(() => {
    (async () => {
      try {
        const { user } = await (await getUser()).data;
        store.setUser({
          email: user.email,
          isLogged: true,
          profilePic: user.profilePic,
          rates: user.rates,
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
