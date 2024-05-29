import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "./App.css";
import MySubscribed from "./components/mySubscribe";
import SearchBar from "./components/searchBar";
import { TopMenu } from "./components/shared/menu";
import { store } from "./components/store/store";
import { useAppDispatch, useAppSelector } from "../hooks/store";
//import { setIsWalletConnected } from "./store/app-store";
import { Toaster, toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";



const customTheme = extendTheme({
    styles: {
        //@ts-ignore
        global: (props) => ({
            body: {
                background: `linear-gradient(to bottom, #ffffff,#baf7ff)`,
                minHeight: "100vh",
            },
        }),
    },
});




function App() {
    return (
        <Provider store={store}>
            <ChakraProvider theme={customTheme}>
                <TopMenu></TopMenu>
                <SearchBar></SearchBar>
                <MySubscribed></MySubscribed>
            </ChakraProvider>
        </Provider>
    );
}

export default App;

