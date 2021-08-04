import AppBarMenu from "./AppBar";

const UnAuthorized = () => {
  return (
    <>
      <AppBarMenu inLoginRoute={false}></AppBarMenu>401 UnAuthorized
    </>
  );
};

export default UnAuthorized;
