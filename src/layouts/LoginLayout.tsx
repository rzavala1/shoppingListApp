import { Children } from "react";
import Footer from "../commons/Footer";
import Header from "../commons/Header";

interface Props {
    children?: React.ReactNode;
}

const LoginLayout = (props: Props) => {
    const { children } = props;

    return (<>
        <main>
            {children}
        </main>
    </>);
}
export default LoginLayout;