import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";
import { useUser } from "@clerk/clerk-react";

const HomePage = () => {
  const { user } = useUser();
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
