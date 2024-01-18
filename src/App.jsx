import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/Settings.jsx";
import Account from "./pages/Account.jsx";
import Cabins from "./pages/Cabins.jsx";
import Bookings from "./pages/Bookings.jsx";
import Login from "./pages/Login.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        }
    }
})

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route index element={<Navigate replace to={'dashboard'}/>}/>
                        <Route path={'dashboard'} element={<Dashboard/>}/>
                        <Route path={'bookings'} element={<Bookings/>}/>
                        <Route path={'cabins'} element={<Cabins/>}/>
                        <Route path={'users'} element={<Users/>}/>
                        <Route path={'settings'} element={<Settings/>}/>
                        <Route path={'account'} element={<Account/>}/>
                    </Route>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'*'} element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster position={'top-center'}
                     gutter={12}
                     containerStyle={{margin: '8px'}}
                     toastOptions={{
                         success: {
                             duration: 2000,
                         },
                         error: {
                             duration: 2000,
                         },
                         style: {
                             fontSize: '16px',
                             maxWidth: '500px',
                             padding: '16px 24px',
                             background: 'var(--color-grey-700)',
                             color: 'var(--color-grey-0)',
                         },
                     }}
            />
        </QueryClientProvider>


        // <>
        //     <GlobalStyles/>
        //     <StyledApp>
        //         <Row type={'horizontal'}>
        //                 <Heading type={'h1'}>The Wild Oasis!</Heading>
        //             <div>
        //                 <Heading type={'h2'}>Check In and Out</Heading>
        //                 <Button variation={'primary'} size={'medium'}>Check In</Button>
        //                 <Button variation={'secondary'} size={'small'}>Check Out</Button>
        //             </div>
        //         </Row>
        //         <Row type={'vertical'}>
        //             <Heading as={'h3'}>Forms</Heading>
        //             <form>
        //             <Input type={'number'} placeholder={'Number of Guests'}/>
        //             <Input type={'number'} placeholder={'Number of Guests'}/>
        //             </form>
        //         </Row>
        //     </StyledApp>
        // </>
    )
}

export default App
