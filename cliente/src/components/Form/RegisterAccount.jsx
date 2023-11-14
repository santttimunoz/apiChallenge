export default function RegisterAccount() {
    return (
        <>
            <div className="container ">
                <form>                   
                    <div className='d-flex'>
                        <div className="col-6 mb-3 me-2">
                            <label for="exampleInputEmail1" className="form-label">accountName</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='enter userName'/>
                        </div>
                        <div className="col-6 mb-3">
                            <label for="exampleInputPassword1" className="form-label">clientName</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='enter email'/>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className="col-6 mb-3 me-2">
                            <label for="exampleInputEmail1" className="form-label">query</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='enter password'/>
                        </div>
                        <div className="col-6 mb-3">
                        <label for="exampleInputPassword1" className="form-label">responsibleOp</label>
                           <select name="" id="" className='form-select '>                            
                            <option selected value="">op1</option>
                            <option value="r">op2</option>
                           </select>
                        </div>
                    </div>                              
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
        </>
    )
}