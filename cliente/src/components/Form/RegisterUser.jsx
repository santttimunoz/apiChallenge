import './Form.css'
export default function RegisterUser() {
    return (
        <>
            <div className="container ">
                <form>                   
                    <div className='d-flex'>
                        <div className="col-6 mb-3 me-2">
                            <label for="exampleInputEmail1" className="form-label">userName</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='enter userName'/>
                        </div>
                        <div className="col-6 mb-3">
                            <label for="exampleInputPassword1" className="form-label">email</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='enter email'/>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className="col-6 mb-3 me-2">
                            <label for="exampleInputEmail1" className="form-label">password</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='enter password'/>
                        </div>
                        <div className="col-6 mb-3">
                        <label for="exampleInputPassword1" className="form-label">role</label>
                           <select name="" id="" className='form-select '>                            
                            <option selected value="Admin">Admin</option>
                            <option value="User">User</option>
                           </select>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className="col-6 mb-3 me-2">
                            <label for="exampleInputEmail1" className="form-label">linkCve</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='enter link'/>
                        </div>
                        <div className="col-6 mb-3">
                            <label for="exampleInputPassword1" className="form-label">knowledg</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='enter knowledge'/>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className="col-12 mb-3">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>englishLevel</option>
                                <option value="A1">A1</option>
                                <option value="A2">A2</option>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="C1">C1</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
        </>
    )
}