import { NextPage } from "next";
import React from "react";
import Footer from "./footer";
import Header from "./header";

type LayoutProps = React.PropsWithChildren<{}>;

const Layout:NextPage = ({ children, ...props }: LayoutProps) => {
    return ( 
        <div>
            <div className="content">
                <Header {...props}/>
                { children }
            </div>
            <Footer {...props}/>
        </div>

    );
  };
  
export default Layout;
