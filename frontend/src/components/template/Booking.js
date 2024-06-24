
const Booking = () => {
    return (
      <>
      <div className='content' >
        <div className='container' >
          <div className='container-heading' ><h1>Booking</h1></div>
          <form>

            {/*Enter info of customer*/}
            <div className='input-group mb-3' >
              <div class="input-group-text">Customer name</div>
              <input type='text' className='form-control' id='customer-name' placeholder='Enter' required ></input>
            </div>

            <div className='input-group mb-3' >
              <div class="input-group-text">Phone number</div>
              <input type='text' className='form-control' id='phone-number' placeholder='Enter' required ></input>
            </div>

            <div className='input-group mb-3' >
              <div class="input-group-text">Pet's name</div>
              <input type='text' className='form-control' id='pet-name' placeholder='Enter' required ></input>
            </div>

            {/*Choose pet*/}
            <div className='row align-items-center' >
              <div className='col-2' >
                <div class="input-group-text">Pet</div>
              </div>
              <div className='col-2' >
                <div className='form-check' >
                  <input class="form-check-input" type="radio" value="Cat" name='pet' id='cat' />
                  <label className='form-check-label' for='cat' >Cat</label>
                </div>
              </div>
              <div className='col-2' >
                <div className='form-check' >
                  <input class="form-check-input" type="radio" value="dog" name='pet' id='dog' />
                  <label className='form-check-label' for='dog' >Dog</label>
                </div>
              </div>
              <div className='col-6' >
                <div className='form-check' >
                  <label className='form-check-label' for='date' >Date</label>
                  <input className='form-check-input' type='date' id='date' name='service-date' />
                </div>
              </div>
            </div>

            {/*Choose combo*/}
            <div class="input-group mt-3 mb-3">
              <label class="input-group-text" for="combo">Choose combo</label>
                <select class="form-select" id="combo">
                  <option selected>Service...</option>
                  <option value="1">Combo A</option>
                  <option value="2">Combo B</option>
                  <option value="3">Combo C</option>
                </select>
            </div>

            {/*Requst button*/}
            <button className='btn btn-success' type='submit' >Request</button>
          </form>
        </div>
      </div>
      </>
    )
  }
export default Booking;
