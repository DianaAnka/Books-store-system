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
        console.log(
          "type ",
          Object.keys(user.rates).some(
            (key) => user.rates[key].index === "6107ab6d90c8f6385c240318"
          )
        );
        Object.keys(user.rates).forEach((key) => {
          console.log("key ", key);
        });
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
