import { Link } from "react-router-dom";
const Container = () => {
  return(
    <div>
    <div className="product-container">
      <div className="product">
        <div className="product-left" >
          <img alt="Combo for summer" className="block" src="petgrooming.jpg" />
        </div>
        <div className="product-right" style={{backgroundColor: '#f06464'}}>
          <div className="product-title">
          Pet care service
          </div>
          <div className="product-description">
          With the mission of providing the best solutions to help pets stay clean and healthy. Our pet care store with many years of experience in the industry will provide advice and consultation to ensure your pet's health. So, if you are in Ho Chi Minh City and want your pet to be well taken care of, go for regular health check-ups. Choosing our pet care service will help you save a lot of time without having to worry about transporting your pet to the veterinary care center.
          </div>
        </div>
      </div>
    </div>
    <div className="product-container">
      <div className="product">
        <div className="product-right" style={{backgroundColor: '#faaa5a'}}>
          <div className="product-title">
          Why should you choose our pet spa service?
          </div>
          <div className="product-description">
          Trimming dog and cat hair can help eliminate body heat, clean pets easily, and prevent dermatological diseases. However, it's risky and requires experience. Professional hairdressers can provide better results and avoid transmitting diseases. Trimming fur beautifully makes pets more beautiful and satisfied customers. Professional pruning workers also avoid transmitting diseases and causing harm to pets. Therefore, it's recommended to seek professional services for dog and cat hair trimming to ensure your pet's health and satisfaction.
          </div>
        </div>
        <div className="product-left">
          <img className="block" src="Combospa.jpg" />
        </div>
      </div>
    </div>
    <div className="product-container">
      <div className="product">
        <div className="product-left">
          <img alt="Become a member" className="block" src="Services.png" width={760}/>
        </div>
        <div className="product-right"style={{backgroundColor: '#9bf5b4'}}>
          <div className="product-title">
            Register for a membership card
          </div>
          <div className="product-description">
            Accumulating points can get discounts on the following services and will receive a small gift from the pet store when registering as a member.
          </div>
          <div style={{marginTop: 10}}>
            <div><Link className="login-button product-button" style={{marginTop: 10, color: "black"}} to ="login">Login</Link></div>
          </div>
        </div>
      </div>
    </div>
  </div>
        );
    }
 export default Container;