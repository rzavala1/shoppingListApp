import { AppProps } from 'next/app';
import { ProviderAuth } from '../hooks/useAuth';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../commons/apollo';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


function MyApp({ Component, pageProps }: AppProps) {

    const options = {
        timeout: 5000,
        position: positions.TOP_CENTER
    };

    return <>
        <ApolloProvider client={apolloClient}>
            <Provider template={AlertTemplate} {...options}>
                <ProviderAuth>
                    <Component {...pageProps} />
                </ProviderAuth>
            </Provider>
        </ApolloProvider></>
}

export default MyApp;