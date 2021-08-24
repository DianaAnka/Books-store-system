import { makeStyles } from "@material-ui/core/styles";
import AppBarMenu from "./AppBar";

const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
    maxHeight: "500px",
    overflow: "auto",
    display: "block",
    background: "bisque",
    marginTop: "200px",
    
  },
  userSection: {
    position: "relative",
    width: "200px",
    height: "200px",
    margin: "10vh auto",
  },
  userInfoCotainer: {
    width: "60%",
    margin: "10vh auto",
  },
  userTable: {
    width: "100%",
    backgroundColor: " #d9e4f5",
    backgroundImage: "linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)",
  },
  addImageIcon: {
    position: "absolute",
    right: "25px",
    fontSize: "2em",
  },
  userUl: {
    position: "relative",
    left: "-20px",
    listStyleType: "none",
  },
  tdContainer: {
    margin: "30px",
    borderRadius: "5px",
    boxShadow: " 0px 6px 16px -6px rgb(1 1 1 / 50%)",
    padding: "30px",
    verticalAlign: "top",
  },
  userLi: {
    padding: "40px 0",
    color: "black",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
});

const BookPage = (props: any) => {
  const data = props.location.state.data;
  const classes = useStyles();

  return (
    <>
      <AppBarMenu inLoginRoute={false}></AppBarMenu>
      <div className={classes.userInfoCotainer}>
        <table className={classes.userTable}>
          <tbody>
            <tr>
              <td className={classes.tdContainer}>
                <ul className={classes.userUl}>
                  <li className={classes.userLi}>
                    <b>Author : </b>
                    {data.author}
                  </li>
                  <li className={classes.userLi}>
                    <b>Tags : </b>

                    {data.tags?.map((tag: string) => (
                      <> {tag}</>
                    ))}
                  </li>
                  <li className={classes.userLi}></li>
                </ul>
              </td>
              <td className={classes.tdContainer}>
                <ul className={classes.userUl}>
                  <li className={classes.userLi}>
                    <h1>
                      {" "}
                      <b>Title : </b>
                      {data.title}
                    </h1>
                  </li>
                  <li className={classes.userLi}>
                    <b>Abstract : </b>
                    {data.abstract}
                  </li>
                  <li className={classes.userLi}>
                    <b>content : </b>
                    {data.content}
                  </li>
                  <li className={classes.userLi}></li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookPage;
