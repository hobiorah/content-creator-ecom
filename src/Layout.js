// import Header from './Header';
import { Callout, Flex } from '@radix-ui/themes';
import Nav from './Nav';
// import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { InfoCircledIcon } from '@radix-ui/react-icons';

const Layout = ({  }) => {
    return (
        <div className="App">
    
            <Nav    />
            {/* outlet represents all the elemnts that will be included that aren't consistent reardless of whats happeneing */}
            <div className='' style={{ "margin-top":"95px"  }}>
                <Outlet /> 
            </div>
           
            {/* <Footer /> */}
            <div>Follow us on Social media: <a class='color--purple' href="https://www.instagram.com/clarity.for.all/">Instagram</a>, <a class='color--blue' href="https://www.youtube.com/@clarity_for_all">Youtube</a></div>
        </div>
    )
}

export default Layout

//things that are always present?

