import Grid from "./Grid";
import { ItemList } from "./ItemList";
import { Settings } from "./Settings";

function MainSection() {
    return (
        <div className="w-full px-4 mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl min-h-screen bg-gray-900 py-8 ">
            <Settings/>
            <div className="flex flex-col">
                <div className="order-2 md:order-1">
                    <ItemList/>
                </div>
                <div className="order-1 md:order-2">
                    <Grid/>
                </div>
            </div>
        </div>
    );
}

export default MainSection;