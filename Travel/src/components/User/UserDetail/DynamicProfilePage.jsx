import { useParams } from "react-router-dom";
import NotFoundPageUser from "../../../pages/user/NotFoundUser";
import InsertUserDetail from "../../../pages/user/InsertUserDetail";
import SavedRoute from "../../../pages/user/SavedRoute";
const pageComponents = {
  user: InsertUserDetail,
  Route: SavedRoute
};

const DynamicProfilePage = () => {
  const { section } = useParams();
  
  if (!section) {
    return <NotFoundPageUser />;
  }

  const PageComponent = pageComponents[section] || NotFoundPageUser;

  return <PageComponent />;
};

export default DynamicProfilePage;