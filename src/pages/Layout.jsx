import { Outlet, useNavigation } from "react-router-dom";
import { Loading, Navbar, SmallSidebar, BigSidebar } from "../components";

const Layout = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <section>
      <main className="grid lg:grid-cols-[auto,1fr]">
        <SmallSidebar />
        <BigSidebar />

        <div>
          <Navbar />
          <div className="align-element py-12">
            {isLoading ? <Loading /> : <Outlet />}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Layout;
