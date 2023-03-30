import Nav from './Nav.jsx';
import PropertyList from '../../Properties/PropertyList.jsx';
import App from '../../App.js';



function Home({user}) {
    console.log(user)


    return <section className = "page home-page">
        <div className = "home-container">
            hello from home
        </div>
        {/* <Nav /> */}
        <PropertyList />

    </section>
    
}

export default Home