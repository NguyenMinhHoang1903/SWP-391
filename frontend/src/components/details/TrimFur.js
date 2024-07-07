import { GiCheckMark } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { LuDog } from "react-icons/lu";
import { FaShieldCat } from "react-icons/fa6";
const TrimFur = () =>{
    return(
      <>
        <div className="product-container block">
          <div className="product" style={{backgroundColor: '#faaa5a'}}>
            <div className="product-left" style={{height: 500 }} >
              <img alt="Washing" className="block" src='assets/imgs/Washing1.jpg' />
            </div>
            <div className="product-right">
              <div className="product-title">
              Professional pet fur trimming service
              </div>
              <div className="product-description" >
              Dog hair trimming or cat hair trimming at Iupet includes 6 treatments, giving your pet the 6 best experiences!<br></br>
              <LuDog /> Step 1: Check the dog and cat's fur. Then determine the condition of the dog's and cat's fur and skin.<br></br>
              <LuDog /> Step 2: Advice on cleaning dog and cat hair, choosing how to shape the dog and cat after trimming hair.<br></br>
              <LuDog /> Step 3: Shave and clean the pet's abdomen, legs and anus.<br></br>
              <LuDog /> Step 4: Use the dryer to blow away the hair stuck on the dog and cat's body.<br></br>
              <LuDog /> Step 5: Brush the fur and use cosmetics to keep the pet's fur always puffier and more beautiful.<br></br>
              <LuDog /> Step 6: Use high-quality hair care perfume specifically for pets.<br></br>
              </div>
            </div>
          </div>
        </div>
        <div className="block" style={{textAlign: 'center',margin: 70}}>
          <h1>Price list for dog and cat fur trimming service</h1>
        </div>
        <div class="cardWashing-container block">
          <div class="cardWashing card-1">
            <div>
              <h1>Under 3kg</h1>
              <h1>280.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Dry bath</li>
              <li><GiCheckMark />Ear cleaning</li>
              <li><GiCheckMark />Curt cut</li>
              <li><GiCheckMark />Cut creation</li>
              <li><GiCheckMark />Fuzz and tangled hair plowing service</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
          <div class="cardWashing card-2">
            <div>
              <h1>3.1-5KG</h1>
              <h1>350.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Dry bath</li>
              <li><GiCheckMark />Ear cleaning</li>
              <li><GiCheckMark />Curt cut</li>
              <li><GiCheckMark />Cut creation</li>
              <li><GiCheckMark />Full body hair service</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
          <div class="cardWashing card-3">
            <div>
              <h1>5.1-7KG</h1>
              <h1>380.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Dry bath</li>
              <li><GiCheckMark />Ear cleaning</li>
              <li><GiCheckMark />Curt cut</li>
              <li><GiCheckMark />Cut creation</li>
              <li><GiCheckMark />Full body hair service</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
        </div>

        <div class="cardWashing-container block" style={{ marginTop: 80}}>
          <div class="cardWashing card-1">
            <div>
              <h1>7.1-10KG</h1>
              <h1>430.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Dry bath</li>
              <li><GiCheckMark />Ear cleaning</li>
              <li><GiCheckMark />Curt cut</li>
              <li><GiCheckMark />Cut creation</li>
              <li><GiCheckMark />Fuzz and tangled hair plowing service</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
          <div class="cardWashing card-2">
            <div>
              <h1>10.1-15KG</h1>
              <h1>500.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Dry bath</li>
              <li><GiCheckMark />Ear cleaning</li>
              <li><GiCheckMark />Curt cut</li>
              <li><GiCheckMark />Cut creation</li>
              <li><GiCheckMark />Full body hair service</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
          <div class="cardWashing card-3">
            <div>
              <h1>Over 15KG</h1>
              <h1>800.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Dry bath</li>
              <li><GiCheckMark />Ear cleaning</li>
              <li><GiCheckMark />Curt cut</li>
              <li><GiCheckMark />Cut creation</li>
              <li><GiCheckMark />Full body hair service</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
        </div>

      <div className="product-container block">
      <div className="product" style={{backgroundColor: '#f06464'}}>
        <div className="product-right">
          <div className="product-title">
          Notes when using dog and cat fur trimming service?
          </div>
          <div className="product-description">
          When bringing your pet for grooming, please note the following about your pet:<br></br>
          <FaShieldCat/> Pets do not have asthma, neurological convulsions or signs of rabies.<br></br>
          <FaShieldCat/> Do not feed your pet too much or too much.<br></br>
          <FaShieldCat/> Do not let your pet exercise too much before.<br></br>
          <FaShieldCat/> After finishing trimming, check your pet again before leaving.<br></br>
          <FaShieldCat/> If your pet has unusual behavior, please contact us immediately!<br></br>
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
export default TrimFur;