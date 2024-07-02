import { GiCheckMark } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { LuDog } from "react-icons/lu";
import { FaShieldCat } from "react-icons/fa6";
const Cutnails = () =>{
    return(
      <>
        <div className="product-container block">
          <div className="product" style={{backgroundColor: '#faaa5a'}}>
            <div className="product-left" style={{height: 500 }} >
              <img alt="Washing" className="block" src='assets/imgs/cutnail.png' />
            </div>
            <div className="product-right">
              <div className="product-title">
              Benefits of Professional Pet Nail Trimming
              </div>
              <div className="product-description" >
              <LuDog /> 1. Expertise: Professionals are trained to handle pets and know how to trim nails without causing pain or injury.<br></br>
              <LuDog /> 2. Proper Equipment: Professional groomers have high-quality tools that are kept clean and sharp.<br></br>
              <LuDog /> 3. Stress Reduction: Pets often feel more comfortable and less stressed when handled by an experienced groomer.<br></br>
              <LuDog /> 4. Additional Services: Groomers can provide other services, such as ear cleaning, bathing, and hair trimming, during the same visit.<br></br>
              </div>
            </div>
          </div>
        </div>
        <div className="block" style={{textAlign: 'center',margin: 70}}>
          <h1>Price list for both dogs and cats nails trimming service</h1>
        </div>
        <div class="cardWashing-container block">
          <div class="cardWashing card-1">
            <div>
              <h1>For both dogs and cats</h1>
              <h1>30.000 đ</h1>
            </div>
            <ul>
              <li><GiCheckMark />Cut nails</li>
              <li><GiCheckMark />Nail files</li>
              <li><GiCheckMark />Clean the ears of cats and dogs</li>
            </ul>
            <Link to = {'/booking'}>Booking</Link>
          </div>
        </div>
      <div className="product-container block">
      <div className="product" style={{backgroundColor: '#f06464'}}>
        <div className="product-right">
          <div className="product-title">
          Things to keep in mind when using dog and cat nail clipping services?
          </div>
          <div className="product-description">
          <FaShieldCat/> 1. Frequency: <br></br>
                - Dogs : Trim every 1-2 months or when you hear their nails clicking on the floor.<br/>
                - Cats: Trim every 2-4 weeks, as their nails grow faster.<br></br>
          <FaShieldCat/> 2. Familiarization:<br/>
                - Get your pet accustomed to having their paws handled from a young age.<br/>
                - Touch and hold their paws regularly to make nail trimming less stressful.<br></br>
          <FaShieldCat/> 3. Tools:<br/>
                - Use pet-specific nail clippers or a grinder. Human clippers can crush or split pet nails.<br/>
                - Keep your tools clean and sharp to ensure a clean cut.<br></br>
          </div>
        </div>
        <div className="product-left" style={{marginTop: 40}}>
          <img className="block" src='assets/imgs/Washing2.jpg' />
        </div>
      </div>
    </div>

    <div className="product-container block">
          <div className="product" style={{backgroundColor: '#f06464'}}>
            <div className="product-left" style={{height: 500 }} >
              <img alt="Washing" className="block" src='assets/imgs/cutnaildog.jpg' style={{marginTop: 50}} />
            </div>
            <div className="product-right">
              <div className="product-title">
              Specific Notes for Dogs
              </div>
              <div className="product-description" >
              <LuDog /> 1. Inspect the Nails:
                    - Identify the quick, especially in clear nails. The quick is the pink area that contains blood vessels and nerves.<br/>
                    - On dark nails, trim small amounts and check the cross-section to avoid the quick.<br></br>
              <LuDog /> 2. Positioning:<br/>
                    - Have your dog lie down or sit comfortably. You may need an assistant to help hold your dog.<br/>
                    - Hold the paw gently but firmly, and press the pad to extend the nail.<br></br>
              <LuDog /> 3. Cutting Technique:<br/>
                    - Clip a small portion of the nail at a time, cutting straight across.<br/>
                    - Avoid cutting too close to the quick to prevent pain and bleeding.<br/>
                    - If using a grinder, gently grind the nail tip, moving slowly to avoid overheating.<br></br>
              <LuDog /> 4. Rewarding:<br/>
                    - Use treats and praise to reward your dog during and after the trimming session to create positive associations.<br></br>
              </div>
            </div>
          </div>
        </div>

        <div className="product-container block">
      <div className="product" style={{backgroundColor: '#f06464'}}>
        <div className="product-right">
          <div className="product-title">
          Specific Notes for Cats
          </div>
          <div className="product-description">
          <FaShieldCat/> 1. Inspect the Nails: <br></br>
                - Cats have retractable claws, so gently press the paw pad to extend the nail.<br/>
                - The quick is usually visible as a pink area in clear nails.<br></br>
          <FaShieldCat/> 2. Positioning:<br/>
                - Hold your cat in your lap or wrap them in a towel with one paw exposed at a time.<br/>
                - If your cat is resistant, consider having someone assist you.<br></br>
          <FaShieldCat/> 3. Cutting Technique:<br/>
                - Clip only the sharp tip of the nail, avoiding the quick.<br/>
                - Trim a small portion at a time to reduce the risk of cutting into the quick.<br></br>
                - Be mindful of the dewclaws, which are located on the inner side of the paw.<br/>
           <FaShieldCat/> 4. Calming Techniques:<br/>
                - Keep the environment calm and quiet to reduce your cat’s anxiety.<br/>
                - Use treats and gentle petting to reward your cat and keep them relaxed.<br></br>
          </div>
        </div>
        <div className="product-left">
          <img className="block" src='assets/imgs/cutnailcat.png' style={{ width: 1200 ,height: 530}} />
        </div>
      </div>
    </div>

      </>
    );
}
export default Cutnails;