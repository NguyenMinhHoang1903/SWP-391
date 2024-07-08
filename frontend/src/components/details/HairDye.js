import { GiCheckMark } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { LuDog } from "react-icons/lu";
import { FaShieldCat } from "react-icons/fa6";
const HairDye = () =>{
    return(
      <>
        <div className="product-container block">
          <div className="product" style={{backgroundColor: '#faaa5a'}}>
            <div className="product-left" style={{height: 500 }} >
              <img alt="Washing" className="block" src='assets/imgs/furhaird1.jpg' style={{marginTop: 130}} />
            </div>
            <div className="product-right">
              <div className="product-title">
              Instructions for choosing dog hair medicine
              </div>
              <div className="product-description" >
              <LuDog /> Explore popular color options:<br/>
                        Dog fur often has original colors such as brown, black, white, and gray. Normally, to express their pet's outstanding personality, owners will often choose outstanding colors such as yellow, purple, blue,...<br></br>
              <LuDog /> Learn about safe dog hair dyes :<br/>
                        - You should choose organic dyes. The active ingredients in organic dyes will not affect your dog's health. In particular, it will not harm their skin. The ingredients of organic dyes are mainly plants, herbs and natural colors.<br/>
                        - Choose dyes that do not contain ammonium and irritating substances. This will help reduce the risk of irritation on your pet's skin.<br/>
                        - Choose dog-specific dyes. Absolutely do not use hair dye to dye your dog's fur. Many pet care brands make hair dye products specifically for dogs. These products have usually been tested and guaranteed to be safe for dogs. Please read product information carefully and follow the manufacturer's instructions for use.<br></br>
              </div>
            </div>
          </div>
        </div>
        <div className="block" style={{textAlign: 'center',margin: 70}}>
          <h1>Price list for dog fur dyeing service</h1>
        </div>
        <div class="cardWashing-container block">
          <div class="cardWashing card-1">
            <div>
              <h1>For dogs under 10KG</h1>
              <h1>100.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Choose your desired color</li>
              <li><GiCheckMark />One week maintenance</li>
              <li><GiCheckMark />Ensures safety for skin</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
          <div class="cardWashing card-4">
            <div>
              <h1>For dogs 10-15KG</h1>
              <h1>130.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Choose your desired color</li>
              <li><GiCheckMark />One week maintenance</li>
              <li><GiCheckMark />Ensures safety for skin</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
          <div class="cardWashing card-3">
            <div>
              <h1>For dogs over 15KG</h1>
              <h1>180.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Choose your desired color</li>
              <li><GiCheckMark />One week maintenance</li>
              <li><GiCheckMark />Ensures safety for skin</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
        </div>
      <div className="product-container block">
      <div className="product" style={{backgroundColor: '#f06464'}}>
        <div className="product-right">
          <div className="product-title">
            Some important notes when applying the hair dye method to dogs:
          </div>
          <div className="product-description">
          <FaShieldCat/> Don't let the dye apply directly to your pet's skin. <br></br>
          <FaShieldCat/> You should condition your dog's hair before and after dyeing.<br/>
          <FaShieldCat/> Observe the condition of your dog's fur after dyeing to avoid irritation.<br/>
          <FaShieldCat/> Should be dyed according to the manufacturer's instructions.<br/>
          <FaShieldCat/> Avoid letting the dye touch your pet's eyes, ears, and sensitive parts.<br/>
          </div>
        </div>
        <div className="product-left" style={{height:400}}>
          <img className="block" src='assets/imgs/furdye1.jpg' alt="" />
        </div>
      </div>
    </div>
      </>
    );
}
export default HairDye;