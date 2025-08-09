import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return ( 
        <div className="flex min-h-screen flex-col">
            <Navbar />
            {children}
        </div>
    );
}
 
export default Layout;