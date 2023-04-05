import { Children } from "react";
import Footer from "../commons/Footer";
import Header from "../commons/Header";

interface Props {
    children?: React.ReactNode;
}

const MainLayout = (props: Props) => {
    const { children } = props;

    return (<>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </>);
}
export default MainLayout;