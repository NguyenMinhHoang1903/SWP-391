import { GiCheckMark } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { LuDog } from "react-icons/lu";
import { FaShieldCat } from "react-icons/fa6";
const Washing = () =>{
    return(
      <>
        <div className="product-container block">
          <div className="product" style={{backgroundColor: '#faaa5a'}}>
            <div className="product-left" style={{height: 500 }} >
              <img alt="Washing" className="block" src='assets/imgs/washingstep.jpg' />
            </div>
            <div className="product-right">
              <div className="product-title">
                Why is it necessary to bathe dogs and cats regularly?
              </div>
              <div className="product-description" >
              <LuDog /> Mischievous dogs and cats often have very dirty fur. This will make your pet's skin susceptible to disease or the appearance of scabies, fleas or ticks. Besides, the secretion of sweat glands from the skin also causes bacteria to stick to the fur and skin, causing itching for your pet.<br></br>
              <LuDog /> To get rid of them, bathing your pet regularly is very good and recommended. Especially for pets that have the habit of sleeping with their owners or have babies at home, bathing and brushing when the pet sheds is very necessary!<br></br>
              </div>
            </div>
          </div>
        </div>

        <div className="product-container block">
      <div className="product" style={{backgroundColor: '#faaa5a'}}>
        <div className="product-right">
          <div className="product-title">
          Bathing service package process for dogs and cats
          </div>
          <div className="product-description">
          <FaShieldCat/> Step 1: Pet adoption process.<br></br>
          <FaShieldCat/> Step 2: Brush your fur before bathing.<br></br>
          <FaShieldCat/> Step 3: Bathing process for dogs and cats.<br></br>
          <FaShieldCat/> Step 4: Suction your pet's sweat glands.<br></br>
          <FaShieldCat/> Step 5: Dry your pet's fur and ears.<br></br>
          <FaShieldCat/> Step 6: Return dogs and cats to customers.<br></br>
          </div>
        </div>
        <div className="product-left">
          <img className="block" src='assets/imgs/washingstep1.jpg' alt="" style={{width: 800}} />
        </div>
      </div>
    </div>


        <div className="block" style={{textAlign: 'center',margin: 70}}>
          <h1>Price list for dog and cat fur trimming service</h1>
        </div>
        <div class="cardWashing-container block">
          <div class="cardWashing card-1">
            <div>
              <h1>Under 10kg</h1>
              <h1>150.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Bath and soften fur</li>
              <li><GiCheckMark />Clean your pet's ears</li>
              <li><GiCheckMark />Claw cut</li>
              <li><GiCheckMark />Squeeze your pet's sweat glands</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
          <div class="cardWashing card-2">
            <div>
              <h1>10-15KG</h1>
              <h1>200.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Bath and soften fur</li>
              <li><GiCheckMark />Clean your pet's ears</li>
              <li><GiCheckMark />Claw cut</li>
              <li><GiCheckMark />Squeeze your pet's sweat glands</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
          <div class="cardWashing card-3">
            <div>
              <h1>15kg or more</h1>
              <h1>250.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Bath and soften fur</li>
              <li><GiCheckMark />Clean your pet's ears</li>
              <li><GiCheckMark />Claw cut</li>
              <li><GiCheckMark />Squeeze your pet's sweat glands</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
        </div>
      <div className="product-container block">
      <div className="product" style={{backgroundColor: '#f06464'}}>
        <div className="product-right">
          <div className="product-title">
          Note before using the bathing service for dogs and cats
          </div>
          <div className="product-description">
          When bringing your pet for grooming, please note the following about your pet:<br></br>
          <FaShieldCat/> Customers please let Iupet know your pet's current condition so that Iupet can have other ways to bathe your pet, especially for hydrophobic or sick pets.<br></br>
          <FaShieldCat/> Do not overfeed or exercise your pet before bathing.<br></br>
          <FaShieldCat/> Do not accept pets that are rabid or show signs of rabies.<br></br>
          </div>
        </div>
        <div className="product-left">
          <img className="block" src='assets/imgs/Washing2.jpg' alt="" />
        </div>
      </div>
    </div>
      </>
    );
}
export default Washing;