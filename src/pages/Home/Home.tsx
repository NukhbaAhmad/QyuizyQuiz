import Navbar from "../../components/Home/Navbar";
import GetStarted from "../../components/Home/GetStarted";

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <GetStarted />
    </div>
  );
};

export default Home;
