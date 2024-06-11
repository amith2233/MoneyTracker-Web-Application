import Header from "./Header";
import GetStarted from "./GetStarted";

function Home({token})
{

    return (
        <div className='home'>
            <Header token={token}/>
            <GetStarted/>
        </div>

    );
}
export default Home;