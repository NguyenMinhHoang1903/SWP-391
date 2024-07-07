import Product from "../layouts/Products";
import Container from "../layouts/Container";
import ExerciseSpaShop from "../services/ExerciseSpaShop";


const Home = () =>{
    <style>
        
    </style>
    return(
        <div class='homepage view'>
            <h1 style={{textAlign: 'center', marginTop: '60px', marginBottom: '20px'}}>Pet's Spa </h1>
            <div class="block col-12 p-20">
                <Product/>
            </div>
            <div class="block">
                <ExerciseSpaShop/>
            </div>
            <div class="block">
                <Container/>
            </div>
        </div>
        
    );
}
export default Home;